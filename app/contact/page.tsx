'use client';

import { useState } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';



const ContactPage = () => {
  
    const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if   
 (!response.ok) {
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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Contact Me</h1>

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
            {...register('name', { required: true })}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-300"
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
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-300"
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
            {...register('phone', { required: false})}
            className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-blue-300"
          />
          {errors.email && <span className="text-red-500 text-sm">Please enter a valid phone number</span>}
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
    </div>
  );
};

export default ContactPage;