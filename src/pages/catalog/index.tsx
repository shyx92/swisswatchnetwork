import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const CatalogPage: NextPage = () => {
  const brands = [
    {
      name: 'Emporio Armani',
      logo: '/images/brands/emporio-armani-logo.svg',
      description: 'Italian luxury fashion house known for sophisticated timepieces',
      link: '/brands/emporio-armani'
    },
    {
      name: 'Hugo Boss',
      logo: '/images/brands/hugo-boss-logo.svg',
      description: 'Premium German fashion brand offering elegant watches',
      link: '/brands/hugo-boss'
    },
    {
      name: 'Michael Kors',
      logo: '/images/brands/michael-kors-logo.svg',
      description: 'American luxury fashion brand with contemporary timepieces',
      link: '/brands/michael-kors'
    },
    {
      name: 'Seiko',
      logo: '/images/brands/seiko-logo.svg',
      description: 'Japanese watchmaker renowned for precision and innovation',
      link: '/brands/seiko'
    },
    {
      name: 'Burberry',
      logo: '/images/brands/burberry-logo.svg',
      description: 'British luxury fashion house with iconic timepieces',
      link: '/brands/burberry'
    },
    {
      name: 'Diesel',
      logo: '/images/brands/diesel-logo.svg',
      description: 'Italian fashion brand known for bold, contemporary watches',
      link: '/brands/diesel'
    },
    {
      name: 'Gucci',
      logo: '/images/brands/gucci-logo.svg',
      description: 'Italian luxury fashion house with distinctive timepieces',
      link: '/brands/gucci'
    },
    {
      name: 'Tissot',
      logo: '/images/brands/tissot-logo.svg',
      description: 'Swiss watchmaker with a rich heritage of excellence',
      link: '/brands/tissot'
    }
  ];

  return (
    <>
      <Head>
        <title>Catalog - Swiss Watch Network</title>
        <meta name="description" content="Browse our premium collection of luxury timepieces from renowned brands." />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/catalog-hero.jpg"
              alt="Luxury Watch Collection"
              fill
              className="object-cover brightness-50"
              priority
            />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-playfair mb-6">Our Catalog</h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Discover our curated collection of premium timepieces from world-renowned brands
            </p>
          </div>
        </section>

        {/* Catalog Grid */}
        <section className="py-20 px-4 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brands.map((brand) => (
                <Link 
                  key={brand.name}
                  href={brand.link}
                  className="group block bg-gray-50 p-6 rounded-lg transition-all duration-300 hover:shadow-lg"
                >
                  <div className="aspect-w-16 aspect-h-9 mb-4 relative">
                    <Image
                      src={brand.logo}
                      alt={`${brand.name} Logo`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <h3 className="text-xl font-playfair mb-2 group-hover:text-primary transition-colors">
                    {brand.name}
                  </h3>
                  <p className="text-gray-600">
                    {brand.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CatalogPage; 