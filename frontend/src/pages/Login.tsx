import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../api/client';
import { ApiResponse, AuthResp } from '../api/types';
import { useAuth } from '../store/auth';

type FormData = { email: string; password: string };

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const setAuth = useAuth(s => s.setAuth);
  const nav = useNavigate();
  const loc = useLocation() as any;
  const from = loc.state?.from ?? '/';

  const onSubmit = async (d: FormData) => {
    try {
      const r = await api.post<ApiResponse<AuthResp>>('/auth/login', d);
      setAuth(r.data.data.accessToken, r.data.data.user);
      toast.success('Xoş gəldin, ' + r.data.data.user.firstName);
      nav(from);
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Giriş alınmadı');
    }
  };

  return (
    <div className="container-x py-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="hidden md:block">
        <h1 className="text-4xl font-extrabold text-slate-900">Welcome back 👋</h1>
        <p className="muted mt-3">Sign in to manage your tickets, transfer them to friends, and never miss a show.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-4 max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold text-slate-900">Log in</h2>
        <div>
          <label className="text-sm font-medium text-slate-700">Email</label>
          <input className="input mt-1" {...register('email', { required: true })} />
          {errors.email && <span className="text-danger text-xs">Email is required</span>}
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Password</label>
          <input type="password" className="input mt-1" {...register('password', { required: true })} />
          {errors.password && <span className="text-danger text-xs">Password is required</span>}
        </div>
        <button disabled={isSubmitting} className="btn-primary w-full">Log in</button>
        <div className="text-sm muted text-center">Don't have an account? <Link to="/register" className="text-brand-600 font-medium">Sign up</Link></div>
        <div className="text-xs muted text-center pt-3 border-t border-slate-100">
          Demo: admin@iticket.az / admin123 — user@iticket.az / user123
        </div>
      </form>
    </div>
  );
}
