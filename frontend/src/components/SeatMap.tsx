import { useMemo, useState } from 'react';
import { TicketType } from '../api/types';
import { useT } from '../i18n';

type Seat = { row: string; col: number; tier: TicketType; taken: boolean; id: string };

function buildSeats(ticketTypes: TicketType[]): { tiers: { tier: TicketType; rows: Seat[][] }[] } {
  const tiers = ticketTypes.map((tier, idx) => {
    // rows based on quota (roughly 14 seats per row)
    const seats = Math.min(tier.quota, 140);
    const perRow = 14;
    const rowCount = Math.max(2, Math.ceil(seats / perRow));
    const letter = (i: number) => String.fromCharCode(65 + idx * rowCount + i);
    const rows: Seat[][] = [];
    let remaining = seats;
    const sold = tier.sold;
    let soldRemaining = sold;
    for (let r = 0; r < rowCount; r++) {
      const row: Seat[] = [];
      const cols = Math.min(perRow, remaining);
      for (let c = 1; c <= cols; c++) {
        const isTaken = soldRemaining > 0 && Math.random() < (sold / seats) * 1.3;
        if (isTaken) soldRemaining--;
        row.push({
          row: letter(r), col: c, tier, taken: isTaken,
          id: `${tier.id}-${letter(r)}-${c}`
        });
      }
      rows.push(row);
      remaining -= cols;
      if (remaining <= 0) break;
    }
    return { tier, rows };
  });
  return { tiers };
}

export default function SeatMap({
  ticketTypes,
  selected,
  onToggle
}: {
  ticketTypes: TicketType[];
  selected: Set<string>;
  onToggle: (seat: Seat) => void;
}) {
  const t = useT();
  const [view3d, setView3d] = useState(false);
  const { tiers } = useMemo(() => buildSeats(ticketTypes), [ticketTypes]);

  return (
    <div>
      {/* Legend + view toggle */}
      <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-200 border border-slate-300 inline-block" /> {t('event.available')}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-slate-400 inline-block" /> {t('event.taken')}</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded bg-brand-500 inline-block" /> {t('event.selected')}</span>
        </div>
        <div className="inline-flex rounded-full border border-slate-200 p-0.5 bg-white">
          <button onClick={() => setView3d(false)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition ${!view3d ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>{t('event.view2d')}</button>
          <button onClick={() => setView3d(true)}
            className={`px-3 py-1 text-xs font-semibold rounded-full transition ${view3d ? 'bg-slate-900 text-white' : 'text-slate-600'}`}>{t('event.view3d')}</button>
        </div>
      </div>

      <div
        className="relative bg-gradient-to-b from-slate-50 to-white border border-slate-200 rounded-2xl p-4 md:p-6 overflow-x-auto"
        style={{ perspective: '1400px' }}
      >
        <div
          className="origin-top mx-auto transition-transform duration-500 ease-out"
          style={{
            transform: view3d ? 'rotateX(42deg) scale(0.96)' : 'none',
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Stage */}
          <div className="mx-auto w-3/4 max-w-lg text-center mb-5">
            <div className="h-8 rounded-t-[60%_100%] bg-gradient-to-b from-slate-900 to-slate-700 text-white grid place-items-center text-[10px] font-bold tracking-[0.3em]">
              {t('event.stage')}
            </div>
            <div className="h-1 bg-slate-900/70 rounded-b" />
          </div>

          {/* Tiers */}
          <div className="space-y-5">
            {tiers.map(({ tier, rows }) => (
              <div key={tier.id}>
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: tierColor(tier.id) }} />
                    <span className="text-xs font-semibold text-slate-700">{tier.name}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900">{tier.price} ₼</span>
                </div>
                <div className="space-y-1.5">
                  {rows.map((row, ri) => (
                    <div key={ri} className="flex items-center justify-center gap-1.5">
                      <span className="w-5 text-[10px] font-semibold text-slate-400 text-right">{row[0]?.row}</span>
                      <div className="flex gap-1">
                        {row.map(s => {
                          const sel = selected.has(s.id);
                          const cls = s.taken
                            ? 'bg-slate-300 cursor-not-allowed'
                            : sel
                              ? 'bg-brand-500 text-slate-900 shadow-glow scale-110'
                              : 'bg-slate-200 hover:bg-slate-300 cursor-pointer';
                          return (
                            <button key={s.id}
                              disabled={s.taken}
                              onClick={() => onToggle(s)}
                              title={`${s.row}-${s.col} · ${tier.name} · ${tier.price} ₼`}
                              className={`w-5 h-5 md:w-6 md:h-6 rounded-t-md text-[9px] font-bold transition ${cls}`}>
                              {sel ? '●' : ''}
                            </button>
                          );
                        })}
                      </div>
                      <span className="w-5 text-[10px] font-semibold text-slate-400 text-left">{row[0]?.row}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function tierColor(id: number) {
  const palette = ['#F5B400','#0ea5e9','#22c55e','#ec4899','#8b5cf6','#f97316'];
  return palette[id % palette.length];
}

export type { Seat };
