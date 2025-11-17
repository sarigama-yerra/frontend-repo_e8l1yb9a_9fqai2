export default function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2070&auto=format&fit=crop"
          alt="Restaurant Hero"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-white"></div>
      </div>
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white drop-shadow">
          Modern Cuisine, Timeless Atmosphere
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-white/90">
          Seasonal ingredients, wood-fired flavors, and cocktails crafted to perfection.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a href="#menu" className="px-6 py-3 bg-white text-gray-900 rounded-md font-medium hover:bg-gray-100 transition">Explore Menu</a>
          <a href="#reserve" className="px-6 py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-black transition">Book a Table</a>
        </div>
      </div>
    </section>
  )
}
