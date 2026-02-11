import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import WhatsAppButton from '@/components/WhatsAppButton';
import { motion } from 'framer-motion';

export default function CTASection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container">
        <div className="relative rounded-xl overflow-hidden min-h-[320px] md:min-h-[400px] flex items-center">
          <img
            src="/banner_cta1.jpg"
            alt="Chamada para ação"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="relative z-10 w-full max-w-2xl px-6 py-12 md:px-12 md:py-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 font-gumani leading-tight">
                Encontrou a peça ideal?
              </h2>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                Fale comigo pelo WhatsApp e garanta a sua. Entrega feita por mim, com todo o cuidado.
              </p>
              <div className="flex flex-wrap gap-4">
                <WhatsAppButton preset="cta" size="default" variant="outline" className="min-w-[180px] justify-center text-sm font-semibold">
                  Comprar pelo WhatsApp
                </WhatsAppButton>
                <Link href="/loja" className="inline-block">
                  <Button size="default" variant="outline" className="border-white text-white hover:bg-white/20 min-w-[180px] text-sm font-semibold">
                    Ver toda a loja
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
