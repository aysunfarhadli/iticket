import { useEffect, useState } from 'react';
import { api } from '../../api/client';
import { ApiResponse, User } from '../../api/types';

export default function AdminUsers() {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => { api.get<ApiResponse<User[]>>('/admin/users').then(r => setUsers(r.data.data)); }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">İstifadəçilər</h1>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left"><tr>
            <th className="p-3">Ad Soyad</th><th className="p-3">Email</th><th className="p-3">Telefon</th><th className="p-3">Roles</th></tr></thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} className="border-t border-slate-100">
                <td className="p-3">{u.firstName} {u.lastName}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3">{u.phone ?? '—'}</td>
                <td className="p-3">{u.roles.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
