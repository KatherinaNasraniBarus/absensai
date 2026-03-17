import React, { useState, useEffect } from 'react';
import {
  Camera, MapPin, ShieldCheck, Clock, Users, Activity,
  ArrowRight, CheckCircle2, Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { MockApi } from '../utils/api';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Verifikasi Biometrik',
    desc: 'Pengenalan wajah presisi tinggi menggunakan face-api.js dengan deteksi liveness aktif.',
    color: 'var(--primary)',
    bg: 'var(--primary-subtle)',
  },
  {
    icon: MapPin,
    title: 'GPS Real-Time',
    desc: 'Lacak koordinat lokasi absensi secara langsung melalui peta interaktif Leaflet.',
    color: 'var(--info)',
    bg: 'var(--info-bg)',
  },
  {
    icon: Zap,
    title: 'Absen Zoom/Dinas',
    desc: 'Mode khusus untuk absensi jarak jauh tanpa validasi radius lokasi.',
    color: 'var(--warning)',
    bg: 'var(--warning-bg)',
  },
];

export default function Dashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, checkInsToday: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const users = await MockApi.getAllUsers();
        setStats({
          totalUsers: users.length,
          checkInsToday: Math.floor(users.length * 0.8),
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
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>

      {/* ─── Hero ─── */}
      <section style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #eff6ff 100%)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-3xl)',
        padding: 'clamp(2rem, 5vw, 3.5rem)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '280px', height: '280px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '30%',
          width: '200px', height: '200px',
          background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
          <span className="badge badge-primary mb-4" style={{ display: 'inline-flex' }}>
            <ShieldCheck size={12} /> Verifikasi Biometrik v2.0
          </span>

          <h1 style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            marginBottom: 'var(--space-3)',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
          }}>
            Sistem Presensi{' '}
            <span style={{ color: 'var(--primary)' }}>Cerdas</span>{' '}
            BPJS
          </h1>

          <p style={{
            fontSize: 'var(--fs-lg)',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            marginBottom: 'var(--space-6)',
            maxWidth: '520px',
          }}>
            Platform absensi generasi baru yang menggabungkan pengenalan wajah presisi tinggi
            dengan validasi GPS untuk akurasi dan keamanan maksimal.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/attendance" className="btn btn-primary btn-lg">
              <MapPin size={18} />
              Mulai Presensi
              <ArrowRight size={16} />
            </Link>
            <Link to="/register-face" className="btn btn-secondary btn-lg">
              <Camera size={18} />
              Daftar Wajah
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-4)' }}>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--primary-subtle)' }}>
              <Users size={24} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <p className="stat-label">Total Pendaftar</p>
              <p className="stat-value">
                {isLoading ? '—' : stats.totalUsers}
                <span className="stat-unit">Orang</span>
              </p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'var(--info-bg)' }}>
              <Clock size={24} style={{ color: 'var(--info)' }} />
            </div>
            <div>
              <p className="stat-label">Presensi Hari Ini</p>
              <p className="stat-value">
                {isLoading ? '—' : stats.checkInsToday}
                <span className="stat-unit">Aktivitas</span>
              </p>
            </div>
          </div>

          <div className="stat-card" style={{ gridColumn: 'auto' }}>
            <div className="stat-icon" style={{ background: 'var(--success-bg)' }}>
              <Activity size={24} style={{ color: 'var(--success)' }} />
            </div>
            <div style={{ flex: 1 }}>
              <p className="stat-label">Status Server</p>
              <div className="flex items-center gap-2" style={{ marginTop: '4px' }}>
                <span style={{
                  width: '10px', height: '10px',
                  borderRadius: '50%',
                  background: 'var(--success)',
                  animation: 'pulse 2s ease-in-out infinite',
                  display: 'inline-block',
                  boxShadow: '0 0 0 3px rgba(5,150,105,0.2)',
                }} />
                <span style={{ fontWeight: 700, fontSize: 'var(--fs-sm)', color: 'var(--text-primary)' }}>
                  Backend Aktif
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─── Feature Cards ─── */}
      <section>
        <div style={{ marginBottom: 'var(--space-5)' }}>
          <h2 style={{ fontSize: 'var(--fs-xl)', fontWeight: 700, marginBottom: 'var(--space-1)' }}>
            Fitur Unggulan
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--fs-sm)' }}>
            Tiga pilar utama sistem absensi digital BPJS.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--space-4)' }}>
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div key={title} className="card" style={{ padding: 'var(--space-5)', transition: 'all 0.2s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = 'var(--shadow-lg)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
            >
              <div style={{
                width: '44px', height: '44px',
                borderRadius: 'var(--radius-lg)',
                background: bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: 'var(--space-4)',
              }}>
                <Icon size={22} style={{ color }} />
              </div>
              <h3 style={{ fontSize: 'var(--fs-base)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                {title}
              </h3>
              <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', lineHeight: 1.65 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Quick Guide ─── */}
      <section className="card" style={{ padding: 'var(--space-6)' }}>
        <h2 style={{ fontSize: 'var(--fs-lg)', fontWeight: 700, marginBottom: 'var(--space-5)' }}>
          Panduan Cepat
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {[
            { step: '1', text: 'Daftarkan wajah Anda melalui halaman Registrasi Wajah', to: '/register-face', label: 'Daftar Sekarang', icon: Camera },
            { step: '2', text: 'Masuk ke halaman Presensi dan pilih mode absensi (Reguler / Zoom)', to: '/attendance', label: 'Mulai Presensi', icon: MapPin },
            { step: '3', text: 'Masukkan NIM, arahkan wajah ke kamera, dan tekan tombol Catat Kehadiran', to: null },
          ].map(({ step, text, to, label, icon: Icon }) => (
            <div key={step} className="flex items-center gap-4" style={{
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--surface-2)',
              border: '1px solid var(--border-color)',
            }}>
              <span style={{
                width: '28px', height: '28px',
                borderRadius: '50%',
                background: 'var(--primary)',
                color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 'var(--fs-xs)', fontWeight: 800,
                flexShrink: 0,
              }}>{step}</span>
              <p style={{ flex: 1, fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)' }}>{text}</p>
              {to && (
                <Link to={to} className="btn btn-ghost btn-sm" style={{ color: 'var(--primary)', flexShrink: 0 }}>
                  {Icon && <Icon size={13} />}
                  {label}
                </Link>
              )}
              {!to && (
                <CheckCircle2 size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
