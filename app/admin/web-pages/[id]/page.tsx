import { notFound } from 'next/navigation'
import { 
  ArrowLeft, 
  FileText, 
  Edit3, 
  Eye, 
  Calendar,
  Globe,
  CheckCircle2,
  XCircle
} from 'lucide-react'

import { getWebPageById } from '@/lib/actions/web-page.actions'
import Link from 'next/link'
import WebPageForm from '../web-page-form'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatId, formatDateTime } from '@/lib/utils'

type UpdateWebPageProps = {
  params: Promise<{
    id: string
  }>
}

const UpdateWebPage = async (props: UpdateWebPageProps) => {
  const params = await props.params
  const { id } = params

  const webPage = await getWebPageById(id)
  if (!webPage) notFound()

  const getStatusBadge = (isPublished: boolean) => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30 dark:from-slate-900 dark:to-slate-800/30 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 mb-6">
          <Link 
            href="/admin/overview" 
            className="hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Dashboard
          </Link>
          <span>›</span>
          <Link 
            href="/admin/web-pages" 
            className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1"
          >
            <FileText className="w-4 h-4" />
            Pages
          </Link>
          <span>›</span>
          <span className="text-slate-900 dark:text-white font-medium">
            Edit {webPage.title}
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Edit3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Edit Page
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  Update page content and publishing settings
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {getStatusBadge(webPage.isPublished)}
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/admin/web-pages">
                <ArrowLeft className="w-4 h-4" />
                Back to Pages
              </Link>
            </Button>
          </div>
        </div>

        {/* Page Summary Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Page Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-sm">
              <div className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
                  <FileText className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800 dark:text-slate-300">Page ID</p>
                  <p className="text-slate-600 dark:text-slate-400 text-xs font-mono">
                    {formatId(webPage._id)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                  <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-300">URL Slug</p>
                  <p className="text-blue-700 dark:text-blue-400 text-xs font-mono">
                    /{webPage.slug}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                  <Calendar className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300">Last Updated</p>
                  <p className="text-green-700 dark:text-green-400 text-xs">
                    {formatDateTime(webPage.updatedAt).dateTime}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                  <Eye className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-300">Live Preview</p>
                  <Button asChild variant="link" className="h-auto p-0 text-purple-700 dark:text-purple-400">
                    <Link target="_blank" href={`/page/${webPage.slug}`} className="text-xs">
                      View on site →
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href={`/page/${webPage.slug}`} target="_blank">
                  <Eye className="w-4 h-4" />
                  Preview Page
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/admin/web-pages">
                  <FileText className="w-4 h-4" />
                  View All Pages
                </Link>
              </Button>
              <Button asChild variant="outline" className="flex items-center gap-2">
                <Link href="/admin/web-pages/create">
                  <Edit3 className="w-4 h-4" />
                  Create New Page
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Content Statistics */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Content Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {webPage.content?.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Characters</div>
              </div>
              
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {webPage.content?.split(/\n\n+/).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Paragraphs</div>
              </div>
              
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {webPage.content?.split('\n').filter(line => line.startsWith('#')).length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Headings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Web Page Form */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Edit3 className="w-5 h-5 text-blue-600" />
              Edit Page Content
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Update the page information below. Changes will be reflected immediately on your website when published.
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <WebPageForm type="Update" webPage={webPage} webPageId={webPage._id} />
          </CardContent>
        </Card>

        {/* Footer Help Section */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need assistance with page editing?{' '}
            <Link href="/admin/help/web-pages" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
              View our content editing guide
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}

export default UpdateWebPage
