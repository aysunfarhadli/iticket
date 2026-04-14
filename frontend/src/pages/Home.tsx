import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api/client';
import { ApiResponse, Category, EventDto } from '../api/types';
import EventCard from '../components/EventCard';
import TicketShowcase from '../components/TicketShowcase';

export default function Home() {
  const [featured, setFeatured] = useState<EventDto[]>([]);
  const [upcoming, setUpcoming] = useState<EventDto[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [q, setQ] = useState('');
  const nav = useNavigate();

  useEffect(() => {
    api.get<ApiResponse<EventDto[]>>('/events/featured').then(r => setFeatured(r.data.data));
    api.get<ApiResponse<EventDto[]>>('/events/upcoming').then(r => setUpcoming(r.data.data));
    api.get<ApiResponse<Category[]>>('/categories').then(r => setCats(r.data.data));
  }, []);

  const search = (e: React.FormEvent) => { e.preventDefault(); nav(`/events?q=${encodeURIComponent(q)}`); };

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/60 to-white">
        <div className="container-x relative pt-16 pb-14 md:pt-24 md:pb-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="chip-brand mb-5 inline-block">🎟  Premium event ticket platform</span>
            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.05] text-slate-900">
              Discover Events,<br/><span className="text-brand-500">Find Your Experience</span>
            </h1>
            <p className="mt-5 text-lg text-slate-600 max-w-xl">
              Concerts, theatre, festivals, sports — book in seconds, get e-tickets instantly,
              transfer to friends with one click.
            </p>
            <form onSubmit={search} className="mt-8 flex gap-2 max-w-xl">
              <input value={q} onChange={e=>setQ(e.target.value)} className="input flex-1" placeholder="Search events, artists, venues..." />
              <button className="btn-primary whitespace-nowrap">Search</button>
            </form>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
              <span>✓ Instant e-tickets</span>
              <span>✓ Easy transfer</span>
              <span>✓ Secure checkout</span>
            </div>
          </div>
          <div className="relative">
            <TicketShowcase events={featured} />
          </div>
        </div>
      </section>

      <section className="container-x py-14">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Browse by category</h2>
          <Link to="/events" className="text-brand-600 text-sm hover:underline">All events →</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {cats.map(c => (
            <Link key={c.id} to={`/events?categoryId=${c.id}`}
              className="card card-hover p-5 text-center group">
              <div className="text-2xl group-hover:scale-110 transition">🎭</div>
              <div className="mt-2 text-sm font-medium text-slate-700 group-hover:text-brand-600">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-x py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Trending now</h2>
            <p className="text-sm muted mt-1">The most-loved events this week</p>
          </div>
          <Link to="/events" className="text-brand-600 text-sm hover:underline">See all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map(e => <EventCard key={e.id} e={e} />)}
        </div>
      </section>

      <section className="container-x py-14">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Upcoming events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {upcoming.map(e => <EventCard key={e.id} e={e} />)}
        </div>
      </section>

      <section className="container-x py-16">
        <div className="rounded-3xl p-10 md:p-14 bg-brand-500 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,#fff_0%,transparent_50%)]" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold">Never miss the show.</h3>
              <p className="mt-3 opacity-90">Subscribe to weekly drops — early bird tickets and exclusive presales.</p>
            </div>
            <div className="flex gap-2">
              <input className="input bg-white/15 border-white/25 placeholder-white/70 text-white focus:bg-white/20 focus:border-white" placeholder="Your email" />
              <button className="btn-dark whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
