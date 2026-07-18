import { useState } from "react";
import { Product } from "../types";
import { PRODUCTS, CATEGORIES } from "../data";
import { Wheat, Coffee, Sparkles, Scale, Package, MapPin, CheckCircle2, ChevronRight, Info } from "lucide-react";

interface ProductsProps {
  onSelectProduct: (product: Product) => void;
}

export default function Products({ onSelectProduct }: ProductsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts = activeCategory === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Wheat":
        return <Wheat className="h-4 w-4" />;
      case "Coffee":
        return <Coffee className="h-4 w-4" />;
      case "Sparkles":
        return <Sparkles className="h-4 w-4" />;
      default:
        return <Wheat className="h-4 w-4" />;
    }
  };

  return (
    <section id="productos" className="py-24 bg-neutral-light relative">
      {/* Decorative subtle texture */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green-light/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-brand-gold-dark uppercase bg-brand-gold/10 px-3.5 py-1.5 rounded-full">
            Catálogo Seleccionado
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-brand-green-dark mt-4 tracking-tight">
            Nuestros Insumos Estrella
          </h2>
          <p className="text-neutral-600 mt-4 font-light text-base sm:text-lg">
            Seleccionamos únicamente un puñado de productores globales que cumplen con rigurosos controles de calidad para garantizar la consistencia en tu menú.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
              activeCategory === "all"
                ? "bg-brand-green-primary text-white shadow-md shadow-brand-green-primary/10"
                : "bg-white text-neutral-600 hover:bg-brand-green-light hover:text-brand-green-primary border border-brand-green-light/60"
            }`}
            style={{ minHeight: "40px" }}
            id="cat-all"
          >
            Todos los Insumos
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center space-x-2 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-brand-green-primary text-white shadow-md shadow-brand-green-primary/10"
                  : "bg-white text-neutral-600 hover:bg-brand-green-light hover:text-brand-green-primary border border-brand-green-light/60"
              }`}
              style={{ minHeight: "40px" }}
              id={`cat-${cat.id}`}
            >
              {getCategoryIcon(cat.icon)}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* ========================================== */}
          {/* PRODUCT CARD 1: ARROZ PARA SUSHI (ACTIVE)  */}
          {/* ========================================== */}
          {filteredProducts.map((product) => {
            const isSushi = product.id === "arroz-sushi-premium";

            return (
              <div
                key={product.id}
                className={`flex flex-col bg-white rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  product.isAvailable
                    ? "border-brand-green-light shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-brand-gold/40"
                    : "border-neutral-200 bg-neutral-50/50 opacity-90 hover:opacity-100"
                }`}
                id={`product-card-${product.id}`}
              >
                {/* Product Badge */}
                <div className="absolute top-4 right-4 z-20">
                  {product.isAvailable ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-mono tracking-wider uppercase font-bold px-3 py-1 rounded-full border border-emerald-200">
                      Disponible
                    </span>
                  ) : (
                    <span className="bg-brand-gold/20 text-brand-gold-dark text-[10px] font-mono tracking-wider uppercase font-bold px-3 py-1 rounded-full border border-brand-gold/30">
                      Próximamente
                    </span>
                  )}
                </div>

                {/* Product Image */}
                <div className="relative h-64 w-full bg-neutral-100 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-[10px] font-mono tracking-wider text-brand-gold uppercase font-bold">
                      {CATEGORIES.find(c => c.id === product.category)?.name || "Insumo"}
                    </span>
                    <h3 className="text-lg font-serif font-bold mt-1 tracking-tight drop-shadow-sm">
                      {product.name}
                    </h3>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Description */}
                    <p className="text-sm text-neutral-600 font-light leading-relaxed">
                      {product.description}
                    </p>

                    {/* Features Specifications */}
                    <div className="bg-neutral-50 rounded-xl p-4 border border-neutral-100 space-y-2.5 text-xs">
                      <div className="flex items-center space-x-2 text-neutral-700">
                        <MapPin className="h-4 w-4 text-brand-gold-dark shrink-0" />
                        <span className="font-medium text-neutral-500">Origen:</span>
                        <span className="text-neutral-900 font-normal">{product.origin}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-neutral-700">
                        <Package className="h-4 w-4 text-brand-gold-dark shrink-0" />
                        <span className="font-medium text-neutral-500">Presentación:</span>
                        <span className="text-neutral-900 font-normal">{product.packaging}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-neutral-700">
                        <Scale className="h-4 w-4 text-brand-gold-dark shrink-0" />
                        <span className="font-medium text-neutral-500">Ped. Mínimo:</span>
                        <span className="text-neutral-900 font-normal">{product.minOrder}</span>
                      </div>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-2 pt-2">
                      <span className="text-xs font-mono font-bold uppercase text-brand-green-primary tracking-wider flex items-center">
                        Ventajas para el Chef
                      </span>
                      <ul className="space-y-2">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-start space-x-2.5 text-xs text-neutral-600">
                            <CheckCircle2 className="h-4 w-4 text-brand-green-primary shrink-0 mt-0.5" />
                            <span className="font-light leading-snug">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Actions Area */}
                  <div className="pt-6 border-t border-neutral-100 mt-6">
                    {product.isAvailable ? (
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="w-full bg-brand-green-primary hover:bg-brand-green-dark text-white hover:text-brand-gold font-semibold py-3.5 px-4 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-green-primary/5 flex items-center justify-center space-x-2 cursor-pointer"
                        style={{ minHeight: "44px" }}
                        id={`btn-cotizar-${product.id}`}
                      >
                        <span>Cotizar Muestras / Compra</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    ) : (
                      <div className="space-y-3">
                        <button
                          onClick={() => onSelectProduct(product)}
                          className="w-full bg-neutral-100 hover:bg-brand-green-light text-neutral-500 hover:text-brand-green-primary font-medium py-3 px-4 rounded-xl text-xs transition-colors flex items-center justify-center space-x-2 border border-dashed border-neutral-300 hover:border-brand-green-primary/30 cursor-pointer"
                          style={{ minHeight: "44px" }}
                          id={`btn-info-${product.id}`}
                        >
                          <Info className="h-4 w-4" />
                          <span>Me interesa este insumo</span>
                        </button>
                        <p className="text-[10px] text-center text-neutral-400 font-mono italic">
                          Próxima liberación de cupos de importación.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
