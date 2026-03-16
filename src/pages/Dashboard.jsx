import React, { useState, useEffect } from 'react';
import { Camera, MapPin, ShieldCheck, Clock, Users, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MockApi } from '../utils/api';

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    checkInsToday: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await MockApi.getAllUsers();
        // Just mock some checkins for the UI today if we don't have the real count
        // In a real app we'd fetch from another endpoint
        setStats({
          totalUsers: users.length,
          checkInsToday: Math.floor(users.length * 0.8) // Mocking 80% attendance
        });
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="animate-fade-in flex-col gap-6 max-w-5xl mx-auto pb-8">
      {/* Premium Hero Section */}
      <div className="glass-panel p-8 md:p-12 mb-6 flex-col md:flex-row items-center justify-between gap-8 border-l-4 overflow-hidden relative" style={{ borderLeftColor: 'var(--primary)', background: 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.85))' }}>
        
        {/* Decorative Background Elements */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary opacity-5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary opacity-5 rounded-full blur-3xl"></div>

        <div className="flex-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary bg-opacity-10 text-primary text-sm font-bold mb-6">
            <ShieldCheck size={16} /> Verifikasi Biometrik v2.0
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
            Sistem Presensi <span style={{ color: 'var(--primary)' }}>Cerdas</span>
          </h1>
          <p className="text-lg text-secondary mb-8 max-w-xl leading-relaxed">
            Platform absensi generasi baru untuk BPJS Ketenagakerjaan. Menggabungkan pengenalan wajah presisi tinggi dan validasi radius GPS untuk akurasi maksimal.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/attendance" className="btn btn-primary px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all">
              <MapPin size={22} />
              Mulai Presensi
            </Link>
            <Link to="/register-face" className="btn btn-secondary px-6 py-4 text-lg bg-white shadow-sm hover:shadow-md">
              <Camera size={22} />
              Daftar Wajah Baru
            </Link>
          </div>
        </div>

        <div className="hidden md:flex relative justify-center items-center w-72 h-72 shrink-0 z-10">
          {/* Faux 3D Floating Element */}
          <div className="absolute inset-0 bg-gradient-to-tr from-primary-light to-secondary opacity-10 rounded-full blur-2xl animate-pulse"></div>
          <div className="relative bg-white p-8 rounded-3xl shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-500 border border-slate-100 flex flex-col items-center gap-4">
             <div className="p-4 bg-primary bg-opacity-10 rounded-full text-primary">
               <ShieldCheck size={80} strokeWidth={1.5} />
             </div>
             <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-3/4 rounded-full"></div>
             </div>
             <p className="text-xs font-bold text-secondary uppercase tracking-widest">Sistem Aktif</p>
          </div>
        </div>
      </div>

      {/* Grid Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1 */}
        <div className="glass-panel p-6 flex items-center gap-5 hover:scale-[1.02] transition-transform cursor-default relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-success-bg to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
          <div className="p-4 rounded-xl text-primary relative z-10" style={{ background: 'linear-gradient(135deg, var(--success-bg), white)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
            <Users size={32} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Total Pendaftar</p>
            <h3 className="text-3xl font-bold">{isLoading ? '-' : stats.totalUsers} <span className="text-sm font-normal text-tertiary">Orang</span></h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass-panel p-6 flex items-center gap-5 hover:scale-[1.02] transition-transform cursor-default relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-r from-info-bg to-transparent opacity-0 group-hover:opacity-50 transition-opacity"></div>
          <div className="p-4 rounded-xl text-info relative z-10" style={{ background: 'linear-gradient(135deg, var(--info-bg), white)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)' }}>
            <Clock size={32} />
          </div>
          <div className="relative z-10">
            <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">Presensi Hari Ini</p>
            <h3 className="text-3xl font-bold">{isLoading ? '-' : stats.checkInsToday} <span className="text-sm font-normal text-tertiary">Aktivitas</span></h3>
          </div>
        </div>

        {/* Server Status */}
        <div className="glass-panel p-6 flex-col justify-center gap-3 border-dashed border-2 hover:border-primary transition-colors cursor-default group">
          <h3 className="font-bold flex items-center gap-2 text-secondary group-hover:text-primary transition-colors">
            <Activity size={20} /> Status Koneksi
          </h3>
          <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border">
             <div className="w-3 h-3 rounded-full bg-success animate-pulse shadow-glow"></div>
             <span className="text-sm font-bold text-slate-700">Server Backend Aktif</span>
          </div>
        </div>

      </div>
    </div>
  );
}
