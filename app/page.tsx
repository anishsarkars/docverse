'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Globe, ChevronDown, Search } from 'lucide-react'

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
          <div className="flex items-center bg-white text-gray-700 text-sm px-3 py-1 rounded-full mb-8 border border-gray-200 shadow-sm">
            <ArrowRight className="h-3 w-3 mr-1 text-gray-500" /> Smart Documentation <Search className="h-3 w-3 ml-1 text-gray-500" />
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
          <p className="text-sm text-gray-500 mt-4">
            Pause or cancel service anytime.
          </p>
        </main>

        {/* Bottom Images Section */}
        <section className="mt-16 w-full">
          <div className="grid grid-cols-6 gap-4">
            {/* Documentation-themed images */}
            <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-2">📝</div>
                <div className="text-xs text-blue-800 font-medium">API Docs</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-2">💻</div>
                <div className="text-xs text-green-800 font-medium">Code Blocks</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-2">🤝</div>
                <div className="text-xs text-purple-800 font-medium">Collaborate</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-2">🧠</div>
                <div className="text-xs text-orange-800 font-medium">AI Summary</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-2">⚡</div>
                <div className="text-xs text-pink-800 font-medium">Real-time</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl h-32 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl mb-2">📚</div>
                <div className="text-xs text-indigo-800 font-medium">Knowledge</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
