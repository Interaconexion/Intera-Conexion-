import { useState } from "react";
import { Menu, X, Wheat } from "lucide-react";

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQuote: () => void;
}

export default function Header({ activeTab, setActiveTab, onOpenQuote }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const navItems = [
    { label: "Inicio", id: "inicio" },
    { label: "Productos", id: "productos" },
    { label: "Nosotros", id: "nosotros" },
    { label: "Contacto", id: "contacto" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-brand-green-light transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <button
            onClick={() => {
              setActiveTab("inicio");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-3 group text-left cursor-pointer"
            id="header-logo-link"
          >
            <div className="bg-brand-green-primary text-brand-gold p-2 rounded-lg transition-transform duration-300 group-hover:scale-105">
              <Wheat className="h-6 w-6" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-brand-green-dark">
                INTERA
              </span>
              <span className="text-[10px] font-mono tracking-[0.1em] text-brand-gold-dark uppercase font-semibold">
                Conexión Gastronómica
              </span>
            </div>
          </button>

          {/* Desktop Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-sm font-medium transition-all relative py-2 cursor-pointer ${
                  activeTab === item.id
                    ? "text-brand-green-primary font-semibold"
                    : "text-neutral-500 hover:text-brand-green-primary"
                }`}
                id={`nav-${item.id}`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-gold rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Call to Action Button */}
          <div className="hidden md:flex items-center">
            <button
              onClick={onOpenQuote}
              className="bg-brand-green-primary hover:bg-brand-green-dark text-white hover:text-brand-gold font-medium px-5 py-2.5 rounded-lg text-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand-green-primary/10 border border-transparent hover:border-brand-gold/30 cursor-pointer"
              id="cta-cotizar-header"
            >
              Cotizar Insumos
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-green-primary hover:bg-brand-green-light focus:outline-none transition-colors"
              aria-expanded={isOpen}
              id="mobile-menu-btn"
              style={{ minHeight: "44px", minWidth: "44px" }}
            >
              <span className="sr-only">Abrir menú</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-brand-green-light animate-fade-in">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 shadow-inner">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setIsOpen(false);
                  setActiveTab(item.id);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-full text-left block px-4 py-3 rounded-md text-base font-medium transition-colors cursor-pointer ${
                  activeTab === item.id
                    ? "bg-brand-green-light text-brand-green-primary font-bold border-l-4 border-brand-gold"
                    : "text-neutral-700 hover:bg-brand-green-light hover:text-brand-green-primary"
                }`}
                style={{ minHeight: "44px" }}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 pb-2 px-4">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenQuote();
                }}
                className="w-full bg-brand-green-primary hover:bg-brand-green-dark text-white text-center font-medium py-3 px-4 rounded-lg block text-sm transition-colors cursor-pointer"
                style={{ minHeight: "44px" }}
                id="cta-cotizar-mobile"
              >
                Cotizar Insumos
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
