'use client'

import { ChevronUp, Building2, Phone, Mail, MapPin } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { APP_NAME } from '@/lib/constants'
import { useState, useEffect } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
  
  const footerSections = [
    {
      title: 'Get to Know Us',
      links: [
        { name: 'About Us', href: '/page/about-us' },
        { name: 'Careers', href: '/page/careers' },
        { name: 'Press Releases', href: '/page/press' },
        { name: 'Investor Relations', href: '/page/investors' },
      ],
    },
    {
      title: 'Make Money with Us',
      links: [
        { name: 'Sell on ' + APP_NAME, href: '/sell' },
        { name: 'Become an Affiliate', href: '/affiliate' },
        { name: 'Advertise Your Products', href: '/advertising' },
        { name: 'Become a Vendor', href: '/vendor' },
      ],
    },
    {
      title: 'Payment Methods',
      links: [
        { name: 'Credit Cards', href: '/credit-cards' },
        { name: 'Digital Wallets', href: '/digital-wallets' },
        { name: 'Bank Transfer', href: '/bank-transfer' },
        { name: 'Cash on Delivery', href: '/cod' },
      ],
    },
    {
      title: 'Let Us Help You',
      links: [
        { name: 'Your Account', href: '/account' },
        { name: 'Your Orders', href: '/account/orders' },
        { name: 'Shipping Rates & Policies', href: '/shipping' },
        { name: 'Returns & Replacements', href: '/returns' },
        { name: 'Help & Customer Service', href: '/page/help' },
      ],
    },
  ]

  return (
    <footer className="relative bg-gray-900 text-white border-t border-gray-700">
      {/* Back to Top Button */}
      <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group h-12 w-12"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
        </Button>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1 xl:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">{APP_NAME}</span>
            </div>
            <div className="space-y-3 text-sm text-gray-300">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p>123, Lumumba Avenue<br />Kinshasa, RDC, Zip 12345</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="tel:+243824567890" className="hover:text-blue-300 transition-colors">
                  +243 (82) 456-7890
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                <a href="mailto:contact@example.com" className="hover:text-blue-300 transition-colors">
                  contact@example.com
                </a>
              </div>
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="font-semibold text-white text-lg">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-white text-sm transition-colors duration-200 block hover:translate-x-1 transform"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Legal Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm mb-4">
            <Link 
              href="/page/conditions-of-use" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Conditions of Use
            </Link>
            <Link 
              href="/page/privacy-policy" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Privacy Notice
            </Link>
            <Link 
              href="/page/help" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Help
            </Link>
            <Link 
              href="/page/cookies" 
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              Cookie Preferences
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-sm">
              © 2000-{currentYear}, {APP_NAME}, Inc. or its affiliates. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
