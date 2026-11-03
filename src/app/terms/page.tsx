import React from 'react'

export default function TermsPage() {
  return (
    <div className="bg-[#FBF8F1] min-h-screen pt-28 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C9A24B] font-semibold block mb-2">
            Legal Terms
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#0B1B3A] font-light">
            Terms & Conditions
          </h1>
        </div>

        <div className="bg-white border border-[#C9A24B]/30 rounded-sm p-8 sm:p-12 shadow-sm text-xs sm:text-sm text-gray-700 space-y-6 leading-relaxed font-light">
          <section>
            <h2 className="font-serif text-lg text-[#0B1B3A] font-medium mb-1">
              1. Check-In & Identity Verification
            </h2>
            <p>
              Check-in time commences at 2:00 PM and check-out time is until 12:00 PM noon. In adherence to local regulations in Madhya Pradesh, all guests aged 18 and above must present valid government photo identification (Aadhaar Card, Driving License, Passport, or Voter ID). Foreign citizens must present a valid passport and valid Indian visa.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#0B1B3A] font-medium mb-1">
              2. Hotel Property & Damage
            </h2>
            <p>
              Guests are kindly expected to treat all hotel furnishings, antiques, artworks, and property with respect. Any willful destruction, damage, or stained specialty textiles will be assessed and billed to the guest account upon check-out.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#0B1B3A] font-medium mb-1">
              3. Non-Smoking Policy
            </h2>
            <p>
              Royal Blue Heaven maintains a strict smoke-free environment across all guest rooms, suites, restaurants, and corridors. Designated outdoor smoking pavilions are provided in garden areas. A specialized deep-cleaning restoration fee of ₹5,000 applies to violations inside chambers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-lg text-[#0B1B3A] font-medium mb-1">
              4. Governing Law & Jurisdiction
            </h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of India. Any disputes arising in connection with the hotel services are subject to the exclusive jurisdiction of the civil courts in Gwalior, Madhya Pradesh, India.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

