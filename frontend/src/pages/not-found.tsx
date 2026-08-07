import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="container-vestra py-20 lg:py-32 text-center">
      <p className="font-display text-7xl lg:text-9xl text-muted-foreground/30">404</p>
      <h1 className="font-display text-3xl lg:text-4xl mt-4 mb-4">Page Not Found</h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">The page you are looking for may have been moved or no longer exists.</p>
      <Button asChild><Link to="/">Return to Homepage</Link></Button>
    </div>
  );
}
