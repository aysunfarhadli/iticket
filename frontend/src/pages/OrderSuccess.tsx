import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../api/client';
import { ApiResponse, Order } from '../api/types';

export default function OrderSuccess() {
  const { id } = useParams();
  const [o, setO] = useState<Order | null>(null);
  useEffect(() => { api.get<ApiResponse<Order>>(`/orders/${id}`).then(r => setO(r.data.data)); }, [id]);
  if (!o) return <div className="container-x py-10 muted">Loading...</div>;
  return (
    <div className="container-x py-16 max-w-2xl mx-auto">
      <div className="card p-10 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-50 grid place-items-center text-3xl">✓</div>
        <h1 className="text-3xl font-extrabold mt-4 text-slate-900">Order confirmed!</h1>
        <p className="muted mt-2">Order № <span className="font-mono text-slate-700">{o.orderNumber}</span></p>
        <p className="muted">Total: <b className="text-slate-900">{o.totalAmount} ₼</b> · Pickup: {o.pickupMethod}</p>
        <p className="muted text-sm mt-3">A confirmation has been sent to your email.</p>
        <div className="mt-6 flex justify-center gap-3">
          <Link to={`/orders/${o.id}/invoice`} className="btn-primary">View invoice</Link>
          <Link to="/my-tickets" className="btn-ghost">My tickets</Link>
        </div>
      </div>
    </div>
  );
}
