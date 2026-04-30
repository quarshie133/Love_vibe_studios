'use server';

import { db } from './db';
import { enquiries, testimonials, courses, bookings } from './schema';
import { desc, eq } from 'drizzle-orm';

export async function getCourses() {
  return db.select().from(courses).orderBy(desc(courses.createdAt));
}

export async function getCourseById(id: number) {
  const [course] = await db.select().from(courses).where(eq(courses.id, id));
  return course;
}

export async function addCourse(data: {
  title: string;
  description: string;
  duration?: string;
  priceSingleGHS?: number;
  priceSingleUSD?: number;
  priceCoupleGHS?: number;
  priceCoupleUSD?: number;
}) {
  try {
    await db.insert(courses).values(data);
    return { success: true };
  } catch (error) {
    console.error('Failed to add course:', error);
    return { success: false };
  }
}

export async function updateCourse(id: number, data: Partial<typeof courses.$inferInsert>) {
  try {
    await db.update(courses).set(data).where(eq(courses.id, id));
    return { success: true };
  } catch (error) {
    console.error('Failed to update course:', error);
    return { success: false };
  }
}

export async function deleteCourse(id: number) {
  try {
    await db.delete(courses).where(eq(courses.id, id));
    return { success: true };
  } catch (error) {
    console.error('Failed to delete course:', error);
    return { success: false };
  }
}

export async function getBookings() {
  return db.select().from(bookings).orderBy(desc(bookings.createdAt));
}

export async function submitEnquiry(data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  program?: string;
  message?: string;
}) {
  try {
    // Insert into enquiries table
    const [enquiry] = await db.insert(enquiries).values(data).returning();
    
    // If a specific program is selected, also create a booking entry
    if (data.program && data.program !== 'Not sure — I need guidance') {
      await db.insert(bookings).values({
        name: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        course: data.program,
        status: 'new'
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Failed to submit enquiry:', error);
    return { success: false, error: 'Failed to submit enquiry' };
  }
}

export async function getEnquiries() {
  return db.select().from(enquiries).orderBy(desc(enquiries.createdAt));
}

export async function getTestimonials() {
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function getStats() {
  const allEnquiries = await db.select().from(enquiries);
  const allTestimonials = await db.select().from(testimonials);
  const allCourses = await db.select().from(courses);
  const allBookings = await db.select().from(bookings);
  
  return {
    totalEnquiries: allEnquiries.length,
    newEnquiries: allEnquiries.filter(e => e.status === 'new').length,
    totalCourses: allCourses.length,
    pendingBookings: allBookings.filter(b => b.status === 'new').length,
    totalTestimonials: allTestimonials.length,
  };
}
