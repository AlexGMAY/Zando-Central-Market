// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'
// export default function ProductGallery({ images }: { images: string[] }) {
//   const [selectedImage, setSelectedImage] = useState(0)
//   return (
//     <div className='flex gap-2'>
//       <div className='flex flex-col gap-2 mt-8'>
//         {images.map((image, index) => (
//           <button
//             key={index}
//             onClick={() => {
//               setSelectedImage(index)
//             }}
//             onMouseOver={() => {
//               setSelectedImage(index)
//             }}
//             className={`bg-white rounded-lg overflow-hidden ${
//               selectedImage === index
//                 ? 'ring-2 ring-blue-500'
//                 : 'ring-1 ring-gray-300'
//             }`}
//           >
//             <Image src={image} alt={'product image'} width={48} height={48} />
//           </button>
//         ))}
//       </div>

//       <div className='w-full'>
//         <Zoom>
//           <div className='relative h-[500px]'>
//             <Image
//               src={images[selectedImage]}
//               alt={'product image'}
//               fill
//               sizes='90vw'
//               className='object-contain'
//               priority
//             />
//           </div>
//         </Zoom>
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState } from 'react'
// import Image from 'next/image'
// import Zoom from 'react-medium-image-zoom'
// import 'react-medium-image-zoom/dist/styles.css'
// import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'

// export default function ProductGallery({ images }: { images: string[] }) {
//   const [selectedImage, setSelectedImage] = useState(0)
//   const [isZoomed, setIsZoomed] = useState(false)

//   const nextImage = () => {
//     setSelectedImage((prev) => (prev + 1) % images.length)
//   }

//   const prevImage = () => {
//     setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
//   }

//   return (
//     <div className="flex flex-col lg:flex-row gap-6">
//       {/* Thumbnail Navigation - Horizontal on mobile, Vertical on desktop */}
//       <div className="lg:order-1 lg:w-20">
//         <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible py-2 lg:py-0">
//           {images.map((image, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedImage(index)}
//               className={cn(
//                 "flex-shrink-0 relative group transition-all duration-300 transform hover:scale-105",
//                 "bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2",
//                 selectedImage === index
//                   ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-105'
//                   : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
//               )}
//             >
//               <Image 
//                 src={image} 
//                 alt={`Product view ${index + 1}`}
//                 width={64}
//                 height={64}
//                 className="object-cover w-16 h-16 lg:w-18 lg:h-18"
//               />
              
//               {/* Hover overlay */}
//               <div className={cn(
//                 "absolute inset-0 transition-opacity duration-200",
//                 selectedImage === index 
//                   ? "bg-blue-500/10" 
//                   : "bg-black/0 group-hover:bg-black/5"
//               )} />
              
//               {/* Selected indicator */}
//               {selectedImage === index && (
//                 <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full shadow-sm" />
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main Image Container */}
//       <div className="flex-1 relative">
//         <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 lg:p-12 shadow-xl">
//           {/* Navigation Arrows */}
//           {images.length > 1 && (
//             <>
//               <Button
//                 variant="secondary"
//                 size="icon"
//                 onClick={prevImage}
//                 className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
//               >
//                 <ChevronLeft className="h-6 w-6" />
//               </Button>
              
//               <Button
//                 variant="secondary"
//                 size="icon"
//                 onClick={nextImage}
//                 className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
//               >
//                 <ChevronRight className="h-6 w-6" />
//               </Button>
//             </>
//           )}

//           {/* Zoom Button */}
//           <Button
//             variant="secondary"
//             size="icon"
//             className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
//             onClick={() => document.querySelector('[data-rmiz-btn-open]')?.click()}
//           >
//             <Maximize2 className="h-4 w-4" />
//           </Button>

//           {/* Image Counter */}
//           <div className="absolute top-4 left-4 z-20 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
//             {selectedImage + 1} / {images.length}
//           </div>

//           {/* Main Image with Zoom */}
//           <Zoom
//             onZoomChange={(zoom) => setIsZoomed(zoom)}
//             zoomImg={{
//               src: images[selectedImage],
//               alt: 'Zoomed product image'
//             }}
//           >
//             <div className="relative h-[400px] lg:h-[500px] xl:h-[600px] flex items-center justify-center">
//               <Image
//                 src={images[selectedImage]}
//                 alt={`Product main image - view ${selectedImage + 1}`}
//                 fill
//                 sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 50vw"
//                 className="object-contain transition-transform duration-500"
//                 priority
//               />
              
