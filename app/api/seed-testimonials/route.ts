import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { testimonials } from '@/lib/schema';
import { addTestimonial } from '@/lib/actions';

export async function POST() {
  const seeded = [
    { name: '— Amara & Tunde', role: 'Pre-Marital Counseling', content: 'The pre-marital courses gave us a language to talk about things we\'d never even discussed.', status: 'approved', stars: 5 },
    { name: '— David & Mercy', role: 'Crisis Management', content: 'I didn\'t think we could come back from where we were. The crisis counseling saved our marriage.', status: 'approved', stars: 5 },
    { name: '— Chioma O.', role: 'Thriving Beyond Divorce', content: 'After my divorce, I felt lost. Love Vibe Studios helped me find myself again.', status: 'approved', stars: 5 },
  ];

  let added = 0;
  for (const t of seeded) {
    const res = await addTestimonial(t as any);
    if (res.success) added++;
  }

  return NextResponse.json({ success: true, added });
}
