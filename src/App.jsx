import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Reservations from './components/Reservations'
import Reviews from './components/Reviews'

function Footer() {
  return (
    <footer id="contact" className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-lg">Élan Bistro</h4>
          <p className="text-gray-300 mt-2">123 Market Street, San Francisco, CA</p>
          <p className="text-gray-300">Open Daily · 11:30am – 11:00pm</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg">Contact</h4>
          <p className="text-gray-300 mt-2">(415) 555-0199</p>
          <p className="text-gray-300">hello@elanbistro.com</p>
        </div>
        <div>
          <h4 className="font-semibold text-lg">Newsletter</h4>
          <NewsletterForm />
        </div>
      </div>
      <div className="mt-10 text-center text-gray-400 text-sm">© {new Date().getFullYear()} Élan Bistro. All rights reserved.</div>
    </footer>
  )
}

import { useState } from 'react'
function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/newsletter`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email })
      })
      if (!res.ok) throw new Error('failed')
      setMsg('Thanks for subscribing!')
      setEmail('')
    } catch (e) {
      setMsg('Something went wrong. Please try again later.')
    }
  }
  return (
    <form onSubmit={submit} className="mt-2 flex gap-2">
      <input className="flex-1 px-4 py-3 rounded-md text-gray-900" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required />
      <button className="bg-white text-gray-900 px-4 py-3 rounded-md font-medium hover:bg-gray-100">Join</button>
      {msg && <p className="text-gray-300 text-sm mt-2 w-full">{msg}</p>}
    </form>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-16">
        <Hero />
        <Menu />
        <Reservations />
        <Reviews />
      </main>
      <Footer />
    </div>
  )
}

export default App
