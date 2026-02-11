import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';

const banners = [
  {
    image: '/banner_quadrado.png',
    title: 'Coleção Exclusiva',
    subtitle: 'Peças únicas para você',
    link: '/loja'
  },
  {
    image: '/banner_quadrado1.jpg',
    title: 'Promoções',
    subtitle: 'Aproveite condições especiais',
    link: '/categoria/promoções'
  }
];

export default function SquareBanners() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={banner.link}>
                <div className="relative aspect-square rounded-xl overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Overlay dourado suave (cor do site) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-[#968567]/30 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10">
                    <h3 className="text-2xl md:text-3xl font-bold text-white font-gumani mb-1 drop-shadow-lg">
                      {banner.title}
                    </h3>
                    <p className="text-white/95 text-lg font-medium drop-shadow-md inline-flex items-center gap-1.5">
                      {banner.subtitle}
                      <ChevronRight size={20} className="flex-shrink-0 opacity-90" />
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
