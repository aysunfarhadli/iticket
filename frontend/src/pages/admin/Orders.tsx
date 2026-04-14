import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { ApiResponse, Order, Page } from '../../api/types';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => { api.get<ApiResponse<Page<Order>>>('/admin/orders', { params: { size: 100 } })
    .then(r => setOrders(r.data.data.content)); }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sifarişlər</h1>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr>
            <th className="p-3">№</th><th className="p-3">Tarix</th><th className="p-3">Status</th>
            <th className="p-3">Pickup</th><th className="p-3 text-right">Cəmi</th></tr></thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t border-slate-100">
                <td className="p-3 font-mono">{o.orderNumber}</td>
                <td className="p-3">{new Date(o.createdAt).toLocaleString('az-AZ')}</td>
                <td className="p-3"><span className="chip">{o.status}</span></td>
                <td className="p-3">{o.pickupMethod}</td>
                <td className="p-3 text-right">{o.totalAmount} ₼</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
