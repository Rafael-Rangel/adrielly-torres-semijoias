import { motion } from 'framer-motion';

interface CategoryBannerProps {
  categoria: string;
  imagem?: string;
}

const categoriaBanners: Record<string, { imagem: string; titulo: string; subtitulo: string }> = {
  'ANÉIS': {
    imagem: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=1920&h=600&fit=crop',
    titulo: 'Anéis Elegantes',
    subtitulo: 'Descubra nossa coleção exclusiva de anéis'
  },
  'BRINCOS': {
    imagem: 'https://images.unsplash.com/photo-1617038260897-41a1f14b2c7b?w=1920&h=600&fit=crop',
    titulo: 'Brincos Sofisticados',
    subtitulo: 'Peças únicas para destacar sua beleza'
  },
  'COLARES': {
    imagem: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1920&h=600&fit=crop',
    titulo: 'Colares & Cordões',
    subtitulo: 'Elegância e sofisticação em cada peça'
  },
  'PULSEIRAS': {
    imagem: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1920&h=600&fit=crop',
    titulo: 'Pulseiras Exclusivas',
    subtitulo: 'Complete seu look com estilo'
  },
  'PIERCINGS': {
    imagem: 'https://images.unsplash.com/photo-1589987607627-616cacb7f83a?w=1920&h=600&fit=crop',
    titulo: 'Piercings Modernos',
    subtitulo: 'Expressão única e personalidade'
  },
  'PINGENTES': {
    imagem: 'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=1920&h=600&fit=crop',
    titulo: 'Pingentes Especiais',
    subtitulo: 'Significados e símbolos únicos'
  },
  'ACESSÓRIOS': {
    imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=1920&h=600&fit=crop',
    titulo: 'Acessórios Completos',
    subtitulo: 'Tudo para seu estilo único'
  },
  'CONJUNTOS': {
    imagem: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1920&h=600&fit=crop',
    titulo: 'Conjuntos Completos',
    subtitulo: 'Coordenação perfeita em cada peça'
  },
  'PROMOÇÕES': {
    imagem: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1920&h=600&fit=crop',
    titulo: 'Promoções Especiais',
    subtitulo: 'Aproveite condições imperdíveis!'
  }
};

export default function CategoryBanner({ categoria }: CategoryBannerProps) {
  const banner = categoriaBanners[categoria.toUpperCase()] || {
    imagem: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1920&h=600&fit=crop',
    titulo: categoria,
    subtitulo: 'Descubra nossa coleção exclusiva'
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative h-64 md:h-80 lg:h-96 overflow-hidden bg-black/20 rounded-lg mb-8"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banner.imagem})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70" />
      </div>
      
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            {banner.titulo}
          </h1>
          <p className="text-lg md:text-xl text-white/90">
            {banner.subtitulo}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
