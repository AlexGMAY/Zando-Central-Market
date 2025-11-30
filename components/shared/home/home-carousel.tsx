'use client'

import * as React from 'react'
import Image from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, Pause } from 'lucide-react'

export function HomeCarousel({
  items,
}: {
  items: {
    image: string
    url: string
    title: string
    buttonCaption: string
  }[]
}) {
  const [isPlaying, setIsPlaying] = React.useState(true)
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  )

  const toggleAutoplay = () => {
    if (isPlaying) {
      plugin.current.stop()
    } else {
      plugin.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="relative w-full mx-auto group">
      <Carousel
        dir='ltr'
        plugins={[plugin.current]}
        className='w-full relative'
        onMouseEnter={plugin.current.stop}
        onMouseLeave={() => isPlaying && plugin.current.play()}
      >
        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            onClick={toggleAutoplay}
            className="bg-white/90 backdrop-blur-sm hover:bg-white border-0 shadow-lg"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        <CarouselContent>
          {items.map((item, index) => (
            <CarouselItem key={item.title}>
              <Link href={item.url}>
                <div className='flex aspect-[16/6] items-center justify-center p-6 relative overflow-hidden'>
                  {/* Background Image with Overlay */}
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className='object-cover transition-transform duration-7000 group-hover:scale-105'
                    priority
                  />
                  
                  {/* Gradient Overlay */}
                  <div className='absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent' />
                  
                  {/* Content */}
                  <div className='relative z-10 w-full max-w-7xl mx-auto px-8'>
                    <div className='w-full md:w-2/5 space-y-6'>
                      <h2 className='text-4xl md:text-6xl font-bold text-white leading-tight drop-shadow-2xl'>
                        {item.title}
                      </h2>
                      <Button 
                        size="lg" 
                        className='bg-white text-gray-900 hover:bg-gray-100 font-semibold text-lg px-8 py-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-0'
                      >
                        {item.buttonCaption}
                      </Button>
                    </div>
                  </div>

                  {/* Indicator Dots */}
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {items.map((_, dotIndex) => (
                      <div
                        key={dotIndex}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          dotIndex === index ? 'bg-white w-6' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {/* Navigation Arrows */}
        <CarouselPrevious className='left-4 md:left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110' />
        <CarouselNext className='right-4 md:right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:bg-white hover:scale-110' />
      </Carousel>
    </div>
  )
}
