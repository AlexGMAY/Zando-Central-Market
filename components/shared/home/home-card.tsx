import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { ChevronRight } from 'lucide-react'

type CardItem = {
  title: string
  subtitle?: string
  link: { text: string; href: string }
  items: {
    name: string
    items?: string[]
    image: string
    href: string
  }[]
}

export function HomeCard({ card, index }: { card: CardItem; index: number }) {
  return (
    <Card className="group relative overflow-hidden border-0 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardContent className="relative p-6 flex-1 z-10">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              {card.title}
            </h3>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <span className="text-white font-bold text-sm">{index + 1}</span>
            </div>
          </div>
          {card.subtitle && (
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              {card.subtitle}
            </p>
          )}
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-2 gap-4">
          {card.items.map((item, itemIndex) => (
            <Link
              key={item.name}
              href={item.href}
              className="group/item relative bg-white dark:bg-gray-700 rounded-xl p-3 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600"
              style={{
                animationDelay: `${itemIndex * 100}ms`
              }}
            >
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-300" />
              
              {/* Image Container */}
              <div className="relative aspect-square mb-3 overflow-hidden rounded-lg bg-gray-50 dark:bg-gray-600">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain object-fit transition-transform duration-500 group-hover/item:scale-110"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-300 rounded-lg" />
              </div>
              
              {/* Item Name */}
              <p className="text-center text-sm font-medium text-gray-900 dark:text-white line-clamp-2 group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors duration-200">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
      </CardContent>

      {/* Footer Link */}
      {card.link && (
        <CardFooter className="relative z-10 p-6 pt-0">
          <Link 
            href={card.link.href}
            className="group/link w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-700 dark:to-gray-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            {card.link.text}
            <ChevronRight className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-200" />
          </Link>
        </CardFooter>
      )}
    </Card>
  )
}
