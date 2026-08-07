export function PrivacyPage() {
  return (
    <div className="container-vestra py-12 lg:py-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl lg:text-5xl mb-4 text-center">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground text-center mb-12">Last updated: 1 October 2024</p>

      <div className="prose prose-sm max-w-none space-y-8 text-muted-foreground">
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">1. Introduction</h2>
          <p>VESTRA ("we", "us", "our") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal data when you use our website and services.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">2. Data We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Account information: name, email address, password (hashed)</li>
            <li>Body measurements for size recommendations</li>
            <li>Photos for virtual try-on (deleted after processing unless you save them)</li>
            <li>Order history and shipping addresses</li>
            <li>Browsing data and preferences for recommendations</li>
            <li>Technical data: IP address, browser type, device information</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">3. How We Use Your Data</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>To process and deliver your orders</li>
            <li>To provide personalised size recommendations</li>
            <li>To power the virtual fitting room feature</li>
            <li>To recommend products based on your preferences</li>
            <li>To communicate with you about your account and orders</li>
            <li>To improve our products and services</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">4. AI and Measurement Data</h2>
          <p>Your body measurements and try-on photos are encrypted and stored securely. They are used solely to provide our fit technology features. We do not share this data with third parties. You can delete your measurements and try-on history at any time from your account settings.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">5. Your Rights</h2>
          <p>Under UK GDPR, you have the right to: access your data, rectify inaccurate data, erase your data, restrict processing, data portability, and object to processing. To exercise these rights, contact us at hello@vestra.co.uk.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">6. Cookies</h2>
          <p>We use essential cookies for site functionality and optional cookies for analytics and marketing. You can manage your cookie preferences at any time.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">7. Contact</h2>
          <p>For privacy enquiries, email hello@vestra.co.uk or write to VESTRA, 14 Savile Row, London, W1S 3JN.</p>
        </section>
      </div>
    </div>
  );
}
