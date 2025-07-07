import ProductGrid from "../components/product-grid"
import SearchAndFilter from "../components/search-and-filter"

const Home = () => {

  return (
    <main className="flex-1">
    {/* HERO SECTION */}
    <section className=" bg-gradient-to-r from-primary/90 to-primary/70 dark:from-primary/80 dark:to-primary/60 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Premium Poker Equipment</h1>
        <p className="text-xl md:text-2xl mb-8 opacity-90">
        Creating Your Dream Table Is As Easy As...
        </p>
      </div>
    </section>

    {/* SEARCH AND FILTER */}
    <section className="py-8 bg-muted/30">
      <div className="container mx-auto px-4">
        <SearchAndFilter />
      </div>
    </section>

    {/* PRODUCTS */}
    <section className="py-12">
      <div className="container mx-auto px-4">
        <ProductGrid />
      </div>
    </section>
  </main>
  )
}

export default Home