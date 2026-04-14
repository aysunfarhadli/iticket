import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api/client';
import { ApiResponse, City } from '../../api/types';

export default function AdminCities() {
  const [items, setItems] = useState<City[]>([]);
  const [f, setF] = useState({ name: '', country: 'Azərbaycan' });
  const load = () => api.get<ApiResponse<City[]>>('/cities').then(r => setItems(r.data.data));
  useEffect(() => { load(); }, []);
  const create = async () => { await api.post('/admin/cities', f); setF({ name: '', country: 'Azərbaycan' }); toast.success('OK'); load(); };
  const del = async (id: number) => { if (confirm('Sil?')) { await api.delete(`/admin/cities/${id}`); load(); } };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Şəhərlər</h1>
      <div className="card p-4 mb-5 grid md:grid-cols-3 gap-3">
        <input className="input" placeholder="Ad" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
        <input className="input" placeholder="Ölkə" value={f.country} onChange={e => setF({ ...f, country: e.target.value })} />
        <button className="btn-primary" onClick={create}>Əlavə et</button>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr><th className="p-3">Ad</th><th className="p-3">Ölkə</th><th></th></tr></thead>
          <tbody>{items.map(i => (
            <tr key={i.id} className="border-t border-slate-100">
              <td className="p-3">{i.name}</td><td className="p-3">{i.country}</td>
              <td className="p-3 text-right"><button onClick={() => del(i.id)} className="text-danger">Sil</button></td>
            </tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
