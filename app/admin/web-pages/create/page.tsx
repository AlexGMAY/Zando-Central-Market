import { Metadata } from 'next'
import Link from 'next/link'
import { 
  ArrowLeft, 
  FileText, 
  Plus, 
  Globe,
  LayoutTemplate,
  CheckCircle2
} from 'lucide-react'
import WebPageForm from '../web-page-form'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Create New Page | Content Management',
}

export default function CreateWebPagePage() {
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
            Create Page
          </span>
        </nav>

        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl">
                <Plus className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
                  Create New Page
                </h1>
                <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
                  Add a new page to your website with rich content and SEO optimization
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300">
              <Plus className="w-3 h-3 mr-1" />
              New Page
            </Badge>
            <Button asChild variant="outline" className="flex items-center gap-2">
              <Link href="/admin/web-pages">
                <ArrowLeft className="w-4 h-4" />
                Back to Pages
              </Link>
            </Button>
          </div>
        </div>

        {/* Quick Tips Card */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="p-2 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-blue-800 dark:text-blue-300">Clear Structure</p>
                  <p className="text-blue-700 dark:text-blue-400 text-xs">Use headings and paragraphs for better readability</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
                  <Globe className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-green-800 dark:text-green-300">SEO-Friendly URLs</p>
                  <p className="text-green-700 dark:text-green-400 text-xs">Use descriptive slugs for better search visibility</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="p-2 bg-purple-100 dark:bg-purple-800/30 rounded-lg">
                  <LayoutTemplate className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="font-semibold text-purple-800 dark:text-purple-300">Rich Content</p>
                  <p className="text-purple-700 dark:text-purple-400 text-xs">Utilize Markdown for formatting and media</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Types Overview */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm mb-8">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg">Page Types</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Informational Pages</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    About Us, Contact, FAQ pages
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Company information and policies
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Service descriptions and details
                  </li>
                </ul>
              </div>

              <div className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg hover:border-green-300 dark:hover:border-green-600 transition-colors">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <LayoutTemplate className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">Content Pages</h3>
                </div>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Blog posts and articles
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    News and announcements
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Tutorials and guides
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Web Page Form */}
        <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-2xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm">
          <CardHeader className="pb-4 border-b border-slate-200 dark:border-slate-700">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Plus className="w-5 h-5 text-blue-600" />
              Create New Page
            </CardTitle>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Fill in the details below to create a new page for your website. All fields are required unless marked optional.
            </p>
          </CardHeader>
          <CardContent className="p-8">
            <WebPageForm type="Create" />
          </CardContent>
        </Card>

        {/* Footer Help Section */}
        {/* <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Need help creating your page?{' '}
            <Link href="/admin/help/web-pages" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline">
              View our content creation guide
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  )
}
