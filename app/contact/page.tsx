'use client';

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { ArrowLeftIcon, CheckCircledIcon, CrossCircledIcon, ReloadIcon, EnvelopeOpenIcon, LinkedInLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [successMessage, setSuccessMessage] = useState('');

  const onSubmit: SubmitHandler<ContactFormData> = async (data) => {
    setSubmitting(true);
    setSubmitStatus('idle');

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
      setSuccessMessage(responseData.message || 'Message sent successfully!');
      setSubmitStatus('success');
      reset();
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setSubmitStatus('error');
      
      // Reset error state after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto max-w-4xl py-12 px-4 relative z-10">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-8 transition-all duration-200 hover:transform hover:scale-105"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-2" />
          Back to Resume
        </Link>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Let&apos;s Connect
              </h1>
              <p className="text-gray-600">
                I&apos;d love to hear from you. Send me a message and I&apos;ll respond as soon as possible.
              </p>
            </div>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center animate-fadeIn">
                <CheckCircledIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                <span className="text-green-800">{successMessage}</span>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center animate-fadeIn">
                <CrossCircledIcon className="w-5 h-5 text-red-600 mr-3 flex-shrink-0" />
                <span className="text-red-800">
                  Something went wrong. Please try again or email me directly at{' '}
                  <a href="mailto:carletoncabarrus@gmail.com" className="text-indigo-600 hover:underline">
                    carletoncabarrus@gmail.com
                  </a>
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  {...register('name')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                    errors.name 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="John Doe"
                />
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <CrossCircledIcon className="w-4 h-4 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  {...register('email')}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="john.doe@example.com"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <CrossCircledIcon className="w-4 h-4 mr-1" />
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone <span className="text-gray-400 text-xs">(Optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  {...register('phone')}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Message Field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  {...register('message')}
                  rows={5}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-none ${
                    errors.message 
                      ? 'border-red-400 bg-red-50' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  placeholder="Tell me about your project or opportunity..."
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600 flex items-center">
                    <CrossCircledIcon className="w-4 h-4 mr-1" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium py-3 px-6 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
              >
                {submitting ? (
                  <>
                    <ReloadIcon className="w-5 h-5 mr-2 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information & Alternative Ways to Reach */}
          <div className="space-y-6">
            {/* Direct Contact */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Get In Touch</h2>
              <div className="space-y-4">
                <a 
                  href="mailto:carletoncabarrus@gmail.com" 
                  className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="bg-green-100 p-3 rounded-full group-hover:bg-green-200 transition-colors">
                    <EnvelopeOpenIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">Email</p>
                    <p className="text-green-600">carletoncabarrus@gmail.com</p>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/carleton-cabarrus-jr/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="bg-blue-100 p-3 rounded-full group-hover:bg-blue-200 transition-colors">
                    <LinkedInLogoIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">LinkedIn</p>
                    <p className="text-blue-600">Connect professionally</p>
                  </div>
                </a>

                <a 
                  href="https://github.com/carletoncabarrus" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl hover:shadow-lg transition-all duration-200 hover:scale-105 group"
                >
                  <div className="bg-gray-100 p-3 rounded-full group-hover:bg-gray-200 transition-colors">
                    <GitHubLogoIcon className="w-6 h-6 text-gray-700" />
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-800">GitHub</p>
                    <p className="text-gray-600">View my projects</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Quick Info */}
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/50">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Info</h3>
              <div className="space-y-3 text-gray-600">
                <p>📍 <strong>Location:</strong> Virginia Beach, VA</p>
                <p>⚡ <strong>Response Time:</strong> Usually within 24 hours</p>
                <p>💼 <strong>Availability:</strong> Open to new opportunities</p>
                <p>🎯 <strong>Focus:</strong> Enterprise applications, Cloud architecture</p>
              </div>
            </div>

            {/* What I Can Help With */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl shadow-xl p-8 text-white">
              <h3 className="text-xl font-bold mb-4">What I Can Help With</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Full-stack web application development</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Cloud architecture and migration</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Enterprise system integration</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Performance optimization</span>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-white rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span>Technical consulting</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;