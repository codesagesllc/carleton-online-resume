'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';


const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema), // Use Zod resolver for validation
  });

  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      setSuccessMessage(responseData.message);
      reset();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      // Handle errors gracefully (e.g., display an error message to the user)
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8 bg-gray-100 shadow-md rounded-lg">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Contact Me</h1>

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{successMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register('name')}     className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-300 ${
                errors.name ? 'border-red-500' : '' // Add error styling
              }`}
            />
            {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register('email')}     className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-300 ${
                errors.email ? 'border-red-500' : '' // Add error styling
              }`}
            />
            {errors.email && <span className="text-red-500 text-sm">Please enter a valid email address</span>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...register('phone')}     className={`mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-300 ${
                errors.phone ? 'border-red-500' : '' // Add error styling
              }`}
            />
            {errors.email && <span className="text-red-500 text-sm">Please enter a valid Phone Number</span>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              {...register('message')}
              rows={4}
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {submitting ? 'Submitting...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;