//               {/* Loading shimmer */}
//               <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse" />
//             </div>
//           </Zoom>

//           {/* Zoom Hint */}
//           {!isZoomed && (
//             <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <div className="bg-black/70 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2">
//                 <Maximize2 className="h-4 w-4" />
//                 Click to zoom
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Mobile Image Indicator */}
//         <div className="flex justify-center gap-2 mt-4 lg:hidden">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setSelectedImage(index)}
//               className={cn(
//                 "w-2 h-2 rounded-full transition-all duration-300",
//                 selectedImage === index
//                   ? "bg-blue-500 w-6"
//                   : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
//               )}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function ProductGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isZoomed, setIsZoomed] = useState(false)
  const zoomButtonRef = useRef<HTMLButtonElement>(null)

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleZoomClick = () => {
    const zoomBtn = document.querySelector('[data-rmiz-btn-open]') as HTMLButtonElement
    if (zoomBtn) {
      zoomBtn.click()
    }
  }

  // Detect zoom state by observing the DOM
  useEffect(() => {
    const checkZoomState = () => {
      const zoomOverlay = document.querySelector('[data-rmiz-modal]')
      setIsZoomed(!!zoomOverlay)
    }

    // Use MutationObserver to detect zoom state changes
    const observer = new MutationObserver(checkZoomState)
    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Also check on initial load
    checkZoomState()

    return () => observer.disconnect()
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevImage()
      } else if (e.key === 'ArrowRight') {
        nextImage()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Thumbnail Navigation */}
      <div className="lg:order-1 lg:w-20">
        <div className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible py-2 lg:py-0 scrollbar-thin">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "flex-shrink-0 relative group transition-all duration-300 transform hover:scale-105",
                "bg-white dark:bg-gray-800 rounded-xl overflow-hidden border-2",
                selectedImage === index
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20 scale-105'
                  : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
              )}
            >
              <Image 
                src={image} 
                alt={`Product view ${index + 1}`}
                width={64}
                height={64}
                className="object-cover w-16 h-16 lg:w-18 lg:h-18"
              />
              
              <div className={cn(
                "absolute inset-0 transition-opacity duration-200",
                selectedImage === index 
                  ? "bg-blue-500/10" 
                  : "bg-black/0 group-hover:bg-black/5"
              )} />
              
              {selectedImage === index && (
                <div className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full shadow-sm" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Image Container */}
      <div className="flex-1 relative group">
        <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 lg:p-12 shadow-xl">
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="secondary"
                size="icon"
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              
              <Button
                variant="secondary"
                size="icon"
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-2xl hover:shadow-3xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 opacity-0 group-hover:opacity-100"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </>
          )}

          {/* Zoom Button */}
          <Button
            ref={zoomButtonRef}
            variant="secondary"
            size="icon"
            className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl hover:scale-110 hover:bg-white dark:hover:bg-gray-800 transition-all duration-300"
            onClick={handleZoomClick}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-20 bg-black/70 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm">
            {selectedImage + 1} / {images.length}
          </div>

          {/* Main Image with Zoom */}
          <Zoom
            zoomImg={{
              src: images[selectedImage],
              alt: 'Zoomed product image'
            }}
          >
            <div className="relative h-[400px] lg:h-[500px] xl:h-[600px] flex items-center justify-center cursor-zoom-in">
              <Image
                src={images[selectedImage]}
                alt={`Product main image - view ${selectedImage + 1}`}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1200px) 60vw, 50vw"
                className="object-contain transition-transform duration-500"
                priority
              />
              
              {/* Loading shimmer - removed after image loads */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse" />
            </div>
          </Zoom>

          {/* Zoom Hint */}
          {!isZoomed && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
              <div className="bg-black/80 text-white px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm flex items-center gap-2 shadow-2xl">
                <Maximize2 className="h-4 w-4" />
                Click to zoom
              </div>
            </div>
          )}
        </div>

        {/* Mobile Image Indicator */}
        <div className="flex justify-center gap-2 mt-4 lg:hidden">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                selectedImage === index
                  ? "bg-blue-500 w-6"
                  : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400"
              )}
            />
          ))}
        </div>

        {/* Keyboard Shortcuts Hint */}
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Use ← → keys to navigate
        </div>
      </div>
    </div>
  )
}
