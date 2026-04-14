import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api/client';
import { ApiResponse, City, Venue } from '../../api/types';

export default function AdminVenues() {
  const [items, setItems] = useState<Venue[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [f, setF] = useState<any>({ name: '', address: '', capacity: 100, cityId: '' });
  const load = () => api.get<ApiResponse<Venue[]>>('/venues').then(r => setItems(r.data.data));
  useEffect(() => { load(); api.get<ApiResponse<City[]>>('/cities').then(r => setCities(r.data.data)); }, []);
  const create = async () => {
    await api.post('/admin/venues', { ...f, cityId: Number(f.cityId), capacity: Number(f.capacity) });
    setF({ name: '', address: '', capacity: 100, cityId: '' }); toast.success('OK'); load();
  };
  const del = async (id: number) => { if (confirm('Sil?')) { await api.delete(`/admin/venues/${id}`); load(); } };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Məkanlar</h1>
      <div className="card p-4 mb-5 grid md:grid-cols-5 gap-3">
        <input className="input" placeholder="Ad" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
        <input className="input md:col-span-2" placeholder="Ünvan" value={f.address} onChange={e => setF({ ...f, address: e.target.value })} />
        <input type="number" className="input" placeholder="Tutum" value={f.capacity} onChange={e => setF({ ...f, capacity: e.target.value })} />
        <select className="input" value={f.cityId} onChange={e => setF({ ...f, cityId: e.target.value })}>
          <option value="">Şəhər</option>{cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <button className="btn-primary md:col-span-5" onClick={create}>Əlavə et</button>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr><th className="p-3">Ad</th><th className="p-3">Ünvan</th><th className="p-3">Şəhər</th><th className="p-3">Tutum</th><th></th></tr></thead>
          <tbody>{items.map(i => (
            <tr key={i.id} className="border-t border-slate-100">
              <td className="p-3">{i.name}</td><td className="p-3">{i.address}</td>
              <td className="p-3">{i.cityName}</td><td className="p-3">{i.capacity}</td>
              <td className="p-3 text-right"><button onClick={() => del(i.id)} className="text-danger">Sil</button></td>
            </tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
