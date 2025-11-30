'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { 
  FileText, 
  Globe, 
  Sparkles, 
  Eye, 
  ArrowRight,
  ArrowLeft,
  Save,
  CheckCircle2,
  LayoutTemplate,
  Code,
  FileCode,
  Monitor
} from 'lucide-react'

import MdEditor from 'react-markdown-editor-lite'
import ReactMarkdown from 'react-markdown'
import 'react-markdown-editor-lite/lib/index.css'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { createWebPage, updateWebPage } from '@/lib/actions/web-page.actions'
import { IWebPage } from '@/lib/db/models/web-page.model'
import { WebPageInputSchema, WebPageUpdateSchema } from '@/lib/validator'
import { Checkbox } from '@/components/ui/checkbox'
import { toSlug } from '@/lib/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import Monaco Editor to avoid SSR issues
const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center">
      <div className="text-slate-500">Loading editor...</div>
    </div>
  )
})

const webPageDefaultValues =
  process.env.NODE_ENV === 'development'
    ? {
        title: 'Sample Page',
        slug: 'sample-page',
        content: '# Welcome to Our Page\n\nThis is a sample **Markdown** content.\n\n## Features\n\n- Easy to use\n- Responsive design\n- SEO friendly',
        htmlContent: '<div class="container">\n  <h1>Welcome to our page</h1>\n  <p>This is a sample HTML content.</p>\n</div>',
        cssContent: '.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 2rem;\n}\n\nh1 {\n  color: #2563eb;\n  margin-bottom: 1rem;\n}',
        jsContent: '// Add your JavaScript here\nconsole.log("Page loaded");\n\ndocument.addEventListener("DOMContentLoaded", function() {\n  // Initialize your scripts here\n});',
        isPublished: false,
      }
    : {
        title: '',
        slug: '',
        content: '',
        htmlContent: '',
        cssContent: '',
        jsContent: '',
        isPublished: false,
      }

