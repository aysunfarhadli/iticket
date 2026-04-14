import { useEffect, useRef, useState } from 'react';
import { EventDto } from '../api/types';

export default function TicketShowcase({ events }: { events: EventDto[] }) {
  const list = events.slice(0, 4);
  const [idx, setIdx] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (list.length === 0) return;
    const t = setInterval(() => setIdx(i => (i + 1) % list.length), 4500);
    return () => clearInterval(t);
  }, [list.length]);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    setTilt({ x, y });
  };
  const onLeave = () => setTilt({ x: 0, y: 0 });

  if (list.length === 0) return null;
  const e = list[idx];
  const date = new Date(e.startsAt);
  const minPrice = e.ticketTypes.length ? Math.min(...e.ticketTypes.map(t => t.price)) : 0;

  return (
    <div className="relative" style={{ perspective: '1200px' }}>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className="relative mx-auto max-w-md transition-transform duration-300 ease-out"
        style={{
          transform: `rotateY(${tilt.x * 8}deg) rotateX(${-tilt.y * 8}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Glow */}
        <div className="absolute -inset-6 bg-gradient-to-br from-brand-500/40 via-sky-400/30 to-pink-400/30 rounded-[36px] blur-2xl opacity-80" />

        {/* Ticket */}
        <div className="relative bg-white rounded-[28px] shadow-card overflow-hidden">
          {/* Image hero */}
          <div className="relative h-56 overflow-hidden">
            {list.map((x, i) => (
              <img key={x.id} src={x.coverImageUrl}
                   className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
                   style={{ opacity: i === idx ? 1 : 0 }} />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="chip-brand">{e.categoryName}</span>
              {e.featured && <span className="chip-gold">★ Featured</span>}
            </div>
            <div className="absolute bottom-3 left-4 right-4 text-white">
              <div className="text-[11px] font-semibold uppercase tracking-wider opacity-90">
                {date.toLocaleDateString('en-GB', { weekday:'short', day:'2-digit', month:'short' })} · {date.toLocaleTimeString('en-GB',{hour:'2-digit',minute:'2-digit'})}
              </div>
              <div className="font-extrabold text-lg leading-tight line-clamp-2 mt-1">{e.title}</div>
            </div>
          </div>

          {/* Perforation */}
          <div className="relative h-6">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-50 -ml-2.5" />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-slate-50 -mr-2.5" />
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-200" />
          </div>

          {/* Stub */}
          <div className="p-5 pt-3 grid grid-cols-[1fr_auto] gap-4 items-center">
            <div>
              <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Venue</div>
              <div className="font-semibold text-slate-900 text-sm line-clamp-1">{e.venueName}</div>
              <div className="text-xs text-slate-500">{e.cityName}</div>
              <div className="mt-3 flex items-center gap-3">
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">From</div>
                  <div className="font-extrabold text-slate-900">{minPrice} ₼</div>
                </div>
                <div className="h-8 w-px bg-slate-200" />
                <div>
                  <div className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Status</div>
                  <div className="text-xs font-semibold text-emerald-600">● Live</div>
                </div>
              </div>
            </div>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=120x120&margin=0&data=${encodeURIComponent('https://iticket.az/events/' + e.id)}`}
              className="w-20 h-20 rounded-lg border border-slate-200 p-1 bg-white"
              alt="qr" />
          </div>
        </div>

        {/* Shine overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[28px] opacity-60 mix-blend-overlay"
          style={{
            background: `radial-gradient(600px circle at ${(tilt.x + 1) * 50}% ${(tilt.y + 1) * 50}%, rgba(255,255,255,0.45), transparent 40%)`
          }}
        />
      </div>

      {/* Dots */}
      <div className="mt-5 flex justify-center gap-2">
        {list.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)}
            className={`h-1.5 rounded-full transition-all ${i === idx ? 'w-8 bg-brand-500' : 'w-2 bg-slate-300'}`} />
        ))}
      </div>
    </div>
  );
}
