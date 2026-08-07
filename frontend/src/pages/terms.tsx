export function TermsPage() {
  return (
    <div className="container-vestra py-12 lg:py-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl lg:text-5xl mb-4 text-center">Terms & Conditions</h1>
      <p className="text-sm text-muted-foreground text-center mb-12">Last updated: 1 October 2024</p>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">1. Introduction</h2>
          <p>These terms govern your use of the VESTRA website and services. By placing an order or creating an account, you agree to these terms.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">2. Orders & Payment</h2>
          <p>All orders are subject to availability. We reserve the right to refuse or cancel any order. Payment is taken at the point of order confirmation. Prices are in GBP and include VAT where applicable.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">3. Delivery</h2>
          <p>Delivery times are estimates. We are not liable for delays caused by carriers. Risk passes to you upon delivery. See our Delivery & Returns page for details.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">4. Returns & Refunds</h2>
          <p>You may return unworn items within 30 days for a full refund. Items must have tags attached. Refunds are processed within 5 working days.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">5. AI Features</h2>
          <p>Our size recommendation and virtual try-on features are provided as guidance only. We do not guarantee fit accuracy. You are responsible for the photos you upload and must have consent from any individuals depicted.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">6. Intellectual Property</h2>
          <p>All content on this site, including images, text, and designs, is owned by VESTRA or licensed to us. You may not reproduce it without permission.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">7. Limitation of Liability</h2>
          <p>Our liability is limited to the value of your order. We are not liable for indirect or consequential losses.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">8. Governing Law</h2>
          <p>These terms are governed by the laws of England and Wales. Any disputes will be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </section>
      </div>
    </div>
  );
}
