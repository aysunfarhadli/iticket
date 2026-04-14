import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { ApiResponse, Order, Page } from '../api/types';

const statusChip = (s: string) => {
  if (s === 'PAID') return 'chip-mint';
  if (s === 'PENDING') return 'chip-gold';
  if (s === 'FAILED' || s === 'CANCELLED') return 'chip-red';
  return 'chip';
};

export default function MyOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    api.get<ApiResponse<Page<Order>>>('/orders').then(r => setOrders(r.data.data.content));
  }, []);
  return (
    <div className="container-x py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My orders</h1>
        <p className="text-sm muted mt-1">Your purchase history.</p>
      </div>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left text-slate-600">
            <tr><th className="p-3">Order</th><th className="p-3">Date</th><th className="p-3">Status</th>
            <th className="p-3">Pickup</th><th className="p-3 text-right">Total</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t border-slate-100 hover:bg-slate-50/60">
                <td className="p-3 font-mono text-slate-700">{o.orderNumber}</td>
                <td className="p-3 text-slate-700">{new Date(o.createdAt).toLocaleDateString('en-GB')}</td>
                <td className="p-3"><span className={statusChip(o.status)}>{o.status}</span></td>
                <td className="p-3 text-slate-600">{o.pickupMethod}</td>
                <td className="p-3 text-right font-bold text-slate-900">{o.totalAmount} ₼</td>
                <td className="p-3 text-right">
                  <Link to={`/orders/${o.id}/invoice`} className="text-brand-600 hover:underline">Invoice →</Link>
                </td>
              </tr>
            ))}
            {orders.length === 0 && <tr><td colSpan={6} className="p-10 text-center muted">No orders yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
