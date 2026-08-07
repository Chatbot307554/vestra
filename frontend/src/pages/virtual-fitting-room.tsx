import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scan, Upload, X, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getEligibleProducts, submitTryOn, vtoProcessingMessages } from '@/services/virtualTryOnService';
import { formatPrice } from '@/utils/formatters';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Breadcrumbs } from '@/components/layout/breadcrumbs';
import { toast } from 'sonner';
import type { VirtualTryOnResult } from '@/types';

export function VirtualFittingRoomPage() {
  const { data: products, isLoading } = useQuery({ queryKey: ['vto-eligible'], queryFn: getEligibleProducts });
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [selectedColour, setSelectedColour] = useState<string>('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const [result, setResult] = useState<VirtualTryOnResult | null>(null);

  const selectedProduct = products?.find((p) => p.id === selectedProductId);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { toast.error('Image must be under 10MB'); return; }
    const reader = new FileReader();
    reader.onload = () => setUploadedImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleTryOn = async () => {
    if (!selectedProduct) { toast.error('Please select a product'); return; }
    if (!uploadedImage) { toast.error('Please upload a photo'); return; }
    if (!consent) { toast.error('Please provide consent'); return; }
    setProcessing(true);
    setProcessStep(0);
    const stepInterval = setInterval(() => setProcessStep((p) => Math.min(p + 1, vtoProcessingMessages.length - 1)), 1200);
    try {
      const res = await submitTryOn(selectedProduct.id, selectedProduct.name, selectedProduct.images[0]?.url || '', selectedColour || selectedProduct.colours[0]);
      clearInterval(stepInterval);
      setResult(res);
    } catch {
      toast.error('Try-on failed. Please try again.');
    } finally {
      clearInterval(stepInterval);
      setProcessing(false);
    }
  };

  const reset = () => { setResult(null); setUploadedImage(null); setConsent(false); setProcessStep(0); };

  return (
    <div className="container-vestra py-8 lg:py-12">
      <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Virtual Fitting Room' }]} />
      <div className="text-center mt-4 mb-8">
        <div className="inline-flex items-center gap-2 bg-ai-background px-4 py-2 rounded-full text-ai text-sm font-medium"><Sparkles className="h-4 w-4" /> AI-Powered</div>
        <h1 className="font-display text-3xl lg:text-5xl mt-4">Virtual Fitting Room</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">See how garments look on you before you buy. Upload a photo, select a product, and get an instant AI-generated preview.</p>
      </div>

      {result ? (
        <div className="max-w-2xl mx-auto text-center">
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm font-medium mb-2">Your Photo</p><img src={uploadedImage || ''} alt="Your photo" className="w-full rounded-xl object-cover aspect-product" /></div>
            <div><p className="text-sm font-medium mb-2">AI Preview</p><img src={result.resultImage} alt="Try-on result" className="w-full rounded-xl object-cover aspect-product" /></div>
          </div>
          <div className="mt-6">
            <p className="text-sm text-muted-foreground">{result.productName} · {result.colour}</p>
            {result.isDemo && <p className="text-xs text-muted-foreground mt-1">Demo preview — connect an AI provider for photorealistic results.</p>}
          </div>
          <div className="flex gap-3 justify-center mt-6">
            <Button onClick={reset}>Try Another</Button>
            <Button asChild variant="outline"><Link to={`/product/${selectedProduct?.slug || ''}`}>View Product</Link></Button>
          </div>
        </div>
      ) : processing ? (
        <div className="max-w-md mx-auto text-center py-20">
          <Loader2 className="h-12 w-12 animate-spin mx-auto text-ai" />
          <p className="mt-6 font-medium">{vtoProcessingMessages[processStep]}...</p>
          <div className="flex justify-center gap-2 mt-4">
            {vtoProcessingMessages.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i <= processStep ? 'bg-ai' : 'bg-muted'}`} />)}
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Step 1: Select product */}
          <div className="space-y-4">
            <h2 className="font-semibold flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-foreground text-background text-sm flex items-center justify-center">1</span> Select a Product</h2>
            {isLoading ? <p className="text-muted-foreground">Loading products...</p> : (
              <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
                {products?.map((p) => (
                  <button key={p.id} onClick={() => { setSelectedProductId(p.id); setSelectedColour(p.colours[0]); }} className={`rounded-lg overflow-hidden border-2 transition-colors ${selectedProductId === p.id ? 'border-foreground' : 'border-transparent hover:border-border'}`}>
                    <img src={p.images[0]?.url} alt={p.name} className="w-full aspect-product object-cover" />
                    <p className="text-xs font-medium p-1 line-clamp-1">{p.name}</p>
                  </button>
                ))}
              </div>
            )}
            {selectedProduct && (
              <div className="border border-border rounded-xl p-4">
                <p className="font-medium">{selectedProduct.name}</p>
                <p className="text-sm text-muted-foreground">{formatPrice(selectedProduct.salePrice ?? selectedProduct.price)}</p>
                <div className="flex gap-2 mt-3">
                  {selectedProduct.colours.map((c) => {
                    const v = selectedProduct.variants.find((v) => v.colour === c);
                    return <button key={c} onClick={() => setSelectedColour(c)} className={`w-7 h-7 rounded-full border-2 ${selectedColour === c ? 'border-foreground' : 'border-border'}`} style={{ backgroundColor: v?.colourHex }} title={c} />;
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Upload photo */}
          <div className="space-y-4">
            <h2 className="font-semibold flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-foreground text-background text-sm flex items-center justify-center">2</span> Upload Your Photo</h2>
            {uploadedImage ? (
              <div className="relative">
                <img src={uploadedImage} alt="Your upload" className="w-full rounded-xl object-cover aspect-product" />
                <button onClick={() => setUploadedImage(null)} className="absolute top-2 right-2 p-2 bg-background/80 rounded-full"><X className="h-4 w-4" /></button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-xl aspect-product cursor-pointer hover:border-foreground transition-colors">
                <Upload className="h-10 w-10 text-muted-foreground" />
                <p className="text-sm font-medium mt-3">Click to upload</p>
                <p className="text-xs text-muted-foreground mt-1">JPG or PNG, max 10MB</p>
                <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleImageUpload} />
              </label>
            )}
            {/* Consent */}
            <div className="bg-muted rounded-lg p-4 space-y-3">
              <div className="flex items-start gap-3">
                <input type="checkbox" id="consent" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
                <Label htmlFor="consent" className="text-sm cursor-pointer">I consent to VESTRA processing my image for virtual try-on. My photo is processed securely and not stored permanently.</Label>
              </div>
              <div className="flex items-start gap-2 text-xs text-muted-foreground"><AlertCircle className="h-4 w-4 shrink-0 mt-0.5" /><p>For best results, use a full-body photo in good lighting, wearing fitted clothing. This is a demo — results are simulated.</p></div>
            </div>
            <Button size="lg" className="w-full" onClick={handleTryOn} disabled={!selectedProduct || !uploadedImage || !consent}><Scan className="h-5 w-5" /> Generate Preview</Button>
          </div>
        </div>
      )}
    </div>
  );
}