const WebPageForm = ({
  type,
  webPage,
  webPageId,
}: {
  type: 'Create' | 'Update'
  webPage?: IWebPage
  webPageId?: string
}) => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('markdown')

  const form = useForm<z.infer<typeof WebPageInputSchema>>({
    resolver:
      type === 'Update'
        ? zodResolver(WebPageUpdateSchema)
        : zodResolver(WebPageInputSchema),
    defaultValues:
      webPage && type === 'Update' ? webPage : webPageDefaultValues,
    mode: 'onChange',
  })

  const { toast } = useToast()
  
  async function onSubmit(values: z.infer<typeof WebPageInputSchema>) {
    if (type === 'Create') {
      const res = await createWebPage(values)
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
      } else {
        toast({
          description: res.message,
        })
        router.push(`/admin/web-pages`)
      }
    }
    if (type === 'Update') {
      if (!webPageId) {
        router.push(`/admin/web-pages`)
        return
      }
      const res = await updateWebPage({ ...values, _id: webPageId })
      if (!res.success) {
        toast({
          variant: 'destructive',
          description: res.message,
        })
      } else {
        router.push(`/admin/web-pages`)
      }
    }
  }

  const hasChanges = form.formState.isDirty
  const isSubmitting = form.formState.isSubmitting

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <FileText className="w-5 h-5 text-blue-600" />
                Page Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold">
                        <FileText className="w-4 h-4 text-slate-600" />
                        Page Title
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter page title" 
                          {...field} 
                          className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                        />
                      </FormControl>
                      <FormDescription>
                        The main title that will appear on your page
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 font-semibold">
                        <Globe className="w-4 h-4 text-slate-600" />
                        URL Slug
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            placeholder="Enter URL slug"
                            className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 pr-24"
                            {...field}
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              form.setValue('slug', toSlug(form.getValues('title')))
                            }}
                            className="absolute right-1 top-1 h-7 text-xs"
                          >
                            <Sparkles className="w-3 h-3 mr-1" />
                            Generate
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        The URL-friendly version of the title
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Live Preview Link */}
              {form.watch('slug') && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <Eye className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="font-semibold text-blue-800 dark:text-blue-300 text-sm">
                        Live Preview
                      </p>
                      <p className="text-blue-700 dark:text-blue-400 text-xs">
                        {typeof window !== 'undefined' && 
                          `${window.location.origin}/page/${form.watch('slug')}`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Editor Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <LayoutTemplate className="w-5 h-5 text-purple-600" />
                Page Content
              </CardTitle>
              <FormDescription>
                Choose your preferred content format - Markdown for simple content or HTML/CSS/JS for advanced customization.
              </FormDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="markdown" className="flex items-center gap-2 data-[state=active]:bg-blue-100 data-[state=active]:text-blue-900 dark:data-[state=active]:bg-blue-900/20 dark:data-[state=active]:text-blue-100">
                    <FileText className="w-4 h-4" />
                    Markdown Editor
                  </TabsTrigger>
                  <TabsTrigger value="code" className="flex items-center gap-2 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-900 dark:data-[state=active]:bg-purple-900/20 dark:data-[state=active]:text-purple-100">
                    <Code className="w-4 h-4" />
                    Code Editor
                  </TabsTrigger>
                </TabsList>

                {/* Markdown Editor Tab */}
                <TabsContent value="markdown" className="space-y-4 mt-0">
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold">Markdown Content</FormLabel>
                        <FormControl>
                          <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                            <MdEditor
                              value={field.value}
                              style={{ 
                                height: '500px',
                                border: 'none'
                              }}
                              renderHTML={(text) => <ReactMarkdown>{text}</ReactMarkdown>}
                              onChange={({ text }) => form.setValue('content', text)}
                              config={{
                                view: {
                                  menu: true,
                                  md: true,
                                  html: true
                                },
                                canView: {
                                  menu: true,
                                  md: true,
                                  html: true,
                                  both: true,
                                  fullScreen: true,
                                  hideMenu: false
                                }
                              }}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          Use Markdown syntax for formatting. Supports headings, lists, links, and more.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TabsContent>

                {/* Code Editor Tab */}
                <TabsContent value="code" className="space-y-6 mt-0">
                  <div className="space-y-6">
                    {/* HTML Editor */}
                    <FormField
                      control={form.control}
                      name="htmlContent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-semibold">
                            <FileCode className="w-4 h-4 text-orange-600" />
                            HTML Content
                          </FormLabel>
                          <FormControl>
                            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                              <MonacoEditor
                                height="300px"
                                language="html"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                theme="vs-dark"
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: 'on',
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Write your HTML content. This will be rendered as the main page content.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* CSS Editor */}
                    <FormField
                      control={form.control}
                      name="cssContent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-semibold">
                            <Monitor className="w-4 h-4 text-blue-600" />
                            CSS Styles
                          </FormLabel>
                          <FormControl>
                            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                              <MonacoEditor
                                height="200px"
                                language="css"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                theme="vs-dark"
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: 'on',
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Add custom CSS styles for your page.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* JavaScript Editor */}
                    <FormField
                      control={form.control}
                      name="jsContent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2 font-semibold">
                            <Code className="w-4 h-4 text-yellow-600" />
                            JavaScript
                          </FormLabel>
                          <FormControl>
                            <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                              <MonacoEditor
                                height="200px"
                                language="javascript"
                                value={field.value}
                                onChange={(value) => field.onChange(value)}
                                theme="vs-dark"
                                options={{
                                  minimap: { enabled: false },
                                  fontSize: 14,
                                  lineNumbers: 'on',
                                  scrollBeyondLastLine: false,
                                  automaticLayout: true,
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Add custom JavaScript functionality to your page.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Code Preview */}
                  <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-200 dark:border-slate-700">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      Code Preview
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      Your HTML, CSS, and JavaScript will be combined and rendered on the page.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Publishing Settings Card */}
          <Card className="border-slate-200/50 dark:border-slate-700/50 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <Globe className="w-5 h-5 text-green-600" />
                Publishing Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name="isPublished"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-lg border border-slate-200 dark:border-slate-700 p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-semibold text-slate-900 dark:text-white">
                        Publish Page
                      </FormLabel>
                      <FormDescription>
                        Make this page visible to visitors on your website
                      </FormDescription>
                    </div>
                    {field.value && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300 ml-auto">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Live
                      </Badge>
                    )}
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Separator />

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/admin/web-pages`)}
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Pages
            </Button>
            
            <div className="flex items-center gap-3">
              {hasChanges && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300">
                  Unsaved Changes
                </Badge>
              )}
              
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 min-w-[200px] flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {type === 'Create' ? 'Create Page' : 'Update Page'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default WebPageForm
