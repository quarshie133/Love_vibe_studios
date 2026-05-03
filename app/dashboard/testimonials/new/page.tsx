'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addTestimonial } from '@/lib/actions';
import Link from 'next/link';
import styles from '../../courses/courses.module.css';

export default function NewTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const fd = new FormData(e.currentTarget);
    const result = await addTestimonial({
      name: fd.get('name') as string,
      role: fd.get('role') as string,
      content: fd.get('content') as string,
      stars: parseInt(fd.get('stars') as string) || 5,
      status: fd.get('status') as string,
    });

    if (result.success) {
      window.location.href = '/dashboard/testimonials';
    } else {
      alert('Failed to add testimonial.');
      setLoading(false);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Add New Testimonial</h1>
          <p>Share a new client success story.</p>
        </div>
        <Link href="/dashboard/testimonials" className={styles.backLink}>← Back to List</Link>
      </div>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Client Name</label>
            <input name="name" type="text" placeholder="e.g. John Doe" required />
          </div>

          <div className={styles.field}>
            <label>Program / Role</label>
            <input name="role" type="text" placeholder="e.g. Pre-Marital Counseling" />
          </div>

          <div className={styles.field}>
            <label>Testimonial Content</label>
            <textarea name="content" placeholder="Their story..." required rows={5} />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Stars (1-5)</label>
              <input name="stars" type="number" min="1" max="5" defaultValue="5" />
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <select name="status" defaultValue="approved">
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>

          <div className={styles.footer}>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Saving...' : 'Add Testimonial'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
