'use client';

import { useState } from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';
import type { Language } from '@/types';
import { translations } from '@/lib/translations';
import Reveal from '@/components/Reveal';
import { SectionLabel, SectionHeading } from '@/components/Story';
import Footer from '@/components/Footer';

interface ContactProps {
  lang: Language;
}

interface FormState {
  name: string;
  email: string;
  date: string;
  guests: string;
  message: string;
}

export default function Contact({ lang }: ContactProps) {
  const t = translations[lang].contact;
  const f = t.form;
  const [form, setForm] = useState<FormState>({ name: '', email: '', date: '', guests: '2', message: '' });
  const [sent, setSent] = useState(false);

  const update = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [field]: e.target.value }));

  return (
    <section id="contact" style={{ background: '#EFEFEA', padding: 'clamp(5rem,10vw,9rem) 0 0' }}>
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 clamp(1.5rem,5vw,4rem)' }}>

        {/* Heading */}
        <Reveal>
          <div className="text-center mb-[4.5rem]">
            <SectionLabel centered>{t.label}</SectionLabel>
            <SectionHeading centered>{t.headline}</SectionHeading>
          </div>
        </Reveal>

        {/* Two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'clamp(3rem,7vw,6rem)' }}>

          {/* Left — map + info */}
          <div>
            <Reveal>
              {/* Google Maps embed */}
              <div
                className="relative overflow-hidden mb-8"
                style={{
                  aspectRatio: '4/3',
                  border: '1px solid rgba(26,26,26,0.08)',
                  filter: 'grayscale(1) contrast(1.1) opacity(0.85) sepia(0.25)',
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4902.950358324448!2d17.074000495466723!3d42.93127122442997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x134a456d2056cd8b%3A0x58b5e07f943b6dbb!2sKonoba%20Maha!5e1!3m2!1sen!2shr!4v1777761744565!5m2!1sen!2shr"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Konoba Maha — Žrnovo, Korčula"
                  className="absolute inset-0"
                />
              </div>
            </Reveal>

            <Reveal delay={100}>
              <div className="flex flex-col gap-5">
                <InfoRow icon={<MapPin size={14} />} value={t.address.split('\n').map((l, i) => <div key={i}>{l}</div>)} />
                <InfoRow icon={<Clock size={14} />} value={t.hours.split('\n').map((l, i) => <div key={i}>{l}</div>)} />
                <InfoRow
                  icon={<Phone size={14} />}
                  value={<a href={`tel:${t.phone}`} className="no-underline" style={{ color: 'inherit' }}>{t.phone}</a>}
                />
                <InfoRow
                  icon={<Mail size={14} />}
                  value={<a href={`mailto:${t.email}`} className="no-underline" style={{ color: 'inherit' }}>{t.email}</a>}
                />
              </div>
            </Reveal>

            <Reveal delay={150}>
              <div className="mt-5 pt-5" style={{ borderTop: '1px solid rgba(26,26,26,0.1)' }}>
                <p
                  className="uppercase mb-3"
                  style={{
                    fontFamily: 'var(--font-montserrat-sans)',
                    fontSize: '0.55rem',
                    letterSpacing: '0.22em',
                    color: '#9B9390',
                  }}
                >
                  {translations[lang].footer.partners}
                </p>
                <div className="flex gap-6">
                  {(['Maha Bar', 'Bazita'] as const).map((name) => (
                    <a
                      key={name}
                      href="#"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline transition-opacity duration-200 hover:opacity-70"
                      style={{
                        fontFamily: 'var(--font-montserrat-sans)',
                        fontSize: '0.78rem',
                        color: '#6B6560',
                        fontWeight: 300,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <a
                href={t.reserveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-10 no-underline transition-opacity duration-300 hover:opacity-80 uppercase"
                style={{
                  background: '#1A1A1A',
                  color: '#F5F5F0',
                  fontFamily: 'var(--font-montserrat-sans)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.2em',
                  padding: '15px 30px',
                }}
              >
                {t.reserve}
              </a>
            </Reveal>
          </div>

          {/* Right — form */}
          <Reveal delay={150} direction="right">
            {sent ? (
              <div className="flex flex-col items-center justify-center text-center" style={{ minHeight: '400px' }}>
                <div style={{ fontFamily: 'var(--font-playfair-display)', fontSize: '3rem', color: '#9B8060', marginBottom: '1rem' }}>✓</div>
                <div
                  className="italic"
                  style={{ fontFamily: 'var(--font-playfair-display)', fontSize: '1.5rem', color: '#1A1A1A' }}
                >
                  {f.success}
                </div>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="flex flex-col gap-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label={f.name} value={form.name} onChange={update('name')} />
                  <FormField label={f.email} type="email" value={form.email} onChange={update('email')} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <FormField label={f.date} type="date" value={form.date} onChange={update('date')} />
                  <FormField label={f.guests} type="number" value={form.guests} min="1" max="80" onChange={update('guests')} />
                </div>
                <FormField label={f.message} value={form.message} onChange={update('message')} multiline />
                <button
                  type="submit"
                  className="self-start uppercase transition-opacity duration-300 hover:opacity-75 cursor-pointer border-none"
                  style={{
                    background: '#1A1A1A',
                    color: '#F5F5F0',
                    fontFamily: 'var(--font-montserrat-sans)',
                    fontSize: '0.62rem',
                    letterSpacing: '0.22em',
                    padding: '16px 36px',
                  }}
                >
                  {f.submit}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>

      <Footer lang={lang} />
    </section>
  );
}

/* ── Info row ── */
function InfoRow({ icon, value }: { icon: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="flex gap-4 items-start">
      <span className="flex-shrink-0 mt-[3px]" style={{ color: '#9B8060' }}>{icon}</span>
      <div
        style={{
          fontFamily: 'var(--font-montserrat-sans)',
          fontSize: '0.78rem',
          lineHeight: 1.75,
          color: '#6B6560',
          fontWeight: 300,
        }}
      >
        {value}
      </div>
    </div>
  );
}

/* ── Form field ── */
interface FormFieldProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  multiline?: boolean;
  min?: string;
  max?: string;
}

function FormField({ label, value, onChange, type = 'text', multiline, min, max }: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid ${focused ? '#1A1A1A' : 'rgba(26,26,26,0.2)'}`,
    color: '#1A1A1A',
    fontFamily: 'var(--font-montserrat-sans)',
    fontSize: '0.8rem',
    padding: '10px 0',
    outline: 'none',
    letterSpacing: '0.04em',
    transition: 'border-color 0.2s',
    resize: 'none',
    boxSizing: 'border-box',
    colorScheme: 'light',
  };

  return (
    <div className="flex flex-col gap-[6px]">
      <label
        className="uppercase transition-colors duration-200"
        style={{
          fontFamily: 'var(--font-montserrat-sans)',
          fontSize: '0.55rem',
          letterSpacing: '0.22em',
          color: focused ? '#1A1A1A' : '#9B9390',
        }}
      >
        {label}
      </label>
      {multiline ? (
        <textarea
          value={value}
          rows={4}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
        />
      ) : (
        <input
          type={type}
          value={value}
          min={min}
          max={max}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={inputStyle}
        />
      )}
    </div>
  );
}
