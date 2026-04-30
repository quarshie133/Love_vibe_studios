'use client';

import { useState } from 'react';
import { submitEnquiry } from '@/lib/actions';
import styles from './Contact.module.css';

interface ContactProps {
  programs: string[];
}

export default function Contact({ programs }: ContactProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    const fd = new FormData(e.currentTarget);
    const result = await submitEnquiry({
      firstName: fd.get('firstName') as string,
      lastName: fd.get('lastName') as string,
      email: fd.get('email') as string,
      phone: fd.get('phone') as string,
      program: fd.get('program') as string,
      message: fd.get('message') as string,
    });
    setStatus(result.success ? 'success' : 'error');
  }

  return (
    <section className={styles.contact} id="contact">
      <div className={`${styles['contact-inner']} fade-in`}>
        <div className={styles['section-tag']}>Take a Course</div>
        <h2 style={{fontFamily: "'Cormorant Garamond',serif", fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, lineHeight: 1.2}}>
          Start Your <em style={{fontStyle: 'italic', color: 'var(--rose)'}}>Journey</em> Today
        </h2>
        <p style={{color: 'var(--muted)', lineHeight: 1.8, marginTop: '1rem'}}>
          Fill in the form below and one of our counselors will reach out within 24 hours to schedule your free discovery call.
        </p>

        {status === 'success' ? (
          <div className={styles.success}>
            💛 Thank you! We will be in touch within 24 hours to schedule your free discovery call.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles['contact-form']}>
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label>First Name</label>
                <input name="firstName" type="text" placeholder="Your first name" required />
              </div>
              <div className={styles['form-group']}>
                <label>Last Name</label>
                <input name="lastName" type="text" placeholder="Your last name" required />
              </div>
            </div>
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label>Email Address</label>
                <input name="email" type="email" placeholder="you@email.com" required />
              </div>
              <div className={styles['form-group']}>
                <label>Phone (optional)</label>
                <input name="phone" type="tel" placeholder="+1 000 000 0000" />
              </div>
            </div>
            <div className={styles['form-group']}>
              <label>I&apos;m interested in</label>
              <select name="program">
                <option value="">Select a program…</option>
                {programs.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
            <div className={styles['form-group']}>
              <label>Tell us a little about your situation</label>
              <textarea name="message" placeholder="Share as much or as little as you'd like. Everything is confidential." />
            </div>
            {status === 'error' && <p className={styles.error}>Something went wrong. Please try again.</p>}
            <button type="submit" disabled={status === 'loading'} className={styles['btn-submit']}>
              {status === 'loading' ? 'Sending…' : 'Send Message & Book Free Call'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
