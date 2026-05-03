import { getTestimonials } from '@/lib/actions';
import styles from './Testimonials.module.css';

const TESTIMONIALS = [
  { content: 'The pre-marital courses gave us a language to talk about things we\'d never even discussed. We went into marriage with so much more confidence and understanding of each other.', name: '— Amara & Tunde', role: 'Pre-Marital Counseling', stars: 5 },
  { content: 'I didn\'t think we could come back from where we were. The crisis counseling saved our marriage. Having someone skilled to guide us through the storm made all the difference.', name: '— David & Mercy', role: 'Crisis Management', stars: 5 },
  { content: 'After my divorce, I felt lost. Love Vibe Studio helped me find myself again. I\'m not just surviving — I am genuinely thriving and excited about my future.', name: '— Chioma O.', role: 'Thriving Beyond Divorce', stars: 5 },
];

export default async function Testimonials() {
  let dbTestimonials = [];
  try {
    dbTestimonials = await getTestimonials();
  } catch (error) {
    console.error(error);
  }

  const approvedTestimonials = dbTestimonials.filter(t => t.status === 'approved');
  const displayTestimonials = approvedTestimonials.length > 0 ? approvedTestimonials : TESTIMONIALS;

  return (
    <section className={styles.testimonials} id="testimonials">
      <div className={`${styles.header} fade-in`}>
        <div className={styles.tag}>Client Stories</div>
        <h2>Real <em>Transformations</em>, Real People</h2>
      </div>
      <div className={styles.grid}>
        {displayTestimonials.map((t, idx) => (
          <div key={t.name + idx} className={`${styles.card} fade-in`}>
            <div className={styles.quoteChar}>&ldquo;</div>
            <div className={styles.stars}>{'★'.repeat(t.stars ?? 5)}</div>
            <p>{t.content}</p>
            <div className={styles.name}>{t.name}</div>
            <div className={styles.role}>{t.role}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
