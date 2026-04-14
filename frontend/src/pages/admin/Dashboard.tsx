import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { AdminStats, ApiResponse } from '../../api/types';

const Card = ({ label, value, icon, accent = 'text-slate-900' }:
  { label: string; value: any; icon: string; accent?: string }) => (
  <div className="card p-5">
    <div className="flex items-center justify-between">
      <div className="text-xs text-slate-500 uppercase tracking-wide">{label}</div>
      <div className="w-9 h-9 rounded-lg bg-brand-50 grid place-items-center text-brand-600">{icon}</div>
    </div>
    <div className={`text-3xl font-extrabold mt-3 ${accent}`}>{value}</div>
  </div>
);

export default function Dashboard() {
  const [s, setS] = useState<AdminStats | null>(null);
  useEffect(() => { api.get<ApiResponse<AdminStats>>('/admin/stats').then(r => setS(r.data.data)); }, []);
  if (!s) return <div className="muted">Loading...</div>;
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-sm muted mt-1">Snapshot of platform activity.</p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card label="Users"        value={s.totalUsers}   icon="👥" />
        <Card label="Orders"       value={s.totalOrders}  icon="🧾" />
        <Card label="Sold Tickets" value={s.soldTickets}  icon="🎟" />
        <Card label="Revenue"      value={`${s.totalRevenue} ₼`} icon="💳" accent="text-emerald-600" />
        <Card label="Upcoming"     value={s.upcomingEvents} icon="📅" />
      </div>
    </div>
  );
}
