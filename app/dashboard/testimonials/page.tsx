import Link from 'next/link';
import { getTestimonials } from '@/lib/actions';
import styles from './testimonials.module.css';

export const dynamic = 'force-dynamic';

export default async function TestimonialsPage() {
  let testimonials: Awaited<ReturnType<typeof getTestimonials>> = [];
  let dbError = false;

  try {
    testimonials = await getTestimonials();
  } catch {
    dbError = true;
  }

  const all = testimonials;

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Testimonials</h1>
          <p>Manage client stories and reviews.</p>
        </div>
        <Link href="/dashboard/testimonials/new" className={styles.btn}>
          + Add New Testimonial
        </Link>
      </div>
      {dbError && (
        <div className={styles.notice}>⚠️ Showing sample data — connect your database to manage real testimonials.</div>
      )}
      <div className={styles.grid}>
        {all.map(t => (
          <div key={t.id} className={styles.card}>
            <div className={styles.stars}>{'★'.repeat(t.stars ?? 5)}</div>
            <p>&ldquo;{t.content}&rdquo;</p>
            <div className={styles.meta}>
              <strong>{t.name}</strong>
              <span>{t.role}</span>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem'}}>
              <span className={`${styles.badge} ${t.status === 'approved' ? styles.approved : styles.pending}`}>{t.status}</span>
              <Link href={`/dashboard/testimonials/${t.id}`} className={styles.editBtn}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
