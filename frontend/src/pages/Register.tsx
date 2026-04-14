import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { api } from '../api/client';
import { ApiResponse, AuthResp } from '../api/types';
import { useAuth } from '../store/auth';

type FormData = { firstName: string; lastName: string; email: string; password: string; phone?: string };

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>();
  const setAuth = useAuth(s => s.setAuth);
  const nav = useNavigate();

  const onSubmit = async (d: FormData) => {
    try {
      const r = await api.post<ApiResponse<AuthResp>>('/auth/register', d);
      setAuth(r.data.data.accessToken, r.data.data.user);
      toast.success('Xoş gəldin!');
      nav('/');
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? 'Qeydiyyat alınmadı');
    }
  };

  return (
    <div className="container-x py-16 grid md:grid-cols-2 gap-10 items-center">
      <div className="hidden md:block">
        <h1 className="text-4xl font-extrabold text-slate-900">Join the show 🎉</h1>
        <p className="muted mt-3">One account for buying, transferring and managing all your tickets.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-8 space-y-3 max-w-md w-full mx-auto">
        <h2 className="text-2xl font-bold text-slate-900">Create account</h2>
        <div className="grid grid-cols-2 gap-3">
          <div><label className="text-sm font-medium text-slate-700">First name</label>
            <input className="input mt-1" {...register('firstName', { required: true })} /></div>
          <div><label className="text-sm font-medium text-slate-700">Last name</label>
            <input className="input mt-1" {...register('lastName', { required: true })} /></div>
        </div>
        <div><label className="text-sm font-medium text-slate-700">Email</label>
          <input className="input mt-1" {...register('email', { required: true })} /></div>
        <div><label className="text-sm font-medium text-slate-700">Phone</label>
          <input className="input mt-1" {...register('phone')} /></div>
        <div><label className="text-sm font-medium text-slate-700">Password</label>
          <input type="password" className="input mt-1" {...register('password', { required: true, minLength: 6 })} />
          {errors.password && <span className="text-danger text-xs">Min 6 characters</span>}</div>
        <button disabled={isSubmitting} className="btn-primary w-full mt-2">Create account</button>
        <div className="text-sm muted text-center">Already a member? <Link to="/login" className="text-brand-600 font-medium">Log in</Link></div>
      </form>
    </div>
  );
}
