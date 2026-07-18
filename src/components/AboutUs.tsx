import { Award, HeartHandshake, Eye, CheckCircle2 } from "lucide-react";

export default function AboutUs() {
  const pillars = [
    {
      icon: <Award className="h-6 w-6 text-brand-gold" />,
      title: "Control de Selección Riguroso",
      description: "Cada lote de materia prima pasa por pruebas sensoriales y de humedad antes del empaque, asegurando que solo llegue a tu cocina lo mejor del mercado mundial.",
    },
    {
      icon: <Eye className="h-6 w-6 text-brand-gold" />,
      title: "Transparencia y Trazabilidad",
      description: "Conocemos el nombre del agricultor, la altitud de la cosecha y las condiciones de transporte. Compartimos esta historia contigo para que puedas transmitírsela a tus comensales.",
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-brand-gold" />,
      title: "Alianzas de Suministro Exclusivas",
      description: "No somos solo un proveedor; somos tu socio estratégico. Ofrecemos contratos de volumen fijo anual para blindarte de las fluctuaciones de precio y la escasez del mercado.",
    },
  ];

  return (
    <section id="nosotros" className="py-24 bg-brand-green-dark text-white relative overflow-hidden">
      {/* Background elegant circles */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-green-primary/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Narrative copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase bg-white/5 border border-white/10 px-3.5 py-1.5 rounded-full">
              Sobre Nosotros
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight">
              Compromiso absoluto con el <br />
              <span className="font-serif italic text-brand-gold font-normal">éxito de tu menú.</span>
            </h2>
            <p className="text-neutral-300 font-light text-base sm:text-lg leading-relaxed">
              Fundada por apasionados de la gastronomía y expertos en comercio exterior, nuestra distribuidora nació para cerrar la brecha entre los campos de cultivo más finos del planeta y las cocinas profesionales más exigentes.
            </p>
            <p className="text-neutral-400 font-light text-sm sm:text-base leading-relaxed">
              Entendemos que en la alta cocina, un ingrediente que varíe un 5% de textura o humedad puede arruinar una receta que costó años perfeccionar. Por eso, no vendemos a volumen masivo; atendemos a una red seleccionada de restaurantes que ponen la excelencia por encima de todo.
            </p>

            {/* Quick stats panel */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10">
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold">50+</span>
                <p className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider mt-1">Restaurantes Aliados</p>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold">100%</span>
                <p className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider mt-1">Trazabilidad</p>
              </div>
              <div>
                <span className="font-serif text-3xl sm:text-4xl font-bold text-brand-gold">0%</span>
                <p className="text-[11px] text-neutral-400 font-mono uppercase tracking-wider mt-1">Fallas de Abasto</p>
              </div>
            </div>
          </div>

          {/* Pillars Bento layout */}
          <div className="lg:col-span-6 space-y-6">
            {pillars.map((pillar, index) => (
              <div 
                key={index} 
                className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-gold/30 rounded-2xl p-6 transition-all duration-300 flex items-start space-x-5"
                id={`about-pillar-${index}`}
              >
                <div className="bg-white/5 p-3.5 rounded-xl border border-white/5 text-brand-gold shrink-0 mt-1">
                  {pillar.icon}
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-bold text-brand-gold">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-neutral-300 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
