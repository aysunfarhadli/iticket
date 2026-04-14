import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api/client';
import { ApiResponse, Category, EventDto, Page, Venue } from '../../api/types';

export default function AdminEvents() {
  const [events, setEvents] = useState<EventDto[]>([]);
  const [cats, setCats] = useState<Category[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({
    title: '', description: '', coverImageUrl: '',
    startsAt: '', categoryId: '', venueId: '', featured: false,
    ticketTypes: [{ name: 'Standart', price: 50, quota: 100 }]
  });

  const load = () => api.get<ApiResponse<Page<EventDto>>>('/events', { params: { size: 50 } })
    .then(r => setEvents(r.data.data.content));
  useEffect(() => {
    load();
    api.get<ApiResponse<Category[]>>('/categories').then(r => setCats(r.data.data));
    api.get<ApiResponse<Venue[]>>('/venues').then(r => setVenues(r.data.data));
  }, []);

  const create = async () => {
    try {
      await api.post('/admin/events', { ...form, categoryId: Number(form.categoryId), venueId: Number(form.venueId) });
      toast.success('Yaradıldı'); setOpen(false); load();
    } catch (e: any) { toast.error(e.response?.data?.message ?? 'Xəta'); }
  };

  const del = async (id: number) => {
    if (!confirm('Silinsin?')) return;
    await api.delete(`/admin/events/${id}`); toast.success('Silindi'); load();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Eventlər</h1>
        <button onClick={() => setOpen(!open)} className="btn-primary">+ Yeni event</button>
      </div>

      {open && (
        <div className="card p-5 mb-6 space-y-3">
          <div className="grid md:grid-cols-2 gap-3">
            <input className="input" placeholder="Başlıq" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
            <input className="input" type="datetime-local" value={form.startsAt} onChange={e => setForm({ ...form, startsAt: e.target.value })} />
            <select className="input" value={form.categoryId} onChange={e => setForm({ ...form, categoryId: e.target.value })}>
              <option value="">Kateqoriya</option>
              {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <select className="input" value={form.venueId} onChange={e => setForm({ ...form, venueId: e.target.value })}>
              <option value="">Məkan</option>
              {venues.map(v => <option key={v.id} value={v.id}>{v.name} ({v.cityName})</option>)}
            </select>
            <input className="input md:col-span-2" placeholder="Cover URL" value={form.coverImageUrl} onChange={e => setForm({ ...form, coverImageUrl: e.target.value })} />
            <textarea className="input md:col-span-2" placeholder="Təsvir" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
            <label className="flex items-center gap-2"><input type="checkbox" checked={form.featured} onChange={e => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-semibold">Bilet növləri</div>
            {form.ticketTypes.map((tt: any, i: number) => (
              <div key={i} className="grid grid-cols-3 gap-2">
                <input className="input" placeholder="Ad" value={tt.name} onChange={e => { const t=[...form.ticketTypes]; t[i].name=e.target.value; setForm({...form, ticketTypes:t}); }} />
                <input className="input" type="number" placeholder="Qiymət" value={tt.price} onChange={e => { const t=[...form.ticketTypes]; t[i].price=Number(e.target.value); setForm({...form, ticketTypes:t}); }} />
                <input className="input" type="number" placeholder="Quota" value={tt.quota} onChange={e => { const t=[...form.ticketTypes]; t[i].quota=Number(e.target.value); setForm({...form, ticketTypes:t}); }} />
              </div>
            ))}
            <button className="btn-ghost text-sm" onClick={() => setForm({ ...form, ticketTypes: [...form.ticketTypes, { name:'', price:0, quota:1 }] })}>+ Əlavə</button>
          </div>
          <button className="btn-primary" onClick={create}>Yarat</button>
        </div>
      )}

      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr>
            <th className="p-3">Başlıq</th><th className="p-3">Tarix</th><th className="p-3">Kateqoriya</th>
            <th className="p-3">Məkan</th><th className="p-3"></th></tr></thead>
          <tbody>
            {events.map(e => (
              <tr key={e.id} className="border-t border-slate-100">
                <td className="p-3 font-medium">{e.title}</td>
                <td className="p-3">{new Date(e.startsAt).toLocaleString('az-AZ')}</td>
                <td className="p-3">{e.categoryName}</td>
                <td className="p-3">{e.venueName}, {e.cityName}</td>
                <td className="p-3 text-right"><button onClick={() => del(e.id)} className="text-danger">Sil</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
