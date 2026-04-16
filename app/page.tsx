import type { CSSProperties } from 'react'

type Vehicle = {
  brand: string
  model: string
  category: string
  tagline: string
  engine: string
  power: string
  topSpeed: string
  zeroToHundred: string
  drivetrain: string
  image: string
}

type VehicleCategory = {
  title: string
  intro: string
  vehicles: Vehicle[]
}

const flagshipBrands = [
  'BMW',
  'Audi',
  'Porsche',
  'Mercedes-AMG',
  'Ford',
  'Chevrolet',
  'Pagani',
  'Lamborghini',
  'Ferrari',
  'Yamaha',
  'Ducati',
  'Honda',
  'KTM',
]

const carCatalog: VehicleCategory[] = [
  {
    title: 'Sedan Legends',
    intro: 'Performance sedans built for executive comfort and track-level acceleration.',
    vehicles: [
      {
        brand: 'BMW',
        model: 'M5 CS',
        category: 'Sedan',
        tagline: 'Ultra-fast luxury missile with precise chassis balance.',
        engine: '4.4L Twin-Turbo V8',
        power: '627 hp',
        topSpeed: '305 km/h',
        zeroToHundred: '3.0 sec',
        drivetrain: 'xDrive AWD',
        image: 'https://loremflickr.com/1200/720/bmw,m5,car?lock=1101',
      },
      {
        brand: 'Mercedes-AMG',
        model: 'C 63 S E Performance',
        category: 'Sedan',
        tagline: 'Hybrid-era AMG punch with instant electric torque fill.',
        engine: '2.0L Turbo Hybrid',
        power: '671 hp',
        topSpeed: '280 km/h',
        zeroToHundred: '3.4 sec',
        drivetrain: 'AMG Performance 4MATIC+',
        image: 'https://loremflickr.com/1200/720/mercedes,amg,car?lock=1102',
      },
      {
        brand: 'Audi',
        model: 'RS 7 Performance',
        category: 'Sedan',
        tagline: 'Grand-tour attack sedan with all-weather quattro grip.',
        engine: '4.0L Twin-Turbo V8',
        power: '621 hp',
        topSpeed: '305 km/h',
        zeroToHundred: '3.4 sec',
        drivetrain: 'quattro AWD',
        image: 'https://loremflickr.com/1200/720/audi,rs7,car?lock=1103',
      },
    ],
  },
  {
    title: 'Hot Hatch Icons',
    intro: 'Compact rockets that blend daily usability with aggressive handling.',
    vehicles: [
      {
        brand: 'Audi',
        model: 'RS 3 Sportback',
        category: 'Hatchback',
        tagline: 'Five-cylinder soundtrack with sharp compact proportions.',
        engine: '2.5L Turbo Inline-5',
        power: '394 hp',
        topSpeed: '290 km/h',
        zeroToHundred: '3.8 sec',
        drivetrain: 'quattro AWD',
        image: 'https://loremflickr.com/1200/720/audi,hatchback,car?lock=1201',
      },
      {
        brand: 'Honda',
        model: 'Civic Type R',
        category: 'Hatchback',
        tagline: 'FWD benchmark for steering feel and circuit consistency.',
        engine: '2.0L Turbo Inline-4',
        power: '315 hp',
        topSpeed: '275 km/h',
        zeroToHundred: '5.2 sec',
        drivetrain: 'Front-Wheel Drive',
        image: 'https://loremflickr.com/1200/720/honda,type-r,car?lock=1202',
      },
      {
        brand: 'Mercedes-AMG',
        model: 'A 45 S',
        category: 'Hatchback',
        tagline: 'One of the most powerful production hot hatches ever.',
        engine: '2.0L Turbo Inline-4',
        power: '416 hp',
        topSpeed: '270 km/h',
        zeroToHundred: '3.9 sec',
        drivetrain: '4MATIC+ AWD',
        image: 'https://loremflickr.com/1200/720/mercedes,hatchback,amg?lock=1203',
      },
    ],
  },
  {
    title: 'Performance SUVs',
    intro: 'High-riding machines that still deliver supercar-grade pace.',
    vehicles: [
      {
        brand: 'Porsche',
        model: 'Cayenne Turbo GT',
        category: 'SUV',
        tagline: 'Track-focused SUV with Nurburgring credibility.',
        engine: '4.0L Twin-Turbo V8',
        power: '650 hp',
        topSpeed: '305 km/h',
        zeroToHundred: '3.3 sec',
        drivetrain: 'All-Wheel Drive',
        image: 'https://loremflickr.com/1200/720/porsche,suv,car?lock=1301',
      },
      {
        brand: 'Lamborghini',
        model: 'Urus Performante',
        category: 'SUV',
        tagline: 'Lambo aggression packaged in a practical body style.',
        engine: '4.0L Twin-Turbo V8',
        power: '657 hp',
        topSpeed: '306 km/h',
        zeroToHundred: '3.3 sec',
        drivetrain: 'All-Wheel Drive',
        image: 'https://loremflickr.com/1200/720/lamborghini,urus,suv?lock=1302',
      },
      {
        brand: 'BMW',
        model: 'X5 M Competition',
        category: 'SUV',
        tagline: 'Muscular twin-turbo SUV tuned for long-distance speed.',
        engine: '4.4L Twin-Turbo V8',
        power: '617 hp',
        topSpeed: '290 km/h',
        zeroToHundred: '3.8 sec',
        drivetrain: 'xDrive AWD',
        image: 'https://loremflickr.com/1200/720/bmw,suv,car?lock=1303',
      },
    ],
  },
  {
    title: 'Supercars and Hypercars',
    intro: 'The halo machines: iconic, rare, and built for peak adrenaline.',
    vehicles: [
      {
        brand: 'Ferrari',
        model: 'SF90 Stradale',
        category: 'Supercar',
        tagline: 'Electrified Ferrari flagship with massive launch control thrust.',
        engine: '4.0L Twin-Turbo V8 Hybrid',
        power: '986 hp',
        topSpeed: '340 km/h',
        zeroToHundred: '2.5 sec',
        drivetrain: 'eAWD',
        image: 'https://loremflickr.com/1200/720/ferrari,supercar?lock=1401',
      },
      {
        brand: 'Lamborghini',
        model: 'Revuelto',
        category: 'Supercar',
        tagline: 'V12 flagship with hybrid torque and fighter-jet drama.',
        engine: '6.5L V12 Hybrid',
        power: '1001 hp',
        topSpeed: '350+ km/h',
        zeroToHundred: '2.5 sec',
        drivetrain: 'All-Wheel Drive',
        image: 'https://loremflickr.com/1200/720/lamborghini,revuelto?lock=1402',
      },
      {
        brand: 'Pagani',
        model: 'Huayra BC',
        category: 'Hypercar',
        tagline: 'Hand-built carbon art with brutal AMG V12 output.',
        engine: '6.0L Twin-Turbo V12',
        power: '791 hp',
        topSpeed: '370 km/h',
        zeroToHundred: '2.8 sec',
        drivetrain: 'Rear-Wheel Drive',
        image: 'https://loremflickr.com/1200/720/pagani,hypercar?lock=1403',
      },
      {
        brand: 'Ford',
        model: 'GT',
        category: 'Supercar',
        tagline: 'Le Mans-inspired aero package with race-proven DNA.',
        engine: '3.5L Twin-Turbo EcoBoost V6',
        power: '660 hp',
        topSpeed: '347 km/h',
        zeroToHundred: '3.0 sec',
        drivetrain: 'Rear-Wheel Drive',
        image: 'https://loremflickr.com/1200/720/ford,gt,supercar?lock=1404',
      },
      {
        brand: 'Chevrolet',
        model: 'Corvette Z06',
        category: 'Supercar',
        tagline: 'High-revving naturally aspirated V8 with exotic character.',
        engine: '5.5L Flat-Plane V8',
        power: '670 hp',
        topSpeed: '315 km/h',
        zeroToHundred: '2.6 sec',
        drivetrain: 'Rear-Wheel Drive',
        image: 'https://loremflickr.com/1200/720/chevrolet,corvette,supercar?lock=1405',
      },
    ],
  },
]

