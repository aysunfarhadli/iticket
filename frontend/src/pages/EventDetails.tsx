import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../api/client';
import { ApiResponse, EventDto, TicketType } from '../api/types';
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';

export default function EventDetails() {
  const { id } = useParams();
  const [e, setE] = useState<EventDto | null>(null);
  const [qty, setQty] = useState<Record<number, number>>({});
  const { user } = useAuth();
  const cart = useCart();
  const nav = useNavigate();

  useEffect(() => {
    api.get<ApiResponse<EventDto>>(`/events/${id}`).then(r => setE(r.data.data));
  }, [id]);

  if (!e) return <div className="container-x py-10 muted">Loading...</div>;

  const date = new Date(e.startsAt);
  const buy = (tt: TicketType) => {
    if (!user) {
      toast('Please log in to book or buy tickets. New here? Create an account in seconds.', { icon: '🔐', duration: 4000 });
      nav('/login', { state: { from: `/events/${id}` } });
      return;
    }
    const q = qty[tt.id] ?? 1;
    cart.add({ ticketTypeId: tt.id, ticketTypeName: tt.name, eventId: e.id, eventTitle: e.title, unitPrice: tt.price, quantity: q });
    toast.success(`${q} × ${tt.name} added to cart`);
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
            <h2 className="text-xl font-bold text-slate-900 mb-3">About this event</h2>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line">{e.description}</p>
          </section>
          <section className="card p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Venue</h2>
            <div className="font-semibold text-slate-900">{e.venueName}</div>
            <div className="muted text-sm">{e.venueAddress}</div>
            <div className="muted text-sm">{e.cityName}</div>
          </section>
        </div>

        <aside>
          <div className="card p-5 sticky top-20">
            <h3 className="font-bold text-slate-900 mb-3">Tickets</h3>
            <div className="space-y-3">
              {e.ticketTypes.map(tt => (
                <div key={tt.id} className="border border-slate-200 rounded-xl p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-slate-900">{tt.name}</div>
                      <div className="text-xs muted">{tt.available > 0 ? `${tt.available} left` : 'Sold out'}</div>
                    </div>
                    <div className="text-slate-900 font-bold">{tt.price} ₼</div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <input type="number" min={1} max={Math.max(1, tt.available)}
                      value={qty[tt.id] ?? 1}
                      onChange={ev => setQty(s => ({ ...s, [tt.id]: Number(ev.target.value) }))}
                      className="input w-20" />
                    <button disabled={tt.available === 0} onClick={() => buy(tt)}
                            className="btn-primary flex-1 disabled:opacity-40 disabled:bg-slate-300 disabled:shadow-none">
                      {tt.available === 0 ? 'Sold out' : 'Buy / Book'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {!user && <Link to="/login" className="block text-center mt-3 text-brand-600 text-sm hover:underline">Log in to book →</Link>}
          </div>
        </aside>
      </div>
    </div>
  );
}
