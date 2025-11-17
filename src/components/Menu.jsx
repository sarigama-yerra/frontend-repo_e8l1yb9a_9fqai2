import { useEffect, useState } from 'react'

const categories = ['Starters', 'Mains', 'Desserts', 'Drinks']

export default function Menu() {
  const [items, setItems] = useState([])
  const [active, setActive] = useState('Starters')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/menu`)
        const data = await res.json()
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  const filtered = items.filter(i => i.category === active)

  return (
    <section id="menu" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold">Our Menu</h2>
            <p className="text-gray-600 mt-2">Handpicked seasonal dishes cooked over flame.</p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full border transition ${active===c? 'bg-gray-900 text-white border-gray-900':'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
            >
              {c}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="mt-10 text-gray-500">Loading menu...</p>
        ) : (
          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <p className="text-gray-500">No items yet. Check back soon.</p>
            ) : (
              filtered.map((item, idx) => (
                <div key={idx} className="border rounded-lg p-4 hover:shadow-md transition">
                  {item.image && (
                    <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded-md mb-3" />
                  )}
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>
                  <p className="text-gray-600 mt-1 text-sm">{item.description}</p>
                  <div className="mt-3 text-xs text-gray-500">
                    {item.is_vegan && <span className="mr-2">Vegan</span>}
                    {item.is_gluten_free && <span className="mr-2">GF</span>}
                    {item.is_spicy && <span>Spicy</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  )
}
