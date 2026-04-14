import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { api } from '../api/client';
import { ApiResponse, Ticket } from '../api/types';

export default function MyTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [transfer, setTransfer] = useState<Ticket | null>(null);
  const [form, setForm] = useState({ recipientEmail: '', confirmEmail: '', message: '' });
  const [busy, setBusy] = useState(false);

  const load = () => api.get<ApiResponse<Ticket[]>>('/orders/tickets').then(r => setTickets(r.data.data));
  useEffect(() => { load(); }, []);

  const submit = async () => {
    if (!transfer) return;
    if (form.recipientEmail !== form.confirmEmail) { toast.error('Emails do not match'); return; }
    try {
      setBusy(true);
      await api.post(`/orders/tickets/${transfer.id}/transfer`, form);
      toast.success('Ticket successfully transferred!');
      setTransfer(null);
      setForm({ recipientEmail: '', confirmEmail: '', message: '' });
      load();
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Transfer failed');
    } finally { setBusy(false); }
  };

  const qrUrl = (code: string) =>
    `https://quickchart.io/qr?size=240&margin=1&text=${encodeURIComponent(code)}`;

  return (
    <div className="container-x py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My tickets</h1>
        <p className="text-sm muted mt-1">Show the QR at the door, or transfer to a friend.</p>
      </div>
      {tickets.length === 0 ? (
        <div className="card p-10 text-center muted">You don't have any tickets yet.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tickets.map(t => (
            <div key={t.id} className="card overflow-hidden flex flex-col">
              <div className="p-5 border-b border-dashed border-slate-200">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="font-bold text-slate-900">{t.eventTitle}</div>
                    <div className="text-sm muted">{t.venueName}</div>
                    <div className="text-sm muted">{new Date(t.startsAt).toLocaleString('en-GB')}</div>
                  </div>
                  <span className={`chip ${t.status === 'ISSUED' ? 'chip-mint' : t.status === 'USED' ? 'chip-gold' : 'chip-red'}`}>{t.status}</span>
                </div>
              </div>
              <div className="p-5 grid place-items-center bg-slate-50">
                <img src={qrUrl(t.code)} className="w-40 h-40 rounded-lg bg-white p-2 border border-slate-200" alt="QR" />
                <div className="font-mono text-xs text-slate-600 mt-3">{t.code}</div>
              </div>
              <div className="p-4 flex items-center justify-between text-xs muted">
                <span>{t.ticketTypeName}</span><span className="font-mono">{t.orderNumber}</span>
              </div>
              <div className="px-4 pb-4">
                <button
                  onClick={() => setTransfer(t)}
                  disabled={t.status !== 'ISSUED'}
                  className="btn-primary w-full disabled:opacity-40 disabled:bg-slate-300 disabled:shadow-none">
                  Transfer Ticket
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {transfer && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/50 backdrop-blur-sm p-4" onClick={() => setTransfer(null)}>
          <div className="bg-white rounded-2xl shadow-card w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-1">
              <h3 className="text-xl font-bold text-slate-900">Transfer ticket</h3>
              <button onClick={() => setTransfer(null)} className="text-slate-400 hover:text-slate-700 text-2xl leading-none">×</button>
            </div>
            <p className="text-sm muted mb-5">Send <b>{transfer.eventTitle}</b> ({transfer.ticketTypeName}) to a friend.</p>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-slate-700">Recipient email</label>
                <input className="input mt-1" type="email" value={form.recipientEmail}
                       onChange={e => setForm({ ...form, recipientEmail: e.target.value })} placeholder="friend@example.com" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Confirm email</label>
                <input className="input mt-1" type="email" value={form.confirmEmail}
                       onChange={e => setForm({ ...form, confirmEmail: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Message <span className="muted">(optional)</span></label>
                <textarea className="input mt-1" rows={3} value={form.message}
                          onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Enjoy the show!" />
              </div>
            </div>
            <div className="flex gap-2 mt-5">
              <button onClick={() => setTransfer(null)} className="btn-ghost flex-1">Cancel</button>
              <button disabled={busy} onClick={submit} className="btn-primary flex-1">
                {busy ? 'Sending...' : 'Send Transfer'}
              </button>
            </div>
            <p className="text-xs muted text-center mt-3">The recipient must already have an iTicket account.</p>
          </div>
        </div>
      )}
    </div>
  );
}
