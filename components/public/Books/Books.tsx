import Image from 'next/image';
import styles from './Books.module.css';
import book1 from "../../../public/book1.jpeg"
import book2 from "../../../public/book2.jpeg"
import book3 from "../../../public/book3.jpeg"
import book4 from "../../../public/book4.jpeg"

const BOOKS = [
  {
    num: 'Book 01',
    title: 'When Love Becomes a Trap',
    author: 'Lady Rev. Baabah Djirackor',
    img: book1,
  },
  {
    num: 'Book 02',
    title: 'Guard Your Name',
    author: 'Lady Rev. Baabah Djirackor',
    img: book2,
  },
  {
    num: 'Book 03',
    title: 'Physical Intimacy in a Relationship',
    author: 'Lady Rev. Baabah Djirackor',
    img: book3,
  },
  {
    num: 'Book 04',
    title: 'When Money Talks',
    author: 'Lady Rev. Baabah Djirackor',
    img: book4,
  },
];

export default function Books() {
  return (
    <section className={styles.books} id="books">
      <div className={`${styles['section-header']} fade-in`}>
        <div className={styles['section-tag']}>By the Founder</div>
        <h2>Books by <em>Lady Rev. Baabah Djirackor</em></h2>
        <p>Transformational reads that equip, heal, and inspire — available now.</p>
      </div>
      <div className={styles['books-grid']}>
        {BOOKS.map(b => (
          <div key={b.num} className={`${styles['book-card']} fade-in`}>
            <div className={styles['book-cover-wrap']}>
              <Image 
                src={b.img} 
                alt={b.title} 
                fill 
                sizes="(max-width: 768px) 50vw, 25vw"
                className={styles['cover-image']}
              />
              <div className={styles['book-overlay']}>
                <span>View Book</span>
              </div>
            </div>
            <div className={styles['book-number']}>{b.num}</div>
            <div className={styles['book-title']}>{b.title}</div>
            <div className={styles['book-author']}>{b.author}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
