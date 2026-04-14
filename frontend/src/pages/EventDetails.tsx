import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../api/client';
import { ApiResponse, EventDto, TicketType } from '../api/types';
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';
import { useT } from '../i18n';
import SeatMap, { Seat } from '../components/SeatMap';

export default function EventDetails() {
  const { id } = useParams();
  const [e, setE] = useState<EventDto | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [seatByTier, setSeatByTier] = useState<Map<number, number>>(new Map());
  const { user } = useAuth();
  const cart = useCart();
  const nav = useNavigate();
  const t = useT();

  useEffect(() => {
    api.get<ApiResponse<EventDto>>(`/events/${id}`).then(r => setE(r.data.data));
  }, [id]);

  const total = useMemo(() => {
    if (!e) return 0;
    let s = 0;
    seatByTier.forEach((qty, ttId) => {
      const tt = e.ticketTypes.find(x => x.id === ttId);
      if (tt) s += tt.price * qty;
    });
    return s;
  }, [seatByTier, e]);

  if (!e) return <div className="container-x py-10 muted">{t('common.loading')}</div>;

  const date = new Date(e.startsAt);

  const toggleSeat = (s: Seat) => {
    const next = new Set(selected);
    const counts = new Map(seatByTier);
    if (next.has(s.id)) {
      next.delete(s.id);
      counts.set(s.tier.id, (counts.get(s.tier.id) ?? 1) - 1);
      if ((counts.get(s.tier.id) ?? 0) <= 0) counts.delete(s.tier.id);
    } else {
      next.add(s.id);
      counts.set(s.tier.id, (counts.get(s.tier.id) ?? 0) + 1);
    }
    setSelected(next);
    setSeatByTier(counts);
  };

  const buy = () => {
    if (!user) {
      toast('Please log in to book tickets.', { icon: '🔐', duration: 4000 });
      nav('/login', { state: { from: `/events/${id}` } });
      return;
    }
    if (selected.size === 0) { toast.error('Zəhmət olmasa oturacaq seç'); return; }
    seatByTier.forEach((qty, ttId) => {
      const tt = e.ticketTypes.find(x => x.id === ttId)!;
      cart.add({
        ticketTypeId: tt.id, ticketTypeName: tt.name, eventId: e.id,
        eventTitle: e.title, unitPrice: tt.price, quantity: qty
      });
    });
    toast.success(`${selected.size} bilet səbətə əlavə edildi`);
    nav('/checkout');
  };

  return (
    <div>
      <div className="relative h-[440px] overflow-hidden">
        <img src={e.coverImageUrl} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/40 to-transparent" />
        <div className="container-x absolute inset-x-0 bottom-8 text-white">
          <span className="chip bg-white/15 border-white/30 text-white">{e.categoryName}</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mt-3 max-w-3xl">{e.title}</h1>
          <div className="mt-2 text-white/90">{date.toLocaleString('en-GB')} · {e.venueName}, {e.cityName}</div>
        </div>
      </div>

      <div className="container-x py-10 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="card p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('event.about')}</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{e.description}</p>
          </section>

          <section className="card p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">{t('event.seatMap')}</h2>
            <SeatMap ticketTypes={e.ticketTypes} selected={selected} onToggle={toggleSeat} />
          </section>

          <section className="card p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">{t('event.venue')}</h2>
            <div className="font-semibold text-slate-900">{e.venueName}</div>
            <div className="muted text-sm">{e.venueAddress}</div>
            <div className="muted text-sm">{e.cityName}</div>
          </section>
        </div>

        <aside>
          <div className="card p-5 sticky top-20">
            <h3 className="font-bold text-slate-900 mb-3">{t('event.tickets')}</h3>
            <div className="space-y-2">
              {e.ticketTypes.map((tt: TicketType) => {
                const q = seatByTier.get(tt.id) ?? 0;
                return (
                  <div key={tt.id} className="flex items-center justify-between border border-slate-200 rounded-xl px-3 py-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{tt.name}</div>
                      <div className="text-xs muted">{tt.price} ₼ · {tt.available} {t('event.left')}</div>
                    </div>
                    <span className={`chip ${q > 0 ? 'chip-brand' : ''}`}>×{q}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
              <span className="text-slate-600 text-sm">Total</span>
              <span className="text-2xl font-extrabold text-slate-900">{total} ₼</span>
            </div>

            <button
              disabled={selected.size === 0}
              onClick={buy}
              className="btn-primary w-full mt-4 disabled:opacity-40 disabled:bg-slate-200 disabled:shadow-none">
              {selected.size === 0 ? t('event.selectSeats') : `${t('event.buyBtn')} · ${selected.size}`}
            </button>
            {!user && <Link to="/login" className="block text-center mt-3 text-brand-700 text-sm hover:underline">{t('event.loginPrompt')}</Link>}
          </div>
        </aside>
      </div>
    </div>
  );
}
