import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';
import { ApiResponse, Invoice } from '../api/types';

export default function InvoicePage() {
  const { id } = useParams();
  const [inv, setInv] = useState<Invoice | null>(null);
  useEffect(() => { api.get<ApiResponse<Invoice>>(`/orders/${id}/invoice`).then(r => setInv(r.data.data)); }, [id]);
  if (!inv) return <div className="container-x py-10 muted">Loading...</div>;

  return (
    <div className="container-x py-10 max-w-3xl mx-auto">
      <div className="card p-8">
        <div className="flex justify-between items-start border-b border-slate-200 pb-5 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-500 grid place-items-center text-white font-extrabold">i</div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">ITICKET</div>
              <div className="muted text-xs">Event ticketing platform</div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-bold text-slate-900">INVOICE</div>
            <div className="text-sm muted">№ {inv.invoiceNumber}</div>
            <div className="text-sm muted">{inv.issueDate}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
          <div>
            <div className="muted uppercase text-xs">Customer</div>
            <div className="font-medium text-slate-900">{inv.customerName}</div>
            <div className="text-slate-600">{inv.customerEmail}</div>
          </div>
          <div className="text-right">
            <div className="muted uppercase text-xs">Order</div>
            <div className="font-mono text-slate-700">{inv.orderNumber}</div>
            <div className="text-slate-600">Pickup: {inv.pickupMethod}</div>
          </div>
        </div>

        <table className="w-full text-sm mb-6">
          <thead><tr className="border-b border-slate-200 text-slate-500 text-left">
            <th className="py-2">Ticket</th><th>Qty</th><th>Price</th><th className="text-right">Subtotal</th></tr></thead>
          <tbody>
          {inv.items.map(i => (
            <tr key={i.id} className="border-b border-slate-100">
              <td className="py-2 text-slate-800">{i.eventTitle} — {i.ticketTypeName}</td>
              <td className="text-slate-700">{i.quantity}</td>
              <td className="text-slate-700">{i.unitPrice} ₼</td>
              <td className="text-right text-slate-900 font-medium">{i.subtotal} ₼</td>
            </tr>
          ))}</tbody>
        </table>

        <div className="flex justify-end">
          <div className="text-right">
            <div className="muted text-sm">Total amount</div>
            <div className="text-3xl font-extrabold text-brand-500">{inv.totalAmount} ₼</div>
          </div>
        </div>

        <button onClick={() => window.print()} className="btn-ghost mt-6">Print</button>
      </div>
    </div>
  );
}