const bikeCatalog: VehicleCategory[] = [
  {
    title: 'Sport Bikes',
    intro: 'Race-bred machines for maximum speed, corner precision, and braking power.',
    vehicles: [
      {
        brand: 'Yamaha',
        model: 'YZF-R1M',
        category: 'Sport',
        tagline: 'MotoGP-inspired superbike with top-tier electronics.',
        engine: '998cc Inline-4',
        power: '200 hp',
        topSpeed: '299 km/h',
        zeroToHundred: '3.0 sec',
        drivetrain: 'Chain Drive',
        image: 'https://loremflickr.com/1200/720/yamaha,sport,bike?lock=2101',
      },
      {
        brand: 'Ducati',
        model: 'Panigale V4 R',
        category: 'Sport',
        tagline: 'Track weapon with aero winglets and WSBK spirit.',
        engine: '998cc V4',
        power: '218 hp',
        topSpeed: '300+ km/h',
        zeroToHundred: '3.1 sec',
        drivetrain: 'Chain Drive',
        image: 'https://loremflickr.com/1200/720/ducati,sport,bike?lock=2102',
      },
      {
        brand: 'Honda',
        model: 'CBR1000RR-R Fireblade SP',
        category: 'Sport',
        tagline: 'High-revving precision machine tuned for corner exits.',
        engine: '999cc Inline-4',
        power: '214 hp',
        topSpeed: '299 km/h',
        zeroToHundred: '3.2 sec',
        drivetrain: 'Chain Drive',
        image: 'https://loremflickr.com/1200/720/honda,sport,bike?lock=2103',
      },
      {
        brand: 'KTM',
        model: 'RC 8C',
        category: 'Sport',
        tagline: 'Lightweight track-focused machine with razor responses.',
        engine: '889cc Parallel-Twin',
        power: '135 hp',
        topSpeed: '270 km/h',
        zeroToHundred: '3.4 sec',
        drivetrain: 'Chain Drive',
        image: 'https://loremflickr.com/1200/720/ktm,sport,bike?lock=2104',
      },
    ],
  },
  {
    title: 'Naked Streetfighters',
    intro: 'Minimal fairings, maximum torque, and aggressive upright ergonomics.',
    vehicles: [
      {
        brand: 'Ducati',
        model: 'Streetfighter V4 S',
        category: 'Naked',
        tagline: 'Panigale-derived power in a raw urban-focused form.',
        engine: '1103cc V4',
        power: '208 hp',
        topSpeed: '300 km/h',
        zeroToHundred: '3.2 sec',
        drivetrain: 'Chain Drive',
        image: 'https://loremflickr.com/1200/720/ducati,naked,bike?lock=2201',
      },
      {
        brand: 'Yamaha',
        model: 'MT-10 SP',
        category: 'Naked',
        tagline: 'Crossplane torque machine with premium suspension tech.',
        engine: '998cc Inline-4',
        power: '166 hp',
        topSpeed: '250+ km/h',
        zeroToHundred: '3.3 sec',
        drivetrain: 'Chain Drive',
        image: 'https://loremflickr.com/1200/720/yamaha,naked,bike?lock=2202',
      },
      {
        brand: 'KTM',
        model: '1290 Super Duke R EVO',
        category: 'Naked',
        tagline: 'Hyper-naked icon known as The Beast for a reason.',
        engine: '1301cc V-Twin',
        power: '180 hp',
        topSpeed: '280 km/h',
        zeroToHundred: '3.1 sec',
        drivetrain: 'Chain Drive',
        image: 'https://loremflickr.com/1200/720/ktm,naked,bike?lock=2203',
      },
    ],
  },
  {
    title: 'Touring and Adventure',
    intro: 'Long-range comfort with performance that still keeps rides exciting.',
    vehicles: [
      {
        brand: 'BMW',
        model: 'R 1300 GS',
        category: 'Adventure',
        tagline: 'Benchmark adventure bike for mixed-terrain travel.',
        engine: '1300cc Boxer-Twin',
        power: '145 hp',
        topSpeed: '225 km/h',
        zeroToHundred: '3.4 sec',
        drivetrain: 'Shaft Drive',
        image: 'https://loremflickr.com/1200/720/bmw,adventure,bike?lock=2301',
      },
      {
        brand: 'Honda',
        model: 'Gold Wing Tour',
        category: 'Touring',
        tagline: 'Luxury grand tourer with effortless highway composure.',
        engine: '1833cc Flat-Six',
        power: '125 hp',
        topSpeed: '200 km/h',
        zeroToHundred: '4.0 sec',
        drivetrain: 'Shaft Drive',
        image: 'https://loremflickr.com/1200/720/honda,touring,bike?lock=2302',
      },
      {
        brand: 'Ducati',
        model: 'Multistrada V4 RS',
        category: 'Touring',
        tagline: 'Sportbike-level engine in a long-haul adventure package.',
        engine: '1103cc V4',
        power: '180 hp',
        topSpeed: '250+ km/h',
        zeroToHundred: '3.4 sec',
        drivetrain: 'Chain Drive',
        image: 'https://loremflickr.com/1200/720/ducati,touring,bike?lock=2303',
      },
      {
        brand: 'Yamaha',
        model: 'Tracer 9 GT+',
        category: 'Sport-Touring',
        tagline: 'Tech-packed mile-eater with agile canyon performance.',
        engine: '890cc Triple',
        power: '117 hp',
        topSpeed: '230 km/h',
        zeroToHundred: '3.8 sec',
        drivetrain: 'Chain Drive',
        image: 'https://loremflickr.com/1200/720/yamaha,touring,bike?lock=2304',
      },
    ],
  },
]

