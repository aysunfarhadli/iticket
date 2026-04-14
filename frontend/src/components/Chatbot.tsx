import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api/client';
import { ApiResponse, Category, EventDto, Page } from '../api/types';

type Msg = { role: 'bot' | 'user'; text: string; events?: EventDto[] };

const initial: Msg[] = [
  { role: 'bot', text: "Salam! Mən iTicket köməkçinizəm 👋 Kömək edə bilərəm: event tapmaq, kateqoriya axtarışı, bilet almaq, transfer, pickup seçimi. Nə axtarırsan?" }
];

const suggestions = ['Konsertlər', 'Teatr', 'Festival', 'İdman', 'Necə bilet ötürüm?'];

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>(initial);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [cats, setCats] = useState<Category[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { api.get<ApiResponse<Category[]>>('/categories').then(r => setCats(r.data.data)).catch(() => {}); }, []);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs, open]);

  const reply = async (text: string) => {
    const q = text.trim(); if (!q) return;
    setMsgs(m => [...m, { role: 'user', text: q }]);
    setInput(''); setBusy(true);

    try {
      const low = q.toLowerCase();

      if (/(transfer|öt[üu]r|hediyy)/.test(low)) {
        setMsgs(m => [...m, { role: 'bot', text: "Bilet transferi çox asandır: **My Tickets** → istədiyin biletdə **Transfer Ticket** düyməsinə bas → alıcının email-ini yaz → Send Transfer 🎟✨" }]);
        return;
      }
      if (/pickup|e-ticket|kassa/.test(low)) {
        setMsgs(m => [...m, { role: 'bot', text: "Checkout zamanı iki seçim var:\n• **E-ticket** — email-ə dərhal gəlir\n• **Pickup at city office** — şəhər kassasından götür" }]);
        return;
      }
      if (/ney[əe] |how |nec[əe]/.test(low) && /bilet|ticket|register|login|qeyd|giri/.test(low)) {
        setMsgs(m => [...m, { role: 'bot', text: "1️⃣ Qeydiyyatdan keç və ya giriş et\n2️⃣ Event seç → bilet növü seç\n3️⃣ Checkout → pickup üsulu + kart\n4️⃣ Success → email-ə invoice gəlir" }]);
        return;
      }
      if (/salam|hi|hello|hey/.test(low)) {
        setMsgs(m => [...m, { role: 'bot', text: "Salam 👋 Sənə gözəl bir event tapım? Yaz: konsert, teatr, festival, idman..." }]);
        return;
      }

      // Default: search events
      const cat = cats.find(c => low.includes(c.name.toLowerCase()) || low.includes(c.slug.toLowerCase()));
      const params: any = { size: 4 };
      if (cat) params.categoryId = cat.id; else params.q = q;
      const r = await api.get<ApiResponse<Page<EventDto>>>('/events', { params });
      const events = r.data.data.content;
      if (events.length === 0) {
        setMsgs(m => [...m, { role: 'bot', text: `"${q}" üçün nəticə tapmadım 🙈 Başqa söz yaz, yaxud kateqoriya seç.` }]);
      } else {
        setMsgs(m => [...m, { role: 'bot', text: cat ? `"${cat.name}" kateqoriyasında budur:` : `Tapdım, bax:`, events }]);
      }
    } catch {
      setMsgs(m => [...m, { role: 'bot', text: "Texniki problem oldu, bir az sonra yenidən yoxla." }]);
    } finally { setBusy(false); }
  };

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-brand-500 hover:bg-brand-600 text-white shadow-glow grid place-items-center text-2xl transition"
        aria-label="Chat">
        {open ? '×' : '💬'}
      </button>

      {open && (
        <div className="fixed bottom-24 right-5 z-40 w-[360px] max-w-[calc(100vw-24px)] h-[540px] bg-white rounded-2xl shadow-card border border-slate-100 overflow-hidden flex flex-col animate-[fadeIn_.2s_ease]">
          <div className="bg-brand-500 text-white p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white/20 grid place-items-center text-lg">🤖</div>
            <div className="flex-1">
              <div className="font-bold leading-tight">iTicket Bot</div>
              <div className="text-xs opacity-80 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-300 inline-block" /> Online</div>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/80 hover:text-white text-xl leading-none">×</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-line ${
                  m.role === 'user'
                    ? 'bg-brand-500 text-white rounded-br-md'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-bl-md'
                }`}>
                  {m.text}
                  {m.events && (
                    <div className="mt-2 space-y-2">
                      {m.events.map(e => (
                        <Link key={e.id} to={`/events/${e.id}`} onClick={() => setOpen(false)}
                          className="flex gap-2 items-center p-2 rounded-lg hover:bg-slate-50 border border-slate-100 transition">
                          <img src={e.coverImageUrl} className="w-12 h-12 rounded-md object-cover" />
                          <div className="min-w-0">
                            <div className="text-xs font-semibold text-slate-900 line-clamp-1">{e.title}</div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">{e.venueName} · {new Date(e.startsAt).toLocaleDateString('en-GB')}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {busy && <div className="text-xs muted">Bot yazır…</div>}
            <div ref={endRef} />
          </div>

          {msgs.length === 1 && (
            <div className="px-3 pt-2 flex gap-2 flex-wrap border-t border-slate-100 bg-white">
              {suggestions.map(s => (
                <button key={s} onClick={() => reply(s)}
                  className="text-xs bg-slate-100 hover:bg-brand-50 hover:text-brand-700 px-3 py-1.5 rounded-full transition">{s}</button>
              ))}
            </div>
          )}

          <form onSubmit={e => { e.preventDefault(); reply(input); }} className="p-3 border-t border-slate-100 flex gap-2 bg-white">
            <input value={input} onChange={e => setInput(e.target.value)}
              placeholder="Sualını yaz..."
              className="flex-1 bg-slate-100 border border-transparent focus:border-brand-500 focus:bg-white rounded-full px-4 py-2 text-sm outline-none" />
            <button disabled={busy || !input.trim()} className="bg-brand-500 hover:bg-brand-600 disabled:opacity-40 text-white rounded-full w-10 h-10 grid place-items-center">➤</button>
          </form>
        </div>
      )}
    </>
  );
}
