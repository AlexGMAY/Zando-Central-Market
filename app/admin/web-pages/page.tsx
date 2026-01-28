import Link from 'next/link'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Edit3, 
  Eye,
  Globe,
  CheckCircle2,
  XCircle 
} from 'lucide-react'

import DeleteDialog from '@/components/shared/delete-dialog'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatId } from '@/lib/utils'
import { Metadata } from 'next'
import { deleteWebPage, getAllWebPages } from '@/lib/actions/web-page.actions'
import { IWebPage } from '@/lib/db/models/web-page.model'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export const metadata: Metadata = {
  title: 'Content Management | Admin Dashboard',
}

const StatusBadge = ({ isPublished }: { isPublished: boolean }) => {
  return isPublished ? (
    <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-300">
      <CheckCircle2 className="w-3 h-3 mr-1" />
      Published
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300">
      <XCircle className="w-3 h-3 mr-1" />
      Draft
    </Badge>
  )
}

export default async function WebPageAdminPage() {
  const webPages = await getAllWebPages()

  // Calculate stats
  const totalPages = webPages.length
  const publishedPages = webPages.filter(page => page.isPublished).length
  const draftPages = webPages.filter(page => !page.isPublished).length

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-600" />
            Content Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your website pages and content
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2">
            <Link href='/admin/web-pages/create'>
              <Plus className="w-4 h-4" />
              Create Page
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total Pages</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{totalPages}</p>
              </div>
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Published</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{publishedPages}</p>
              </div>
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Drafts</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{draftPages}</p>
              </div>
              <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <XCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Latest</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {webPages.length > 0 ? new Date(webPages[0].updatedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Globe className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Web Pages Table */}
      <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-600" />
              Website Pages
            </CardTitle>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  className="pl-10 w-64 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  placeholder="Search pages..."
                />
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b-slate-200/50 dark:border-b-slate-700/50">
                  <TableHead className="font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Page ID
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Title</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      URL Slug
                    </div>
                  </TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white">Status</TableHead>
                  <TableHead className="font-semibold text-slate-900 dark:text-white text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {webPages.map((webPage: IWebPage) => (
                  <TableRow 
                    key={webPage._id.toString()} 
                    className="border-b-slate-200/50 dark:border-b-slate-700/50 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
                  >
                    <TableCell className="font-mono text-xs text-slate-500 dark:text-slate-400">
                      {formatId(webPage._id.toString())}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {webPage.title}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          Updated {new Date(webPage.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600 dark:text-slate-400 font-mono text-sm">
                      /{webPage.slug}
                    </TableCell>
                    <TableCell>
                      <StatusBadge isPublished={webPage.isPublished} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="outline" size="sm" className="h-8">
                          <Link href={`/admin/web-pages/${webPage._id}`}>
                            <Edit3 className="w-3 h-3 mr-1" />
                            Edit
                          </Link>
                        </Button>
                        {webPage.isPublished && (
                          <Button asChild variant="outline" size="sm" className="h-8 w-8 p-0">
                            <Link href={`/page/${webPage.slug}`} target="_blank">
                              <Eye className="w-3 h-3" />
                            </Link>
                          </Button>
                        )}
                        <DeleteDialog 
                          id={webPage._id.toString()} 
                          action={deleteWebPage}
                          // trigger={
                          //   <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                          //     <MoreHorizontal className="w-3 h-3" />
                          //   </Button>
                          // }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Empty State */}
          {webPages.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="font-semibold text-slate-900 dark:text-white text-lg mb-2">
                No pages created yet
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Get started by creating your first web page
              </p>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link href="/admin/web-pages/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create First Page
                </Link>
              </Button>
            </div>
          )}

          {/* Footer */}
          {webPages.length > 0 && (
            <div className="flex items-center justify-between p-4 border-t border-slate-200 dark:border-slate-700">
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Showing {webPages.length} pages
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Sorted by recent updates
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
