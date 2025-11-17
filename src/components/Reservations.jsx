import { useState } from 'react'

export default function Reservations() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', date: '', time: '', party_size: 2, notes: '' })
  const [status, setStatus] = useState(null)

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Submitting...')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, party_size: Number(form.party_size) })
      })
      if (!res.ok) throw new Error('Failed to submit')
      setStatus('✅ Reservation requested! We\'ll confirm by email.')
      setForm({ name: '', email: '', phone: '', date: '', time: '', party_size: 2, notes: '' })
    } catch (e) {
      setStatus('❌ Something went wrong. Please try again.')
    }
  }

  return (
    <section id="reserve" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Reserve a Table</h2>
        <p className="text-gray-600 mt-2">We\'ll email you to confirm your booking.</p>
        <form onSubmit={submit} className="mt-8 grid gap-4 sm:grid-cols-2">
          <input name="name" value={form.name} onChange={onChange} placeholder="Full name" className="px-4 py-3 rounded-md border" required />
          <input name="email" value={form.email} onChange={onChange} placeholder="Email" type="email" className="px-4 py-3 rounded-md border" required />
          <input name="phone" value={form.phone} onChange={onChange} placeholder="Phone" className="px-4 py-3 rounded-md border sm:col-span-2" />
          <input name="date" value={form.date} onChange={onChange} type="date" className="px-4 py-3 rounded-md border" required />
          <input name="time" value={form.time} onChange={onChange} type="time" className="px-4 py-3 rounded-md border" required />
          <input name="party_size" value={form.party_size} onChange={onChange} type="number" min={1} max={20} className="px-4 py-3 rounded-md border" required />
          <textarea name="notes" value={form.notes} onChange={onChange} placeholder="Notes (optional)" className="px-4 py-3 rounded-md border sm:col-span-2" />
          <button className="sm:col-span-2 bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-black transition">Submit</button>
        </form>
        {status && <p className="mt-4 text-sm">{status}</p>}
      </div>
    </section>
  )
}
