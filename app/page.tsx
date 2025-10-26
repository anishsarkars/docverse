'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight } from 'lucide-react'

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

          {/* Register Button */}
          <button
            onClick={() => router.push('/signup')}
            className="bg-black text-white font-medium py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Register
          </button>
        </header>

        {/* Main Hero Content Area - Centered */}
        <main className="flex flex-col items-center text-center px-6 max-w-3xl">
          {/* Hero Headline with subtle animation */}
          <h1 className="text-7xl font-extrabold text-gray-900 leading-tight mb-8 animate-fade-in">
            Intelligent Docs, <br /> 
            <span className="text-gray-700 animate-slide-up">Made Simple!</span>
          </h1>

          {/* Hero Sub-headline/Description with animation */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl animate-fade-in-delay">
            Create, collaborate, and share documentation with AI-powered insights.
          </p>

          {/* Call-to-Action Button with hover animation */}
          <button
            onClick={() => router.push('/signup')}
            className="bg-black text-white font-medium py-4 px-10 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center text-lg shadow-lg hover:shadow-xl hover:scale-105 animate-bounce-subtle"
          >
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </button>
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
