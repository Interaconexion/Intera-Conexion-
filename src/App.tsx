import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Products from "./components/Products";
import AboutUs from "./components/AboutUs";
import QuoteModal from "./components/QuoteModal";
import Footer from "./components/Footer";
import { Product } from "./types";
import { PRODUCTS } from "./data";
import { motion, AnimatePresence } from "motion/react";
import { Coffee, Wheat, Sparkles, AlertCircle, Quote, Compass, Calendar, ClipboardCheck, PhoneCall, Mail, Clock, MapPin } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("inicio");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  // Form states for the custom B2B inquiry on the contact tab
  const [contactForm, setContactForm] = useState({
    name: "",
    restaurant: "",
    role: "Chef Ejecutivo",
    email: "",
    phone: "",
    message: ""
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // When general quote is clicked, default to the featured Arroz para Sushi Koshihikari Premium
  const handleOpenGeneralQuote = () => {
    const featuredProduct = PRODUCTS.find((p) => p.id === "arroz-sushi-premium") || PRODUCTS[0];
    setSelectedProduct(featuredProduct);
    setIsQuoteModalOpen(true);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setIsQuoteModalOpen(true);
  };

  const handleCloseQuoteModal = () => {
    setIsQuoteModalOpen(false);
    setSelectedProduct(null);
  };

  const handleExploreProducts = () => {
    setActiveTab("productos");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactForm({
        name: "",
        restaurant: "",
        role: "Chef Ejecutivo",
        email: "",
        phone: "",
        message: ""
      });
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-neutral-light flex flex-col selection:bg-brand-gold selection:text-brand-green-dark">
      {/* Header Navigation with activeTab support */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenQuote={handleOpenGeneralQuote} 
      />

      {/* Main Content Area with elegant animations */}
      <main className="flex-grow pt-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {/* ===================================== */}
            {/* TAB: INICIO                           */}
            {/* ===================================== */}
            {activeTab === "inicio" && (
              <div className="space-y-0">
                <Hero onExploreProducts={handleExploreProducts} />
                
                {/* Visual Premium Entrance Banner */}
                <section className="py-20 bg-white border-b border-brand-green-light">
                  <div className="max-w-5xl mx-auto px-4 text-center space-y-8">
                    <div className="inline-flex p-3 bg-brand-gold/10 rounded-full text-brand-gold-dark">
                      <Compass className="h-6 w-6" />
                    </div>
                    <div className="space-y-4">
                      <span className="text-xs font-mono font-bold tracking-widest text-brand-gold-dark uppercase">
                        Suministros de Alta Fidelidad
                      </span>
                      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green-dark tracking-tight max-w-2xl mx-auto leading-tight">
                        La estabilidad que tu estrellas Michelin y alta cocina merecen
                      </h2>
                    </div>
                    <p className="text-neutral-600 font-light max-w-3xl mx-auto leading-relaxed text-sm sm:text-base">
                      En INTERA Conexión Gastronómica, curamos de forma exclusiva materias primas con estándares analíticos. No competimos en volumen masivo; competimos en regularidad física, limpieza del grano y empaques con barrera de protección. Explora nuestro catálogo exclusivo de materias primas seleccionadas.
                    </p>

                    <div className="pt-6 max-w-sm mx-auto">
                      <button
                        onClick={() => {
                          setActiveTab("productos");
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="w-full bg-brand-green-primary hover:bg-brand-green-dark text-white hover:text-brand-gold font-semibold p-6 rounded-2xl border border-transparent transition-all hover:shadow-lg text-left space-y-2 cursor-pointer"
                      >
                        <Wheat className="h-6 w-6 text-brand-gold" />
                        <h4 className="font-serif text-lg font-bold">Catálogo de Insumos</h4>
                        <p className="text-xs text-neutral-300 font-light">Explora el Arroz Koshihikari Premium y los lanzamientos de Café Bourbon.</p>
                      </button>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ===================================== */}
            {/* TAB: PRODUCTOS                        */}
            {/* ===================================== */}
            {activeTab === "productos" && (
              <Products onSelectProduct={handleSelectProduct} />
            )}

            {/* ===================================== */}
            {/* TAB: NOSOTROS                         */}
            {/* ===================================== */}
            {activeTab === "nosotros" && (
              <div className="space-y-0">
                <AboutUs />
                
                {/* Premium Testimonial Quote Block */}
                <section className="py-24 bg-white border-t border-brand-green-light relative overflow-hidden">
                  <div className="max-w-4xl mx-auto px-4 text-center space-y-8 relative z-10">
                    <div className="inline-flex p-3 bg-brand-gold/10 rounded-full text-brand-gold-dark">
                      <Quote className="h-6 w-6" />
                    </div>
                    <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl italic text-brand-green-dark leading-relaxed font-medium">
                      "INTERA ha transformado la estabilidad de nuestro suministro. Su arroz Koshihikari mantiene la misma humedad exacta en invierno y en verano, permitiendo a nuestros sushimen entregar una experiencia homogénea en cada plato."
                    </blockquote>
                    <div className="space-y-1">
                      <cite className="font-bold text-sm tracking-wider text-brand-green-primary uppercase font-sans not-italic block">
                        Chef Kenji Takahashi
                      </cite>
                      <span className="text-xs text-neutral-500 font-mono">
                        Director Gastronómico de Grupo Sakura (Restaurantes con estrella)
                      </span>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {/* ===================================== */}
            {/* TAB: CONTACTO                         */}
            {/* ===================================== */}
            {activeTab === "contacto" && (
              <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Title */}
                  <div className="text-center max-w-2xl mx-auto mb-16">
                    <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase bg-brand-gold/10 px-3.5 py-1.5 rounded-full">
                      Canales Oficiales
                    </span>
                    <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-green-dark mt-4 tracking-tight">
                      Atención Personalizada B2B
                    </h2>
                    <p className="text-neutral-600 mt-4 font-light text-sm sm:text-base">
                      Registra las necesidades de tu establecimiento culinario para asignar un asesor logístico certificado.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
                    {/* Contact Form Container */}
                    <div className="lg:col-span-7 bg-brand-gold-light/40 border border-brand-gold/20 rounded-3xl p-6 sm:p-10 flex flex-col justify-between">
                      <div className="space-y-6">
                        <div className="flex items-center space-x-3 text-brand-green-dark">
                          <ClipboardCheck className="h-5 w-5 text-brand-gold-dark" />
                          <h3 className="font-serif text-xl font-bold">Solicitud de Registro Comercial</h3>
                        </div>

                        {contactSubmitted ? (
                          <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-6 rounded-2xl text-center space-y-3 animate-fade-in">
                            <h4 className="font-bold text-base">¡Registro Enviado con Éxito!</h4>
                            <p className="text-xs font-light">
                              Su ejecutivo de cuenta INTERA ha sido asignado. Le contactaremos en un plazo máximo de 2 horas hábiles para coordinar el envío de su catálogo físico y kit de muestras.
                            </p>
                          </div>
                        ) : (
                          <form onSubmit={handleContactSubmit} className="space-y-4 text-left">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">Nombre Completo *</label>
                                <input
                                  type="text"
                                  required
                                  value={contactForm.name}
                                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                  placeholder="Ej. Chef Andrea Rosales"
                                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary bg-white text-sm outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">Restaurante / Grupo *</label>
                                <input
                                  type="text"
                                  required
                                  value={contactForm.restaurant}
                                  onChange={(e) => setContactForm({ ...contactForm, restaurant: e.target.value })}
                                  placeholder="Ej. Restaurante Miso"
                                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary bg-white text-sm outline-none"
                                />
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">Cargo del Contacto</label>
                                <select
                                  value={contactForm.role}
                                  onChange={(e) => setContactForm({ ...contactForm, role: e.target.value })}
                                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary bg-white text-sm outline-none"
                                >
                                  <option value="Chef Ejecutivo">Chef Ejecutivo / Cocina</option>
                                  <option value="Gerente de Compras">Gerente de Compras / Supply Chain</option>
                                  <option value="Propietario">Socio / Propietario</option>
                                  <option value="Otro">Otro</option>
                                </select>
                              </div>
                              <div className="space-y-1">
                                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">Celular WhatsApp *</label>
                                <input
                                  type="tel"
                                  required
                                  value={contactForm.phone}
                                  onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                                  placeholder="Ej. +57 312 345 6789"
                                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary bg-white text-sm outline-none"
                                />
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">Email Corporativo *</label>
                              <input
                                type="email"
                                required
                                value={contactForm.email}
                                onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                placeholder="andrea@grupomiso.com"
                                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary bg-white text-sm outline-none"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-600">Insumos de interés y volumen estimado</label>
                              <textarea
                                rows={3}
                                value={contactForm.message}
                                onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                placeholder="Ej. Solicitamos información de arroz Koshihikari Premium. Consumo estimado de 15 sacos mensuales..."
                                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary bg-white text-sm outline-none resize-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="w-full bg-brand-green-primary hover:bg-brand-green-dark text-white hover:text-brand-gold font-semibold py-4 px-6 rounded-xl text-sm transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-brand-green-primary/15 flex items-center justify-center space-x-2 cursor-pointer"
                              style={{ minHeight: "48px" }}
                            >
                              <span>Registrar y Solicitar Muestras</span>
                              <ClipboardCheck className="h-4 w-4" />
                            </button>
                          </form>
                        )}
                      </div>
                    </div>

                    {/* Technical logistics specifications */}
                    <div className="lg:col-span-5 bg-brand-green-dark text-white rounded-3xl p-6 sm:p-10 flex flex-col justify-between">
                      <div className="space-y-8">
                        <div className="space-y-2 text-left">
                          <span className="text-[10px] font-mono tracking-wider font-bold text-brand-gold uppercase">Garantías INTERA</span>
                          <h3 className="font-serif text-2xl font-bold text-white">Directrices Logísticas</h3>
                          <p className="text-xs text-neutral-300 font-light leading-relaxed">
                            Mantenemos un compromiso absoluto de cumplimiento B2B. Sus despachos están asegurados bajo contrato comercial.
                          </p>
                        </div>

                        <div className="space-y-6 text-left">
                          <div className="flex items-start space-x-4">
                            <div className="bg-white/5 p-2.5 rounded-xl text-brand-gold mt-1 shrink-0">
                              <Calendar className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">Programación Flexible</h4>
                              <p className="text-xs text-neutral-400 font-light mt-0.5">Entregas programadas de lunes a sábado de 06:00 AM a 12:00 PM.</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4">
                            <div className="bg-white/5 p-2.5 rounded-xl text-brand-gold mt-1 shrink-0">
                              <Clock className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">Cumplimiento Horario</h4>
                              <p className="text-xs text-neutral-400 font-light mt-0.5">Margen de tolerancia máximo de 15 minutos en andén de descarga.</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-4">
                            <div className="bg-white/5 p-2.5 rounded-xl text-brand-gold mt-1 shrink-0">
                              <MapPin className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-sm font-semibold text-white">Cobertura Geográfica</h4>
                              <p className="text-xs text-neutral-400 font-light mt-0.5">Envíos directos a Ibagué, Tolima y principales destinos del país.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/10 mt-8 space-y-4">
                        <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-center">
                          <span className="text-[10px] font-mono text-neutral-400 block uppercase tracking-wider">Atención WhatsApp 24/7 de Guardia</span>
                          <a href="tel:+573123456789" className="text-brand-gold hover:text-white transition-colors font-mono font-bold text-base mt-1 block">
                            +57 312 345 6789
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Contact Grid with activeTab support to let links change active tab state */}
      <Footer setActiveTab={setActiveTab} />

      {/* Interactive Quoting / WhatsApp Modal */}
      <QuoteModal
        product={selectedProduct}
        isOpen={isQuoteModalOpen}
        onClose={handleCloseQuoteModal}
      />
    </div>
  );
}
