import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    { href: '#menu', label: 'Menu' },
    { href: '#reserve', label: 'Reservations' },
    { href: '#reviews', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <a href="#" className="text-xl font-bold tracking-tight">Élan Bistro</a>
          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-gray-700 hover:text-gray-900 transition-colors">
                {l.label}
              </a>
            ))}
            <a href="#reserve" className="inline-flex items-center bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-black transition-colors">
              Book a Table
            </a>
          </nav>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-2">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="block py-2 text-gray-700" onClick={() => setOpen(false)}>
                {l.label}
              </a>
            ))}
            <a href="#reserve" onClick={() => setOpen(false)} className="block w-full text-center bg-gray-900 text-white px-4 py-2 rounded-md">
              Book a Table
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
