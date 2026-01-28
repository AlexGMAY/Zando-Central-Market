import ReactMarkdown from 'react-markdown'
import { notFound } from 'next/navigation'
import { getWebPageBySlug } from '@/lib/actions/web-page.actions'

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}) {
  try {
    const params = await props.params
    const { slug } = params

    const webPage = await getWebPageBySlug(slug)
    
    if (!webPage) {
      return { 
        title: 'Page Not Found',
        description: 'The requested page could not be found.'
      }
    }
    
    return {
      title: webPage.title,
      description: webPage.content?.substring(0, 160) || `Read more about ${webPage.title}`,
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Error Loading Page',
      description: 'There was an error loading this page.'
    }
  }
}

export default async function WebPageDetailsPage(props: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page: string; color: string; size: string }>
}) {
  const params = await props.params
  const { slug } = params
  
  // Validate slug parameter
  if (!slug || typeof slug !== 'string') {
    console.error('Invalid slug parameter:', slug)
    notFound()
  }

  const webPage = await getWebPageBySlug(slug)

  if (!webPage) {
    console.warn(`Web page not found for slug: ${slug}`)
    notFound()
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-900/20'>
      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Header Section */}
        <div className='text-center mb-8'>
          <h1 className='text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4'>
            {webPage.title}
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full'></div>
        </div>

        {/* Content Section */}
        <article className='bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/50 p-6 md:p-8'>
          <section className='prose prose-lg dark:prose-invert max-w-none'>
            <div className='text-gray-700 dark:text-gray-300 leading-relaxed'>
              <ReactMarkdown
                components={{
                  h1: (props) => (
                    <h1 className='text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4' {...props} />
                  ),
                  h2: (props) => (
                    <h2 className='text-2xl font-semibold text-gray-800 dark:text-gray-100 mt-6 mb-3' {...props} />
                  ),
                  h3: (props) => (
                    <h3 className='text-xl font-medium text-gray-700 dark:text-gray-200 mt-4 mb-2' {...props} />
                  ),
                  p: (props) => (
                    <p className='mb-4 leading-7' {...props} />
                  ),
                  ul: (props) => (
                    <ul className='list-disc list-inside mb-4 space-y-2' {...props} />
                  ),
                  ol: (props) => (
                    <ol className='list-decimal list-inside mb-4 space-y-2' {...props} />
                  ),
                  blockquote: (props) => (
                    <blockquote 
                      className='border-l-4 border-blue-500 pl-4 italic text-gray-600 dark:text-gray-400 my-4' 
                      {...props} 
                    />
                  ),
                  code: (props) => (
                    <code 
                      className='block bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-sm font-mono my-4 overflow-x-auto' 
                      {...props} 
                    />
                  ),
                  a: (props) => (
                    <a 
                      className='text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors' 
                      {...props} 
                    />
                  ),
                }}
              >
                {webPage.content}
              </ReactMarkdown>
            </div>
          </section>
        </article>

        {/* Last Updated Info */}
        {webPage.updatedAt && (
          <div className='text-center mt-8'>
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              Last updated: {new Date(webPage.updatedAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
