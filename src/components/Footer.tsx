import { Wheat, Phone, Mail, MapPin, Clock, Instagram, Linkedin, Send } from "lucide-react";

interface FooterProps {
  setActiveTab?: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleTabChange = (tabId: string) => {
    if (setActiveTab) {
      setActiveTab(tabId);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer id="contacto" className="bg-neutral-dark text-neutral-300 pt-20 pb-10 border-t border-brand-green-primary relative">
      {/* Subtle overlay accent */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-brand-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-neutral-800">
          
          {/* Col 1: Brand Intro */}
          <div className="space-y-6">
            <button
              onClick={() => handleTabChange("inicio")}
              className="flex items-center space-x-3 group text-left cursor-pointer"
            >
              <div className="bg-brand-green-primary text-brand-gold p-2 rounded-lg">
                <Wheat className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-tight text-white">
                  INTERA
                </span>
                <span className="text-[9px] font-mono tracking-[0.1em] text-brand-gold uppercase font-semibold">
                  Conexión Gastronómica
                </span>
              </div>
            </button>
            <p className="text-sm text-neutral-400 font-light leading-relaxed">
              Abasteciendo la excelencia culinaria de los mejores restaurantes. Importación directa y logística controlada de materias primas gourmet.
            </p>
            {/* Social icons */}
            <div className="flex items-center space-x-4 pt-2">
              <a 
                href="#instagram" 
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-brand-green-primary hover:text-brand-gold transition-colors flex items-center justify-center border border-neutral-700 hover:border-brand-gold/30"
                style={{ minWidth: "40px" }}
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#linkedin" 
                className="w-10 h-10 rounded-full bg-neutral-800 hover:bg-brand-green-primary hover:text-brand-gold transition-colors flex items-center justify-center border border-neutral-700 hover:border-brand-gold/30"
                style={{ minWidth: "40px" }}
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation links */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold tracking-wider text-brand-gold uppercase">
              Enlaces de Navegación
            </h4>
            <ul className="space-y-3.5 text-sm">
              <li>
                <button
                  onClick={() => handleTabChange("inicio")}
                  className="text-neutral-400 hover:text-brand-gold transition-colors block py-1 text-left cursor-pointer"
                >
                  Inicio / Portada
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange("productos")}
                  className="text-neutral-400 hover:text-brand-gold transition-colors block py-1 text-left cursor-pointer"
                >
                  Catálogo de Insumos
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange("nosotros")}
                  className="text-neutral-400 hover:text-brand-gold transition-colors block py-1 text-left cursor-pointer"
                >
                  Nuestra Filosofía
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleTabChange("contacto")}
                  className="text-neutral-400 hover:text-brand-gold transition-colors block py-1 text-left cursor-pointer"
                >
                  Contacto Comercial
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact details */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold tracking-wider text-brand-gold uppercase">
              Atención Comercial B2B
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-neutral-400">
                <Phone className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-neutral-300">Línea Directa WhatsApp:</span>
                  <a href="tel:+525512345678" className="hover:text-brand-gold transition-colors text-xs font-mono">
                    +52 55 1234 5678
                  </a>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-neutral-400">
                <Mail className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-neutral-300">Ventas Corporativas:</span>
                  <a href="mailto:pedidos@interainsumos.com" className="hover:text-brand-gold transition-colors text-xs font-mono">
                    pedidos@interainsumos.com
                  </a>
                </div>
              </li>
            </ul>
          </div>

          {/* Col 4: Logistics info */}
          <div className="space-y-6">
            <h4 className="text-xs font-mono font-bold tracking-wider text-brand-gold uppercase">
              Logística & Distribución
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3 text-neutral-400">
                <MapPin className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-neutral-300">Centro de Distribución:</span>
                  <span className="text-neutral-400 text-xs">
                    Calle 141 No 10 78, La Ceiba, Ibagué, Tolima.
                  </span>
                </div>
              </li>
              <li className="flex items-start space-x-3 text-neutral-400">
                <Clock className="h-5 w-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <span className="block font-medium text-neutral-300">Horario de Recepción:</span>
                  <span className="text-neutral-400 text-xs">
                    Lunes a Viernes: 08:00 AM - 05:00 PM
                  </span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-8 text-xs text-neutral-500 font-mono">
          <p>© {currentYear} INTERA Conexión Gastronómica. Todos los derechos reservados.</p>
          <p className="mt-2 sm:mt-0 flex items-center space-x-1">
            <span>Suministro B2B de Alta Fidelidad</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
