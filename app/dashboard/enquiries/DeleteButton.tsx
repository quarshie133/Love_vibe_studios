'use client';

import { useState } from 'react';
import { deleteEnquiry } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import ConfirmModal from '@/components/dashboard/ConfirmModal/ConfirmModal';
import styles from './enquiries.module.css';

export default function DeleteButton({ id }: { id: number }) {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    setLoading(true);
    const result = await deleteEnquiry(id);
    if (result.success) {
      window.location.href = '/dashboard/enquiries';
    } else {
      alert('Failed to delete enquiry.');
      setLoading(false);
      setShowModal(false);
    }
  }

  return (
    <>
      <ConfirmModal 
        isOpen={showModal}
        title="Delete Enquiry"
        message="Are you sure you want to delete this enquiry? It will be permanently removed."
        onConfirm={handleDelete}
        onCancel={() => setShowModal(false)}
        loading={loading}
      />
      <button 
        onClick={() => setShowModal(true)} 
        disabled={loading} 
        className={styles.deleteBtn}
        title="Delete Enquiry"
      >
        {loading ? '...' : '🗑️'}
      </button>
    </>
  );
}
