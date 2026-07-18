import { ChevronRight, ShieldCheck, Truck, Star } from "lucide-react";

interface HeroProps {
  onExploreProducts: () => void;
}

export default function Hero({ onExploreProducts }: HeroProps) {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center pt-20 bg-brand-green-dark overflow-hidden">
      {/* Background Image with Dark overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_ingredients_1784079918984.jpg"
          alt="Ingredientes gastronómicos premium en fondo oscuro"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-10000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green-dark via-brand-green-dark/95 to-transparent md:bg-gradient-to-r" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green-dark via-transparent to-brand-green-dark/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy */}
          <div className="lg:col-span-8 space-y-8 text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-gold/15 border border-brand-gold/30 px-3 py-1.5 rounded-full">
              <Star className="h-4 w-4 text-brand-gold fill-brand-gold" />
              <span className="text-xs font-mono font-semibold tracking-wider text-brand-gold uppercase">
                Socios de los mejores chefs de la región
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-none">
              Materias primas <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-dark font-serif italic font-normal">
                premium
              </span>{" "}
              para alta cocina.
            </h1>

            <p className="max-w-2xl text-base sm:text-lg md:text-xl text-neutral-300 font-light leading-relaxed">
              Abastecemos a restaurantes de primer nivel con insumos minuciosamente seleccionados de origen certificado. Aseguramos la consistencia y la excelencia que sus clientes esperan en cada mesa.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onExploreProducts}
                className="bg-brand-gold hover:bg-brand-gold-dark text-brand-green-dark font-semibold px-8 py-4 rounded-xl text-base transition-all duration-300 hover:scale-[1.02] flex items-center justify-center space-x-2 shadow-lg shadow-brand-gold/10 cursor-pointer"
                id="hero-explore-btn"
                style={{ minHeight: "48px" }}
              >
                <span>Ver Catálogo</span>
                <ChevronRight className="h-5 w-5" />
              </button>
              <a
                href="#nosotros"
                className="bg-white/5 hover:bg-white/10 text-white font-medium px-8 py-4 rounded-xl text-base transition-all duration-300 border border-white/10 hover:border-brand-gold/40 flex items-center justify-center space-x-2"
                style={{ minHeight: "48px" }}
                id="hero-learn-more"
              >
                <span>Nuestro Compromiso</span>
              </a>
            </div>

            {/* Value Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-start space-x-3">
                <div className="bg-brand-gold/10 p-2.5 rounded-lg text-brand-gold mt-1">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">Origen Certificado</h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">Trazabilidad absoluta del campo al plato.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-brand-gold/10 p-2.5 rounded-lg text-brand-gold mt-1">
                  <Truck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">Logística Eficiente</h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">Entregas programadas con puntualidad garantizada.</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="bg-brand-gold/10 p-2.5 rounded-lg text-brand-gold mt-1">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-wide">Consistencia Garantizada</h4>
                  <p className="text-xs text-neutral-400 font-light mt-0.5">El mismo estándar en cada despacho, siempre.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
