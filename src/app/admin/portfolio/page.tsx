
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PortfolioAdminPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Portfolio</h1>
        <Button asChild>
          <Link href="#">New Project</Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Coming Soon</CardTitle>
          <CardDescription>
            The portfolio management section is under construction.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            You will be able to add, edit, and delete your portfolio projects from this page.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
