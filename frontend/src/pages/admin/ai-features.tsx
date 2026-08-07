import { Sparkles, Ruler, Camera, Activity, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AdminAiFeaturesPage() {
  const features = [
    {
      name: 'Size Recommendation Engine',
      icon: Ruler,
      status: 'active',
      description: 'AI model that compares user measurements against product fit profiles to recommend the best size.',
      metrics: [
        { label: 'Total Requests', value: '2,104' },
        { label: 'Success Rate', value: '91%' },
        { label: 'Avg Latency', value: '1.2s' },
      ],
    },
    {
      name: 'Virtual Try-On',
      icon: Camera,
      status: 'active',
      description: 'Computer vision service that overlays garments on user-uploaded photos for a realistic preview.',
      metrics: [
        { label: 'Total Sessions', value: '1,842' },
        { label: 'Helpful Rate', value: '78%' },
        { label: 'Avg Processing', value: '3.5s' },
      ],
    },
    {
      name: 'Product Recommendations',
      icon: Sparkles,
      status: 'active',
      description: 'Personalised recommendation engine using collaborative filtering and content-based methods.',
      metrics: [
        { label: 'Impressions', value: '45.2K' },
        { label: 'Click-Through Rate', value: '12.4%' },
        { label: 'Conversion Rate', value: '3.8%' },
      ],
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="h-6 w-6 text-ai" />
        <h1 className="font-display text-2xl lg:text-3xl">AI Features</h1>
      </div>

      <div className="space-y-6">
        {features.map((f) => (
          <Card key={f.name} className="p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-ai-background flex items-center justify-center shrink-0"><f.icon className="h-5 w-5 text-ai" /></div>
                <div>
                  <h2 className="font-semibold">{f.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">{f.description}</p>
                </div>
              </div>
              <Badge variant={f.status === 'active' ? 'default' : 'outline'} className="flex items-center gap-1">
                {f.status === 'active' ? <CheckCircle className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />}
                {f.status === 'active' ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
              {f.metrics.map((m) => (
                <div key={m.label}>
                  <p className="text-lg font-semibold">{m.value}</p>
                  <p className="text-xs text-muted-foreground">{m.label}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 mt-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-muted-foreground" />
          <h2 className="font-semibold">Model Health</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Size Recommendation Model</span>
            <div className="flex items-center gap-2"><span className="text-success">●</span><span className="text-xs">Operational</span></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Virtual Try-On Provider</span>
            <div className="flex items-center gap-2"><span className="text-warning">●</span><span className="text-xs">Degraded — maintenance scheduled</span></div>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Recommendation Pipeline</span>
            <div className="flex items-center gap-2"><span className="text-success">●</span><span className="text-xs">Operational</span></div>
          </div>
        </div>
      </Card>
    </div>
  );
}
