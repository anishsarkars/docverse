'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Globe, ChevronDown, Search, Star } from 'lucide-react'

export default function LandingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Main content card with rounded corners and shadow */}
      <div className="bg-white rounded-3xl shadow-2xl py-16 px-12 w-full max-w-6xl flex flex-col items-center">
        {/* Header Section */}
        <header className="w-full px-6 flex justify-between items-center mb-20">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">DocVerse</div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">Home</a>
            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Planning <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="relative group">
              <button className="flex items-center text-gray-600 hover:text-gray-900">
                Documentation <ChevronDown className="h-4 w-4 ml-1" />
              </button>
            </div>
            <a href="#" className="text-gray-600 hover:text-gray-900">Pricing</a>
            <a href="#" className="text-gray-600 hover:text-gray-900">FAQs</a>
          </nav>

          {/* Language Selector and Register Button */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Globe className="h-5 w-5 mr-1" /> English <ChevronDown className="h-4 w-4 ml-1" />
            </button>
            <button
              onClick={() => router.push('/signup')}
              className="bg-black text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Register
            </button>
          </div>
        </header>

        {/* Main Hero Content Area - Centered */}
        <main className="flex flex-col items-center text-center px-6 max-w-3xl">
          {/* Small "Smart Documentation" badge */}
          <div className="flex items-center bg-pink-100 text-pink-800 text-sm px-3 py-1 rounded-full mb-8">
            <ArrowRight className="h-3 w-3 mr-1" /> Smart Documentation <Search className="h-3 w-3 ml-1" />
          </div>

          {/* Hero Headline */}
          <h1 className="text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Intelligent Docs, <br /> Made Simple!
          </h1>

          {/* Hero Sub-headline/Description */}
          <p className="text-xl text-gray-600 mb-10 max-w-2xl">
            Dive into the ultimate documentation experience with DocVerse! We specialize in creating collaborative, AI-powered documentation platforms.
          </p>

          {/* Call-to-Action Button */}
          <button
            onClick={() => router.push('/signup')}
            className="bg-black text-white font-medium py-3 px-8 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center text-lg shadow-lg hover:shadow-xl"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </button>

          {/* Small text below CTA */}
          <p className="text-sm text-gray-500 mt-4 flex items-center">
            <Star className="h-4 w-4 mr-1 text-orange-500" /> Pause or cancel service anytime.
          </p>
        </main>

        {/* Company Logos Section */}
        <section className="mt-16 w-full">
          <div className="flex justify-center items-center space-x-8 opacity-40">
            <span className="text-gray-400 text-sm">Retool</span>
            <span className="text-gray-400 text-sm">Remote</span>
            <span className="text-gray-400 text-sm">ARC</span>
            <span className="text-gray-400 text-sm">Raycast</span>
            <span className="text-gray-400 text-sm">Runway</span>
            <span className="text-gray-400 text-sm">Ramp</span>
            <span className="text-gray-400 text-sm">HEX</span>
            <span className="text-gray-400 text-sm">Vercel</span>
            <span className="text-gray-400 text-sm">Descript</span>
            <span className="text-gray-400 text-sm">Cash App</span>
          </div>
        </section>

        {/* Bottom Images Section */}
        <section className="mt-16 w-full">
          <div className="grid grid-cols-6 gap-4">
            {/* Documentation-themed images with aesthetic gradients */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl h-32 flex items-center justify-center border border-blue-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <div className="w-6 h-6 bg-blue-600 rounded"></div>
                </div>
                <div className="text-xs text-blue-700 font-medium">API Docs</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl h-32 flex items-center justify-center border border-green-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <div className="w-6 h-6 bg-green-600 rounded"></div>
                </div>
                <div className="text-xs text-green-700 font-medium">Code Blocks</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl h-32 flex items-center justify-center border border-purple-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <div className="w-6 h-6 bg-purple-600 rounded"></div>
                </div>
                <div className="text-xs text-purple-700 font-medium">Collaborate</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl h-32 flex items-center justify-center border border-orange-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <div className="w-6 h-6 bg-orange-600 rounded"></div>
                </div>
                <div className="text-xs text-orange-700 font-medium">AI Summary</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl h-32 flex items-center justify-center border border-pink-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-pink-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <div className="w-6 h-6 bg-pink-600 rounded"></div>
                </div>
                <div className="text-xs text-pink-700 font-medium">Real-time</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-2xl h-32 flex items-center justify-center border border-indigo-200">
              <div className="text-center">
                <div className="w-12 h-12 bg-indigo-200 rounded-lg flex items-center justify-center mb-2 mx-auto">
                  <div className="w-6 h-6 bg-indigo-600 rounded"></div>
                </div>
                <div className="text-xs text-indigo-700 font-medium">Knowledge</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
