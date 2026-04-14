import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../api/client';
import { ApiResponse, Category, City, EventDto, Page } from '../api/types';
import EventCard from '../components/EventCard';

export default function Events() {
  const [params, setParams] = useSearchParams();
  const [events, setEvents] = useState<EventDto[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  const q = params.get('q') ?? '';
  const categoryId = params.get('categoryId') ?? '';
  const cityId = params.get('cityId') ?? '';

  useEffect(() => {
    api.get<ApiResponse<Category[]>>('/categories').then(r => setCats(r.data.data));
    api.get<ApiResponse<City[]>>('/cities').then(r => setCities(r.data.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get<ApiResponse<Page<EventDto>>>('/events', {
      params: { q: q || undefined, categoryId: categoryId || undefined, cityId: cityId || undefined, size: 24 }
    }).then(r => setEvents(r.data.data.content)).finally(() => setLoading(false));
  }, [q, categoryId, cityId]);

  const set = (k: string, v: string) => {
    const p = new URLSearchParams(params); v ? p.set(k, v) : p.delete(k); setParams(p);
  };

  return (
    <div className="container-x py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Browse events</h1>
        <p className="text-sm muted mt-1">Filter by category, city or date.</p>
      </div>
      <div className="grid md:grid-cols-4 gap-3 mb-8">
        <input className="input md:col-span-2" placeholder="Search events..." value={q}
               onChange={e => set('q', e.target.value)} />
        <select className="input" value={categoryId} onChange={e => set('categoryId', e.target.value)}>
          <option value="">All categories</option>
          {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <select className="input" value={cityId} onChange={e => set('cityId', e.target.value)}>
          <option value="">All cities</option>
          {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>
      {loading ? <div className="muted">Loading...</div> :
        events.length === 0 ? <div className="muted">No events found.</div> :
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {events.map(e => <EventCard key={e.id} e={e} />)}
        </div>
      }
    </div>
  );
}
