import { NavLink, Outlet } from 'react-router-dom';

const link = ({ isActive }: { isActive: boolean }) =>
  `block px-4 py-2 rounded-lg text-sm transition ${isActive ? 'bg-brand-500 text-white shadow-glow' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`;

export default function AdminLayout() {
  return (
    <div className="container-x py-8 grid lg:grid-cols-[240px_1fr] gap-8">
      <aside className="card p-3 h-fit space-y-1 sticky top-20">
        <div className="px-3 py-2 text-xs uppercase tracking-wide text-slate-400">Admin</div>
        <NavLink end to="/admin" className={link}>Dashboard</NavLink>
        <NavLink to="/admin/events" className={link}>Events</NavLink>
        <NavLink to="/admin/orders" className={link}>Orders</NavLink>
        <NavLink to="/admin/users" className={link}>Users</NavLink>
        <div className="px-3 py-2 mt-2 text-xs uppercase tracking-wide text-slate-400">Catalog</div>
        <NavLink to="/admin/categories" className={link}>Categories</NavLink>
        <NavLink to="/admin/venues" className={link}>Venues</NavLink>
        <NavLink to="/admin/cities" className={link}>Cities</NavLink>
      </aside>
      <section><Outlet /></section>
    </div>
  );
}
