"use client"
// import getHandle from "./gethandle/page";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter()
  const [text, setText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const createTree = async () => { 
    if (!text.trim()) {
      alert("Please enter a handle")
      return
    }
    setIsLoading(true)
    try {
      // Check if handle exists in database
      const response = await fetch('/api/check-handle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ handle: text.trim() })
      })
      const data = await response.json()
      if (data.success && data.exists) {
        router.push(`/${text.trim()}`)
      } else {
        // Pass image info to generate page
        let url = `/generate?handle=${encodeURIComponent(text.trim())}&newHandle=true`;
        router.push(url)
      }
    } catch (error) {
      console.error('Error checking handle:', error)
      let url = `/generate?handle=${encodeURIComponent(text.trim())}`;
      router.push(url)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#10131a] to-[#1a2332] px-4 pt-6">
      {/* Hero Section */}
      <section className="w-full max-w-2xl flex flex-col items-center justify-center pt-32 pb-12">
        <h1 className="text-4xl md:text-6xl font-extrabold text-center text-white mb-4 tracking-tight" style={{letterSpacing: '0.01em'}}>
          OneClink
        </h1>
        <p className="text-lg md:text-xl text-center text-cyan-200 mb-8 font-mono max-w-md">
        Share in a Blink, Flex What You Link.
        </p>
        {/* Username Input Card */}
        <div className="w-full bg-[#151b26] border border-cyan-700/30 rounded-xl shadow-md p-6 flex flex-col items-center mb-8">
          <label htmlFor="username" className="text-base font-medium text-cyan-400 mb-2">Claim your OneClink handle</label>
          <div className="w-full flex gap-2">
            <input
              id="username"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-[#10131a] border border-cyan-700/40 text-white placeholder-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-mono text-base transition-all"
              type="text"
              placeholder="Enter your handle"
              onKeyPress={(e) => e.key === 'Enter' && createTree()}
            />
            <button
              onClick={createTree}
              disabled={isLoading || !text.trim()}
              className={`px-6 py-3 rounded-lg font-bold bg-cyan-600 text-white transition-all duration-150 hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 ${(!text.trim() || isLoading) ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>Checking</span>
              ) : (
                'Claim'
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="w-full max-w-2xl flex justify-center mb-8">
        <div className="flex gap-8 bg-[#151b26] border border-cyan-700/20 rounded-xl px-8 py-4 shadow-sm">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-cyan-300">50M+</span>
            <span className="text-xs text-cyan-100 mt-1">Users</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-cyan-300">99.99%</span>
            <span className="text-xs text-cyan-100 mt-1">Uptime</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-cyan-300">24/7</span>
            <span className="text-xs text-cyan-100 mt-1">Support</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-3xl mx-auto py-8">
        <h2 className="text-2xl font-bold text-center text-white mb-8">Why OneClink?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center bg-[#151b26] border border-cyan-700/20 rounded-xl p-6 shadow-sm">
            <span className="text-3xl mb-2">⚡</span>
            <h3 className="text-base font-semibold text-cyan-300 mb-1">Instant Setup</h3>
            <p className="text-sm text-cyan-100 text-center">Create your OneClink in seconds with a clean, intuitive interface.</p>
          </div>
          <div className="flex flex-col items-center bg-[#151b26] border border-cyan-700/20 rounded-xl p-6 shadow-sm">
            <span className="text-3xl mb-2">🎨</span>
            <h3 className="text-base font-semibold text-cyan-300 mb-1">Customizable</h3>
            <p className="text-sm text-cyan-100 text-center">Choose from beautiful templates or craft your own unique hub.</p>
          </div>
          <div className="flex flex-col items-center bg-[#151b26] border border-cyan-700/20 rounded-xl p-6 shadow-sm">
            <span className="text-3xl mb-2">📊</span>
            <h3 className="text-base font-semibold text-cyan-300 mb-1">Analytics</h3>
            <p className="text-sm text-cyan-100 text-center">Track clicks, views, and engagement with real-time analytics.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
