export function AccessibilityPage() {
  return (
    <div className="container-vestra py-12 lg:py-20 max-w-3xl mx-auto">
      <h1 className="font-display text-4xl lg:text-5xl mb-4 text-center">Accessibility</h1>
      <p className="text-muted-foreground text-center mb-12">VESTRA is committed to making our website accessible to everyone.</p>

      <div className="space-y-8 text-muted-foreground">
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">Our Commitment</h2>
          <p>We strive to meet WCAG 2.1 AA standards. Our site is designed to be navigable by keyboard, screen-reader friendly, and usable with assistive technology.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">Features</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Semantic HTML and ARIA landmarks throughout</li>
            <li>Keyboard navigation for all interactive elements</li>
            <li>High contrast colour schemes in light and dark modes</li>
            <li>Alt text on all product images</li>
            <li>Resizable text without loss of functionality</li>
            <li>Reduced motion support for users who prefer it</li>
          </ul>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">AI Feature Accessibility</h2>
          <p>Our size recommendation tool does not require a photo upload and is fully accessible. The virtual try-on requires image upload; we provide detailed text descriptions of each garment as an alternative.</p>
        </section>
        <section>
          <h2 className="font-display text-xl text-foreground mb-2">Feedback</h2>
          <p>If you encounter an accessibility issue, please contact us at hello@vestra.co.uk. We take all reports seriously and will work to resolve issues promptly.</p>
        </section>
      </div>
    </div>
  );
}