function VehicleCard({ vehicle, index }: { vehicle: Vehicle; index: number }) {
  return (
    <article
      className="vehicle-card reveal"
      style={{ '--delay': `${index * 80}ms` } as CSSProperties}
    >
      <div className="relative">
        <img
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="vehicle-image"
          loading="lazy"
        />
        <span className="absolute left-3 top-3 badge-pill">{vehicle.category}</span>
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">{vehicle.brand}</p>
        <h3 className="display-text mt-1 text-2xl text-white">{vehicle.model}</h3>
        <p className="mt-2 text-sm text-slate-300">{vehicle.tagline}</p>
        <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2 text-xs text-slate-200">
          <div>
            <dt className="text-slate-500">Engine</dt>
            <dd>{vehicle.engine}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Power</dt>
            <dd>{vehicle.power}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Top Speed</dt>
            <dd>{vehicle.topSpeed}</dd>
          </div>
          <div>
            <dt className="text-slate-500">0-100</dt>
            <dd>{vehicle.zeroToHundred}</dd>
          </div>
          <div className="col-span-2">
            <dt className="text-slate-500">Drive</dt>
            <dd>{vehicle.drivetrain}</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}

function VehicleSection({
  title,
  subtitle,
  categories,
}: {
  title: string
  subtitle: string
  categories: VehicleCategory[]
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
      <div className="surface-panel reveal p-6 sm:p-8">
        <h2 className="display-text text-4xl text-white sm:text-5xl">{title}</h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-300 sm:text-base">{subtitle}</p>
      </div>
      <div className="mt-7 space-y-7">
        {categories.map((category, categoryIndex) => (
          <section
            key={category.title}
            className="surface-panel reveal p-5 sm:p-6"
            style={{ '--delay': `${categoryIndex * 120}ms` } as CSSProperties}
          >
            <h3 className="display-text text-3xl text-white sm:text-4xl">{category.title}</h3>
            <p className="mt-2 text-sm text-slate-300">{category.intro}</p>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {category.vehicles.map((vehicle, vehicleIndex) => (
                <VehicleCard
                  key={`${category.title}-${vehicle.brand}-${vehicle.model}`}
                  vehicle={vehicle}
                  index={vehicleIndex}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  )
}

export default function HomePage() {
  return (
    <main className="catalog-root">
      <div className="catalog-overlay" />
      <section className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
        <div className="hero-panel reveal p-6 sm:p-9">
          <div className="flex flex-wrap gap-3">
            <span className="badge-pill">Brochure Mode</span>
            <span className="badge-pill">Cars and Bikes</span>
            <span className="badge-pill">No Cart / No Checkout</span>
          </div>
          <h1 className="display-text mt-6 text-5xl leading-none text-white sm:text-7xl">
            Candle Torque Atlas
          </h1>
          <p className="mt-4 max-w-3xl text-base text-slate-200 sm:text-lg">
            A high-performance vehicle catalog focused on world-famous brands, supercars,
            flagship bikes, and category-first browsing. Explore specs like engine layout,
            power, top speed, and acceleration in a clean brochure-style experience.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="metric-tile">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Brands</p>
              <p className="display-text text-3xl text-white">{flagshipBrands.length}</p>
            </div>
            <div className="metric-tile">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Vehicles</p>
              <p className="display-text text-3xl text-white">25</p>
            </div>
            <div className="metric-tile">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Categories</p>
              <p className="display-text text-3xl text-white">7</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="surface-panel reveal p-5 sm:p-6">
          <h2 className="display-text text-3xl text-white sm:text-4xl">Flagship Brands</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {flagshipBrands.map((brand, index) => (
              <span
                key={brand}
                className="brand-chip reveal"
                style={{ '--delay': `${index * 70}ms` } as CSSProperties}
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      <VehicleSection
        title="Car Catalog"
        subtitle="From hot hatch heroes to V12 hypercars, grouped by body style and performance intent."
        categories={carCatalog}
      />

      <VehicleSection
        title="Bike Catalog"
        subtitle="From racetrack superbikes to mile-eating tourers, grouped for quick comparison."
        categories={bikeCatalog}
      />

      <footer className="mx-auto max-w-7xl px-4 pb-12 pt-3 text-xs text-slate-400 sm:px-6 lg:px-8">
        Specs are brochure-level reference values and may vary by market, trim, and model year.
      </footer>
    </main>
  )
}
