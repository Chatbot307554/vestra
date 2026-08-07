import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { brand } from '@/config/brand';

export function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      toast.success('Thank you! We will get back to you within 48 hours.');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <div className="container-vestra py-12 lg:py-20">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="font-display text-4xl lg:text-5xl mb-4">Contact Us</h1>
        <p className="text-muted-foreground">Questions about fit, an order, or anything else? Our customer care team is here to help.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div className="space-y-6">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div><p className="text-sm font-medium">Email</p><p className="text-sm text-muted-foreground">{brand.email}</p></div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div><p className="text-sm font-medium">Phone</p><p className="text-sm text-muted-foreground">{brand.phone}</p><p className="text-xs text-muted-foreground">Mon-Fri, 9am-6pm GMT</p></div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div><p className="text-sm font-medium">Flagship Store</p><p className="text-sm text-muted-foreground">{brand.address}</p></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><Label htmlFor="name">Name</Label><Input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-1" /></div>
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1" /></div>
          </div>
          <div><Label htmlFor="subject">Subject</Label><Input id="subject" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="mt-1" /></div>
          <div><Label htmlFor="message">Message</Label><Textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-1" /></div>
          <Button type="submit" disabled={submitting}>{submitting ? 'Sending...' : 'Send Message'}</Button>
        </form>
      </div>
    </div>
  );
}
