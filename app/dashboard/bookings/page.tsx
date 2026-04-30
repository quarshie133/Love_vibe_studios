import { getBookings } from '@/lib/actions';
import styles from './bookings.module.css';

export default async function BookingsPage() {
  const bookings = await getBookings();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Bookings Queue</h1>
        <p>Track all course enrolments and discovery call requests.</p>
      </div>

      <div className={styles.tableCard}>
        {bookings.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email / Phone</th>
                <th>Course</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                <tr key={b.id}>
                  <td>{new Date(b.createdAt!).toLocaleDateString()}</td>
                  <td><strong>{b.name}</strong></td>
                  <td>
                    <div>{b.email}</div>
                    <small>{b.phone}</small>
                  </td>
                  <td><span className={styles.badge}>{b.course}</span></td>
                  <td>
                    <span className={`${styles.status} ${styles[b.status!]}`}>
                      {b.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.empty}>
            <p>No bookings found yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
