import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { api } from '../api/client';
import { ApiResponse, User } from '../api/types';
import { useAuth } from '../store/auth';

type FormData = { firstName: string; lastName: string; phone: string };

export default function Profile() {
  const { user, setAuth, token } = useAuth();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { firstName: user!.firstName, lastName: user!.lastName, phone: user!.phone ?? '' }
  });
  const onSubmit = async (d: FormData) => {
    const r = await api.put<ApiResponse<User>>('/users/me', d);
    setAuth(token!, r.data.data);
    toast.success('Profile updated');
  };
  return (
    <div className="container-x py-10 max-w-xl">
      <h1 className="text-3xl font-bold mb-6 text-slate-900">Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="card p-6 space-y-4">
        <div><label className="text-sm font-medium text-slate-700">First name</label>
          <input className="input mt-1" {...register('firstName', { required: true })} /></div>
        <div><label className="text-sm font-medium text-slate-700">Last name</label>
          <input className="input mt-1" {...register('lastName', { required: true })} /></div>
        <div><label className="text-sm font-medium text-slate-700">Phone</label>
          <input className="input mt-1" {...register('phone')} /></div>
        <div><label className="text-sm font-medium text-slate-700">Email</label>
          <input className="input mt-1 bg-slate-50" disabled value={user!.email} /></div>
        <button className="btn-primary">Save changes</button>
      </form>
    </div>
  );
}
