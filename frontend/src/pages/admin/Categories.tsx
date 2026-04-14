import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../api/client';
import { ApiResponse, Category } from '../../api/types';

export default function AdminCategories() {
  const [items, setItems] = useState<Category[]>([]);
  const [f, setF] = useState({ name: '', slug: '', icon: '' });
  const load = () => api.get<ApiResponse<Category[]>>('/categories').then(r => setItems(r.data.data));
  useEffect(() => { load(); }, []);
  const create = async () => { await api.post('/admin/categories', f); setF({ name: '', slug: '', icon: '' }); toast.success('OK'); load(); };
  const del = async (id: number) => { if (confirm('Sil?')) { await api.delete(`/admin/categories/${id}`); load(); } };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Kateqoriyalar</h1>
      <div className="card p-4 mb-5 grid md:grid-cols-4 gap-3">
        <input className="input" placeholder="Ad" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} />
        <input className="input" placeholder="Slug" value={f.slug} onChange={e => setF({ ...f, slug: e.target.value })} />
        <input className="input" placeholder="Icon" value={f.icon} onChange={e => setF({ ...f, icon: e.target.value })} />
        <button className="btn-primary" onClick={create}>Əlavə et</button>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr><th className="p-3">Ad</th><th className="p-3">Slug</th><th className="p-3">Icon</th><th></th></tr></thead>
          <tbody>{items.map(i => (
            <tr key={i.id} className="border-t border-slate-100">
              <td className="p-3">{i.name}</td><td className="p-3">{i.slug}</td><td className="p-3">{i.icon}</td>
              <td className="p-3 text-right"><button onClick={() => del(i.id)} className="text-danger">Sil</button></td>
            </tr>))}</tbody>
        </table>
      </div>
    </div>
  );
}
