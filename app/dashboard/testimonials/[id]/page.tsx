'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { updateTestimonial, deleteTestimonial, getTestimonialById } from '@/lib/actions';
import Link from 'next/link';
import ConfirmModal from '@/components/dashboard/ConfirmModal/ConfirmModal';
import styles from '../../courses/courses.module.css';

export default function EditTestimonialPage() {
  const router = useRouter();
  const params = useParams();
  const id = parseInt(params.id as string);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [testimonial, setTestimonial] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    async function load() {
      const found = await getTestimonialById(id);
      if (found) {
        setTestimonial(found);
      }
      setFetching(false);
    }
    load();
  }, [id]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    
    const fd = new FormData(e.currentTarget);
    const result = await updateTestimonial(id, {
      name: fd.get('name') as string,
      role: fd.get('role') as string,
      content: fd.get('content') as string,
      stars: parseInt(fd.get('stars') as string) || 5,
      status: fd.get('status') as string,
    });

    if (result.success) {
      window.location.href = '/dashboard/testimonials';
    } else {
      alert('Failed to update testimonial.');
      setLoading(false);
    }
  }

  async function handleDelete() {
    setLoading(true);
    const result = await deleteTestimonial(id);
    if (result.success) {
      window.location.href = '/dashboard/testimonials';
    } else {
      alert('Failed to delete testimonial.');
      setLoading(false);
      setShowDeleteModal(false);
    }
  }

  if (fetching) return <div className={styles.container}><p>Loading...</p></div>;
  if (!testimonial) return <div className={styles.container}><p>Testimonial not found.</p></div>;

  return (
    <div className={styles.container}>
      <ConfirmModal 
        isOpen={showDeleteModal}
        title="Delete Testimonial"
        message={`Are you sure you want to delete the testimonial from "${testimonial.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteModal(false)}
        loading={loading}
      />

      <div className={styles.header}>
        <div>
          <h1>Edit Testimonial</h1>
          <p>Update or remove this story.</p>
        </div>
        <Link href="/dashboard/testimonials" className={styles.backLink}>← Back to List</Link>
      </div>

      <div className={styles.formCard}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label>Client Name</label>
            <input name="name" type="text" defaultValue={testimonial.name} required />
          </div>

          <div className={styles.field}>
            <label>Program / Role</label>
            <input name="role" type="text" defaultValue={testimonial.role || ''} />
          </div>

          <div className={styles.field}>
            <label>Testimonial Content</label>
            <textarea name="content" defaultValue={testimonial.content} required rows={5} />
          </div>

          <div className={styles.row}>
            <div className={styles.field}>
              <label>Stars (1-5)</label>
              <input name="stars" type="number" min="1" max="5" defaultValue={testimonial.stars || 5} />
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <select name="status" defaultValue={testimonial.status || 'pending'}>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
              </select>
            </div>
          </div>

          <div className={styles.footerActions}>
            <button type="button" onClick={() => setShowDeleteModal(true)} disabled={loading} className={styles.deleteBtn}>
              Delete Testimonial
            </button>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
