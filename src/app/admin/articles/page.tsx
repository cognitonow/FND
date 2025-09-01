import Link from 'next/link';
import { format } from 'date-fns';
import { getArticles, deleteArticle } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Article } from '@/types';
import { revalidatePath } from 'next/cache';

async function handleDelete(id: string) {
    "use server";
    await deleteArticle(id);
    revalidatePath('/admin/articles');
}

export default async function ArticlesPage() {
  const articles: Article[] = await getArticles();

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Button asChild>
          <Link href="/admin/articles/new">New Article</Link>
        </Button>
      </div>
      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="hidden md:table-cell">Last Updated</TableHead>
              <TableHead><span className="sr-only">Actions</span></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length > 0 ? articles.map((article) => (
              <TableRow key={article.id}>
                <TableCell className="font-medium">{article.title}</TableCell>
                <TableCell className="hidden md:table-cell">
                    {article.createdAt ? format(new Date(article.createdAt as string), 'PPP') : 'N/A'}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                    {article.updatedAt ? format(new Date(article.updatedAt as string), 'PPP') : 'N/A'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild><Link href={`/admin/articles/edit/${article.id}`}>Edit</Link></DropdownMenuItem>
                       <DropdownMenuItem asChild><Link href={`/articles/${article.slug}`} target="_blank">View</Link></DropdownMenuItem>
                      <form action={async () => {
                          "use server";
                          if(article.id) {
                            await deleteArticle(article.id);
                            revalidatePath('/admin/articles');
                          }
                      }}>
                          <button type="submit" className="w-full text-left relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-red-600 focus:text-red-600">Delete</button>
                      </form>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            )) : (
                <TableRow>
                    <TableCell colSpan={4} className="text-center h-24">No articles found.</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
