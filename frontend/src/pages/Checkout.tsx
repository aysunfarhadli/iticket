import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../api/client';
import { ApiResponse, Order } from '../api/types';
import { useCart } from '../store/cart';

export default function Checkout() {
  const cart = useCart();
  const nav = useNavigate();
  const [pickupMethod, setPickup] = useState<'E_TICKET' | 'PHYSICAL_PICKUP'>('E_TICKET');
  const [card, setCard] = useState({ cardHolder: '', cardNumber: '', expiry: '', cvv: '' });
  const [loading, setLoading] = useState(false);

  if (cart.items.length === 0)
    return <div className="container-x py-16 text-center muted">Your cart is empty.</div>;

  const submit = async () => {
    try {
      setLoading(true);
      const co = await api.post<ApiResponse<Order>>('/orders/checkout', {
        items: cart.items.map(i => ({ ticketTypeId: i.ticketTypeId, quantity: i.quantity })),
        pickupMethod
      });
      const order = co.data.data;
      const pay = await api.post<ApiResponse<any>>('/payments', { orderId: order.id, ...card });
      if (pay.data.data.status !== 'SUCCESS') {
        toast.error('Ödəniş alınmadı');
        return;
      }
      cart.clear();
      toast.success('Sifariş təsdiqləndi! Email göndərildi.');
      nav(`/orders/${order.id}/success`);
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Xəta');
    } finally { setLoading(false); }
  };

  return (
    <div className="container-x py-10 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-5">
        <h1 className="text-3xl font-bold text-slate-900">Complete your order</h1>

        <div className="card p-6">
          <h3 className="font-semibold text-slate-900 mb-3">How would you like to receive your ticket?</h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { v: 'E_TICKET', t: 'E-ticket', d: 'Sent to your email instantly', icon: '✉️' },
              { v: 'PHYSICAL_PICKUP', t: 'Pick up at city office', d: 'Collect in person', icon: '🏢' }
            ].map(o => (
              <button key={o.v} type="button" onClick={() => setPickup(o.v as any)}
                className={`text-left p-4 rounded-xl border-2 transition ${pickupMethod === o.v
                  ? 'border-brand-500 bg-brand-50' : 'border-slate-200 hover:border-slate-300'}`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{o.icon}</div>
                  <div>
                    <div className="font-semibold text-slate-900">{o.t}</div>
                    <div className="text-xs muted mt-0.5">{o.d}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="card p-6 space-y-3">
          <h3 className="font-semibold text-slate-900">Payment</h3>
          <input className="input" placeholder="Cardholder name" value={card.cardHolder}
                 onChange={e => setCard({ ...card, cardHolder: e.target.value })} />
          <input className="input" placeholder="Card number (1234 5678 9012 3456)" value={card.cardNumber}
                 onChange={e => setCard({ ...card, cardNumber: e.target.value })} />
          <div className="grid grid-cols-2 gap-3">
            <input className="input" placeholder="MM/YY" value={card.expiry}
                   onChange={e => setCard({ ...card, expiry: e.target.value })} />
            <input className="input" placeholder="CVV" value={card.cvv}
                   onChange={e => setCard({ ...card, cvv: e.target.value })} />
          </div>
          <div className="text-xs muted">🔒 Mock payment — cards ending in 0000 will fail.</div>
        </div>
      </div>

      <aside className="card p-6 h-fit sticky top-20">
        <h3 className="font-semibold text-slate-900 mb-4">Order summary</h3>
        <div className="space-y-3">
          {cart.items.map(i => (
            <div key={i.ticketTypeId} className="flex justify-between items-start gap-3 border-b border-slate-100 pb-3">
              <div className="text-sm">
                <div className="font-medium text-slate-900">{i.eventTitle}</div>
                <div className="muted">{i.ticketTypeName} · ×{i.quantity}</div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-slate-900">{(i.unitPrice * i.quantity).toFixed(2)} ₼</div>
                <button onClick={() => cart.remove(i.ticketTypeId)} className="text-xs text-danger mt-1 hover:underline">Remove</button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center mt-5 pt-2 text-lg">
          <span className="text-slate-700">Total</span>
          <span className="font-extrabold text-slate-900">{cart.total().toFixed(2)} ₼</span>
        </div>
        <button disabled={loading} onClick={submit} className="btn-primary w-full mt-4 disabled:opacity-60">
          {loading ? 'Processing...' : 'Pay & confirm'}
        </button>
      </aside>
    </div>
  );
}
