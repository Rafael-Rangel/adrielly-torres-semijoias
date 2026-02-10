import { Check, Truck, Shield, Zap } from 'lucide-react';

export default function Benefits() {
  const benefits = [
    {
      icon: Check,
      title: 'Qualidade Garantida',
      description: 'Todas as peças possuem 6 meses de garantia e são 100% hipoalergênicas'
    },
    {
      icon: Truck,
      title: 'Frete Grátis',
      description: 'Frete grátis em compras acima de R$ 200,00 em todo o Brasil'
    },
    {
      icon: Shield,
      title: 'Compra Segura',
      description: 'Seus dados são protegidos com as melhores tecnologias de segurança'
    },
    {
      icon: Zap,
      title: 'Parcelamento',
      description: 'Parcele em até 6x sem juros no cartão de crédito'
    }
  ];

  return (
    <section className="py-16 bg-secondary">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent rounded-lg">
                    <Icon size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="font-bold text-foreground mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
