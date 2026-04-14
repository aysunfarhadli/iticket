import { useState, useRef, useEffect } from 'react';
import { Lang, useLang } from '../i18n';

const OPTS: { v: Lang; label: string; flag: string }[] = [
  { v: 'az', label: 'AZ', flag: '🇦🇿' },
  { v: 'en', label: 'EN', flag: '🇬🇧' },
  { v: 'ru', label: 'RU', flag: '🇷🇺' }
];

export default function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const cur = OPTS.find(o => o.v === lang)!;
  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="btn-ghost h-10 px-3 text-sm flex items-center gap-1.5">
        <span>{cur.flag}</span><span>{cur.label}</span>
        <span className={`text-slate-400 text-xs transition ${open ? 'rotate-180' : ''}`}>▾</span>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-card border border-slate-100 rounded-xl overflow-hidden w-32 z-50">
          {OPTS.map(o => (
            <button key={o.v} onClick={() => { setLang(o.v); setOpen(false); }}
              className={`w-full text-left px-3 py-2 text-sm flex items-center gap-2 hover:bg-slate-50 ${o.v === lang ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700'}`}>
              <span>{o.flag}</span><span>{o.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
