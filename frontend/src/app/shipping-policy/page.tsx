export default function ShippingPolicyPage() {
  return (
    <div className="bg-white min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-bemitex-dark mb-4">Shipping & COD Policy</h1>
          <div className="w-20 h-1 bg-bemitex-gold"></div>
        </div>

        <div className="prose prose-lg text-gray-700 max-w-none">
          
          <h3 className="text-2xl font-bold text-bemitex-dark mt-8 mb-4">1. Dispatch and Delivery Timelines</h3>
          <p>
            As a wholesale manufacturer, our dispatch timelines vary based on order size and availability. 
            For ready stock, orders are dispatched within <strong>24 to 48 hours</strong> of order confirmation. 
            Standard delivery within India takes between <strong>3 to 7 business days</strong> depending on the destination.
          </p>

          <h3 className="text-2xl font-bold text-bemitex-dark mt-8 mb-4">2. Cash on Delivery (COD)</h3>
          <p>
            We offer Cash on Delivery (COD) across major pincodes in India to build trust with our new B2B partners.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>A nominal advance payment (usually 10-20% of the invoice value) is required to confirm the COD order and cover partial logistics costs.</li>
            <li>The remaining balance is paid directly to the courier executive at the time of delivery.</li>
            <li>COD is subject to serviceability by our courier partners (Delhivery, BlueDart, Xpressbees).</li>
          </ul>

          <h3 className="text-2xl font-bold text-bemitex-dark mt-8 mb-4">3. International Shipping</h3>
          <p>
            Bemitex India proudly exports to countries including the USA, UK, Canada, UAE, Malaysia, and more.
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>International orders are strictly 100% prepaid.</li>
            <li>Shipping charges are calculated based on the volumetric weight of the parcel and the destination country.</li>
            <li>Customs duties and taxes (if any) in the destination country are to be borne by the buyer.</li>
            <li>We partner with DHL, FedEx, and Aramex for secure global delivery.</li>
          </ul>

          <h3 className="text-2xl font-bold text-bemitex-dark mt-8 mb-4">4. Shipping Charges</h3>
          <p>
            Shipping charges for domestic orders are calculated at the time of billing based on the weight of the parcel. Since wholesale parcels are heavy, we always strive to find the most economical transport or courier option for your city.
          </p>

          <div className="mt-12 bg-bemitex-cream/50 p-6 rounded-lg border border-bemitex-gold/30">
            <h4 className="font-bold text-bemitex-maroon mb-2">Need help with logistics?</h4>
            <p className="text-sm">
              If you have a preferred transport agency in Surat, please let us know during order placement, and we can deliver the goods to their local godown. For further inquiries, contact us at <strong>wholesale@bemitexindia.com</strong>.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
