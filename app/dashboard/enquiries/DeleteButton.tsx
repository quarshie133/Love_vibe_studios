'use client';

import { useState } from 'react';
import { deleteEnquiry } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import styles from './enquiries.module.css';

export default function DeleteButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this enquiry?')) return;
    setLoading(true);
    const result = await deleteEnquiry(id);
    if (result.success) {
      router.refresh();
    } else {
      alert('Failed to delete enquiry.');
      setLoading(false);
    }
  }

  return (
    <button 
      onClick={handleDelete} 
      disabled={loading} 
      className={styles.deleteBtn}
      title="Delete Enquiry"
    >
      {loading ? '...' : '🗑️'}
    </button>
  );
}
