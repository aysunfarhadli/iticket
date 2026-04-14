import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EventDto } from '../api/types';

export default function EventCard({ e, onBroken }: { e: EventDto; onBroken?: (id: number) => void }) {
  const [broken, setBroken] = useState(false);
  const minPrice = e.ticketTypes.length ? Math.min(...e.ticketTypes.map(t => t.price)) : 0;
  const totalAvail = e.ticketTypes.reduce((s, t) => s + t.available, 0);
  const soldOut = totalAvail === 0;
  const earlyBird = e.featured && !soldOut;
  const date = new Date(e.startsAt);

  if (broken) return null;

  return (
    <Link to={`/events/${e.id}`} className="card card-hover group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={e.coverImageUrl}
          alt={e.title}
          loading="lazy"
          onError={() => { setBroken(true); onBroken?.(e.id); }}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
        <span className="absolute top-3 left-3 chip-brand">{e.categoryName}</span>
        {soldOut    && <span className="absolute top-3 right-3 chip-red">Sold out</span>}
        {earlyBird  && <span className="absolute top-3 right-3 chip-gold">★ Early bird</span>}
      </div>
      <div className="p-4">
        <div className="text-xs font-medium text-brand-700 uppercase tracking-wide">
          {date.toLocaleDateString('en-GB', { day:'2-digit', month:'short' })} · {date.toLocaleTimeString('en-GB',{ hour:'2-digit', minute:'2-digit' })}
        </div>
        <h3 className="font-semibold text-slate-900 mt-1 line-clamp-2 group-hover:text-brand-700 transition">{e.title}</h3>
        <div className="text-xs muted mt-1">{e.venueName}, {e.cityName}</div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <span className="text-xs muted">From</span>
          <span className="font-bold text-slate-900">{minPrice} ₼</span>
        </div>
      </div>
    </Link>
  );
}
