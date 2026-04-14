import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { useCart } from '../store/cart';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const items = useCart(s => s.items);
  const nav = useNavigate();

  const link = ({ isActive }: { isActive: boolean }) =>
    `px-3 py-2 text-sm rounded-lg transition ${isActive ? 'text-brand-600 bg-brand-50' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`;

  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-white/85 border-b border-slate-100">
      <div className="container-x flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-brand-500 grid place-items-center text-slate-900 font-extrabold shadow-glow">i</div>
          <span className="font-extrabold tracking-wide text-slate-900">ITICKET</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={link}>Discover</NavLink>
          <NavLink to="/events" className={link}>Events</NavLink>
          {user && <NavLink to="/my-tickets" className={link}>My Tickets</NavLink>}
          {user && <NavLink to="/my-orders" className={link}>Orders</NavLink>}
          {isAdmin() && <NavLink to="/admin" className={link}>Admin</NavLink>}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/checkout" className="relative btn-ghost h-10 px-3">
            <span>🛒</span><span className="ml-2 text-sm">{items.length}</span>
          </Link>
          {user ? (
            <>
              <Link to="/profile" className="hidden sm:inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-700 hover:text-brand-600">
                <span className="w-7 h-7 rounded-full bg-brand-50 text-brand-700 grid place-items-center font-semibold text-xs">
                  {user.firstName[0]}{user.lastName[0]}
                </span>
                <span>{user.firstName}</span>
              </Link>
              <button onClick={() => { logout(); nav('/'); }} className="btn-ghost h-10 text-sm">Sign out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-ghost h-10">Log in</Link>
              <Link to="/register" className="btn-primary h-10">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
