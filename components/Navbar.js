"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname()
    const showNavbar = ["/", "/generate"].includes(pathname)
    const [menuOpen, setMenuOpen] = useState(false)

    return ( <>{showNavbar && (
  <nav className="w-[90vw] max-w-6xl mx-auto flex justify-between items-center fixed top-8 left-1/2 -translate-x-1/2 rounded-2xl px-4 md:px-8 py-4 z-30 bg-white/10 backdrop-blur-lg border border-cyan-400/40 shadow-xl shadow-cyan-400/10 hover:shadow-pink-500/20 transition-all duration-300">
    <div className="flex items-center gap-4 md:gap-6">
      <Link href="/">
        <img src="/logo.png" alt="Logo" width={35} height={35} className="mb-2 rounded-xl shadow-lg border-cyan-400/60 cursor-pointer w-[28px] h-[28px] md:w-[40px] md:h-[40px] lg:w-[56px] lg:h-[56px]" />
      </Link>
      {/* Desktop menu */}
      <ul className="hidden lg:flex gap-6 text-lg font-mono">
        <Link href="/" className="group"><li className="px-3 py-1 rounded-lg transition-all duration-200 group-hover:bg-cyan-400/20 group-hover:text-cyan-300 group-hover:shadow-cyan-400/30">Templates</li></Link>
        <Link href="/" className="group"><li className="px-3 py-1 rounded-lg transition-all duration-200 group-hover:bg-pink-500/20 group-hover:text-pink-400 group-hover:shadow-pink-500/30">Marketplace</li></Link>
        <Link href="/" className="group"><li className="px-3 py-1 rounded-lg transition-all duration-200 group-hover:bg-purple-500/20 group-hover:text-purple-400 group-hover:shadow-purple-500/30">Discover</li></Link>
        <Link href="/" className="group"><li className="px-3 py-1 rounded-lg transition-all duration-200 group-hover:bg-blue-500/20 group-hover:text-blue-400 group-hover:shadow-blue-500/30">Pricing</li></Link>
        <Link href="/" className="group"><li className="px-3 py-1 rounded-lg transition-all duration-200 group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400 group-hover:shadow-fuchsia-500/30">Learn</li></Link>
      </ul>
      {/* Hamburger for mobile */}
      <button
        className="lg:hidden flex flex-col justify-center items-center w-10 h-10 ml-2 focus:outline-none"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span className={`block w-7 h-1 rounded bg-cyan-400 mb-1 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
        <span className={`block w-7 h-1 rounded bg-cyan-400 mb-1 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
        <span className={`block w-7 h-1 rounded bg-cyan-400 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
      </button>
    </div>
    {/* Desktop buttons */}
    <div className="hidden lg:flex gap-3 items-center">
      <button className="px-6 py-2 font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-400/30 hover:from-blue-600 hover:to-cyan-500 hover:shadow-pink-500/30 transition-all duration-200 border-2 border-transparent hover:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/40">Log in</button>
      <button className="px-6 py-2 font-bold rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg shadow-pink-400/30 hover:from-fuchsia-600 hover:to-pink-500 hover:shadow-cyan-400/30 transition-all duration-200 border-2 border-transparent hover:border-pink-400/60 focus:outline-none focus:ring-2 focus:ring-pink-400/40">Sign up free</button>
    </div>
    {/* Mobile menu dropdown */}
    {menuOpen && (
      <div className="lg:hidden absolute top-full left-0 w-full bg-[#151b26] border-t border-cyan-400/20 shadow-lg rounded-b-2xl animate-fadeIn z-40">
        <ul className="flex flex-col gap-2 py-4 px-6 text-lg font-mono">
          <Link href="/" onClick={() => setMenuOpen(false)} className="group"><li className="px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-cyan-400/20 group-hover:text-cyan-300">Templates</li></Link>
          <Link href="/" onClick={() => setMenuOpen(false)} className="group"><li className="px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-pink-500/20 group-hover:text-pink-400">Marketplace</li></Link>
          <Link href="/" onClick={() => setMenuOpen(false)} className="group"><li className="px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-purple-500/20 group-hover:text-purple-400">Discover</li></Link>
          <Link href="/" onClick={() => setMenuOpen(false)} className="group"><li className="px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-blue-500/20 group-hover:text-blue-400">Pricing</li></Link>
          <Link href="/" onClick={() => setMenuOpen(false)} className="group"><li className="px-3 py-2 rounded-lg transition-all duration-200 group-hover:bg-fuchsia-500/20 group-hover:text-fuchsia-400">Learn</li></Link>
        </ul>
        <div className="flex flex-col gap-2 px-6 pb-4">
          <button className="w-full px-6 py-2 font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-cyan-500 transition-all duration-200 border-2 border-transparent hover:border-cyan-400/60 focus:outline-none focus:ring-2 focus:ring-cyan-400/40">Log in</button>
          <button className="w-full px-6 py-2 font-bold rounded-xl bg-gradient-to-r from-pink-500 to-fuchsia-600 text-white shadow-lg hover:from-fuchsia-600 hover:to-pink-500 transition-all duration-200 border-2 border-transparent hover:border-pink-400/60 focus:outline-none focus:ring-2 focus:ring-pink-400/40">Sign up free</button>
        </div>
      </div>
    )}
  </nav>
)}</>
)
}

export default Navbar