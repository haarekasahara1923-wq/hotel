import React from 'react'

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-2">
            Data Protection
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#0B1B3A] font-light">
            Privacy Policy
          </h1>
        </div>

        <div className="bg-white border border-[#C9A24B]/30 rounded-sm p-8 sm:p-12 shadow-sm text-xs sm:text-sm text-gray-700 space-y-6 leading-relaxed font-light">
          <p>
            Royal Blue Heaven ("we", "our", or "hotel"), located in DD Nagar, Gwalior, Madhya Pradesh, India, is dedicated to upholding the highest standards of data privacy and confidentiality for our esteemed guests.
          </p>

          <section>
            <h2 className="font-serif text-lg text-[#0B1B3A] font-medium mb-1">
              Information We Collect
            </h2>
            <p>
              When booking online, dining, or communicating with us, we collect your name, email address, mobile number, postal address, government identity document details (mandated by Indian hospitality statutes), and payment confirmation tokens.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#0B1B3A] font-medium mb-1">
              Payment Security
            </h2>
            <p>
              We do not store your complete credit/debit card numbers or CVV on our servers. All financial transactions are securely processed through Razorpay using industry-standard 256-bit TLS/SSL encryption adhering to RBI and PCI-DSS compliance.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#0B1B3A] font-medium mb-1">
              Use of Information
            </h2>
            <p>
              Your contact details are used strictly to provide booking confirmations, invoices, essential arrival information, and occasional loyalty privileges if opted in. We do not sell or rent guest details to third-party marketing companies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#0B1B3A] font-medium mb-1">
              Contact Regarding Privacy
            </h2>
            <p>
              For any privacy inquiries or data requests, please write to our Data Privacy Officer at{' '}
              <a href="mailto:privacy@royalblueheaven.com" className="text-[#1A3FA3] underline">
                privacy@royalblueheaven.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

