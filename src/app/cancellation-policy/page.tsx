import React from 'react'
import Link from 'next/link'
import { SectionHeader } from '@/components/ui/SectionHeader'

export default function CancellationPolicyPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-2">
            Transparency & Clarity
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#0B1B3A] font-light">
            Cancellation & Refund Policy
          </h1>
        </div>

        <div className="bg-white border border-[#C9A24B]/30 rounded-sm p-8 sm:p-12 shadow-sm text-xs sm:text-sm text-gray-700 space-y-6 leading-relaxed font-light">
          <section>
            <h2 className="font-serif text-xl text-[#0B1B3A] font-medium mb-2">
              1. Flexible Cancellation Window
            </h2>
            <p>
              At Royal Blue Heaven, we understand that itineraries may shift. We offer complimentary free cancellation up to <strong>48 hours prior</strong> to the official check-in time (2:00 PM local time on your scheduled arrival date).
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0B1B3A] font-medium mb-2">
              2. Cancellation Fee Tiers
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>48+ hours before arrival:</strong> 100% refund of all deposited amounts. Zero processing charges.
              </li>
              <li>
                <strong>Between 24 and 48 hours before arrival:</strong> 50% of the total booking tariff will be charged; remaining 50% will be refunded to the original payment source.
              </li>
              <li>
                <strong>Within 24 hours of arrival / No-Show:</strong> 100% of the total booking tariff is non-refundable.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0B1B3A] font-medium mb-2">
              3. Refund Processing
            </h2>
            <p>
              Eligible refunds are processed immediately back to the original method of payment via Razorpay. Depending on your issuing bank or UPI network, the funds will reflect in your account within <strong>5 to 7 business days</strong>.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0B1B3A] font-medium mb-2">
              4. Peak Season & Festival Bookings
            </h2>
            <p>
              For special festival dates (such as Diwali, Christmas, New Year’s Eve, and regional weddings), non-refundable policies may apply. Specific terms are prominently displayed during checkout.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-[#0B1B3A] font-medium mb-2">
              5. How to Initiate a Cancellation
            </h2>
            <p>
              You can cancel or modify your stay by navigating to our{' '}
              <Link href="/lookup" className="text-[#1A3FA3] underline font-medium">
                Booking Lookup
              </Link>{' '}
              portal using your Booking ID and mobile number, or by contacting our 24/7 reception desk at{' '}
              <a href="tel:+919876543210" className="text-[#C9A24B] font-medium">
                +91 98765 43210
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

