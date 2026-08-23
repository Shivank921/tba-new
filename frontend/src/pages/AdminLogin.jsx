import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { LogIn, Loader2, ShieldCheck, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';

const AdminLogin = () => {
  const { login, user, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a0f0a] text-[#fef6e4]">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (user) return <Navigate to="/admin" replace />;

  const submit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      toast.error('Please enter username and password');
      return;
    }
    try {
      setSubmitting(true);
      await login(form.username.trim(), form.password);
      toast.success('Welcome, committee member.');
      navigate('/admin', { replace: true });
    } catch (err) {
      const detail = err?.response?.data?.detail || 'Invalid credentials';
      toast.error(detail);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-10 bg-[#1a0f0a] overflow-hidden">
      {/* Ambient */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#8b1a1a] blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[#c8862a] blur-[120px]" />
      </div>
      <div className="absolute top-0 left-0 right-0 h-8 alpana-border opacity-40" />

      <div className="relative w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] color-gold font-bold mb-6 hover:text-[#f5c76a] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Site
        </button>

        <div className="glass-dark rounded-3xl p-8 md:p-10 border border-[#c8862a]/30 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8b1a1a] to-[#c8862a] flex items-center justify-center text-[#fef6e4]">
              <ShieldCheck size={20} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] color-gold font-bold">
                Committee Portal
              </div>
              <div className="font-display text-2xl font-bold text-[#fef6e4]">Admin Sign In</div>
            </div>
          </div>

          <form onSubmit={submit} className="space-y-5">
            <div>
              <label className="text-xs uppercase tracking-[0.2em] font-bold text-[#fef6e4]/60 mb-2 block">
                Username
              </label>
              <input
                autoFocus
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full rounded-xl border-2 border-[#c8862a]/30 bg-[#fef6e4]/5 px-4 py-3 text-[#fef6e4] placeholder-[#fef6e4]/40 focus:outline-none focus:border-[#c8862a] transition-colors"
                placeholder="admin"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-[0.2em] font-bold text-[#fef6e4]/60 mb-2 block">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-xl border-2 border-[#c8862a]/30 bg-[#fef6e4]/5 px-4 py-3 text-[#fef6e4] placeholder-[#fef6e4]/40 focus:outline-none focus:border-[#c8862a] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#c8862a] hover:bg-[#b8762a] disabled:opacity-70 text-[#1a0f0a] py-3.5 font-semibold shadow-md hover:shadow-xl transition-all"
            >
              {submitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Signing in . . .
                </>
              ) : (
                <>
                  <LogIn size={16} /> Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#c8862a]/20 text-xs text-[#fef6e4]/50 leading-relaxed">
            Access is restricted to committee members. If you have forgotten your credentials, please contact the association secretary.
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
