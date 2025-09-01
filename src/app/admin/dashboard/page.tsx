import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Newspaper } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back!</CardTitle>
            <CardDescription>Here's a quick overview of your site.</CardDescription>
          </CardHeader>
          <CardContent>
            <p>You can manage your articles, portfolio, and other site settings from this dashboard.</p>
          </CardContent>
        </Card>
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Newspaper/> Manage Articles</CardTitle>
            <CardDescription>Create new articles or edit existing ones.</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <p>Use the AI-powered tools to generate drafts from YouTube videos and optimize for SEO.</p>
          </CardContent>
          <CardContent>
             <Button asChild>
                <Link href="/admin/articles">
                  Go to Articles <ArrowRight className="ml-2" />
                </Link>
              </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
