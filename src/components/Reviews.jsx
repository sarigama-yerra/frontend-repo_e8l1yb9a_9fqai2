import { useEffect, useState } from 'react'

export default function Reviews() {
  const [reviews, setReviews] = useState([])
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' })

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/reviews?limit=6`)
        const data = await res.json()
        setReviews(data)
      } catch (e) {
        console.error(e)
      }
    }
    fetchReviews()
  }, [])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const submit = async (e) => {
    e.preventDefault()
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, rating: Number(form.rating) })
      })
      if (res.ok) {
        setForm({ name: '', rating: 5, comment: '' })
        const updated = await fetch(`${baseUrl}/api/reviews?limit=6`).then(r => r.json())
        setReviews(updated)
      }
    } catch (e) {}
  }

  return (
    <section id="reviews" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl font-bold">Guest Reviews</h2>
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet. Be the first to share!</p>
            ) : (
              reviews.map((r, i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{r.name}</h4>
                    <div className="text-yellow-500">{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                  </div>
                  <p className="text-gray-600 mt-2 text-sm">{r.comment}</p>
                </div>
              ))
            )}
          </div>
          <form onSubmit={submit} className="border rounded-lg p-6 bg-gray-50">
            <h3 className="text-xl font-semibold">Leave a review</h3>
            <input name="name" value={form.name} onChange={onChange} placeholder="Your name" className="mt-4 w-full px-4 py-3 rounded-md border" required />
            <select name="rating" value={form.rating} onChange={onChange} className="mt-3 w-full px-4 py-3 rounded-md border">
              {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} star{n>1?'s':''}</option>)}
            </select>
            <textarea name="comment" value={form.comment} onChange={onChange} placeholder="Share your experience" className="mt-3 w-full px-4 py-3 rounded-md border" required />
            <button className="mt-4 bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-black transition">Submit</button>
          </form>
        </div>
      </div>
    </section>
  )
}
