import React, { useState, useEffect } from "react";
import { Product, QuoteRequest } from "../types";
import { X, Send, Check, Calculator, Copy, FileText, Smartphone } from "lucide-react";

interface QuoteModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuoteModal({ product, isOpen, onClose }: QuoteModalProps) {
  const [formData, setFormData] = useState({
    restaurantName: "",
    contactName: "",
    phone: "",
    email: "",
    quantity: 1,
    notes: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // Default price configuration for the estimator (visual premium pricing)
  const getPricing = () => {
    if (!product) return { pricePerUnit: 0, unitName: "Saco" };
    switch (product.id) {
      case "arroz-sushi-premium":
        return { pricePerUnit: 75.0, unitName: "Saco (25 kg)" }; // USD
      case "cafe-especialidad-placeholder":
        return { pricePerUnit: 140.0, unitName: "Bolsa (5 kg)" };
      case "insumos-gourmet-placeholder":
        return { pricePerUnit: 90.0, unitName: "Envase (2 kg)" };
      default:
        return { pricePerUnit: 50.0, unitName: "Unidad" };
    }
  };

  const { pricePerUnit, unitName } = getPricing();
  const subtotal = pricePerUnit * formData.quantity;
  const estimatedTax = subtotal * 0.16; // 16% IVA
  const total = subtotal + estimatedTax;

  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setCopied(false);
      setFormData((prev) => ({
        ...prev,
        quantity: 1,
      }));
    }
  }, [isOpen, product]);

  if (!isOpen || !product) return null;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "quantity" ? Math.max(1, parseInt(value) || 1) : value,
    }));
  };

  const getWhatsAppMessage = () => {
    const isPlaceholder = !product.isAvailable;
    const emojiHeader = "✨ *SOLICITUD DE COTIZACIÓN - INTERA CONEXIÓN GASTRONÓMICA* ✨\n\n";
    const body = `*Restaurante:* ${formData.restaurantName}
*Contacto:* ${formData.contactName}
*WhatsApp:* ${formData.phone}
*Email:* ${formData.email}

*Insumo:* ${product.name} ${isPlaceholder ? " (Interés en preventa)" : ""}
*Cantidad Solicitada:* ${formData.quantity} ${unitName}
${!isPlaceholder ? `*Estimación referencial:* $${total.toFixed(2)} USD (inc. IVA)` : "*Estatus:* Registro de preventa / muestras gratis"}

*Notas del Chef:* ${formData.notes || "Ninguna."}

_Solicitud generada a través de la plataforma de INTERA._`;

    return encodeURIComponent(body);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppRedirect = () => {
    const message = getWhatsAppMessage();
    // Default business contact phone (simulated)
    const phone = "573123456789"; // Representative business phone for Ibagué, Colombia
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    
    // Attempt redirect
    window.open(whatsappUrl, "_blank");
  };

  const handleCopyMessage = () => {
    const decodedMsg = decodeURIComponent(getWhatsAppMessage());
    navigator.clipboard.writeText(decodedMsg);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop overlay */}
      <div 
        className="fixed inset-0 bg-brand-green-dark/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal dialog positioning */}
      <div className="flex min-h-screen items-center justify-center p-4 text-center">
        <div className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl border border-brand-green-light animate-scale-up">
          
          {/* Header */}
          <div className="bg-brand-green-primary text-white px-6 py-5 flex justify-between items-center relative">
            <div className="flex items-center space-x-3">
              <div className="bg-brand-gold/15 p-2 rounded-lg text-brand-gold">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg sm:text-xl font-bold tracking-tight">
                  {product.isAvailable ? "Cotización de Insumos" : "Registro de Interés / Muestras"}
                </h3>
                <p className="text-xs text-brand-gold font-mono tracking-wider uppercase mt-0.5">
                  INTERA Premium B2B
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-white/75 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              style={{ minWidth: "40px", minHeight: "40px" }}
              id="close-modal-btn"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
              
              {/* Product Info Summary Box */}
              <div className="flex items-start space-x-4 p-4 rounded-2xl bg-brand-green-light/30 border border-brand-green-light/60">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover object-center border border-neutral-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="space-y-1">
                  <span className="text-[10px] font-mono tracking-wider font-bold text-brand-gold-dark uppercase">
                    Producto Seleccionado
                  </span>
                  <h4 className="font-serif text-base font-bold text-brand-green-dark">
                    {product.name}
                  </h4>
                  <p className="text-xs text-neutral-600 font-light">
                    {product.isAvailable 
                      ? `Orden mínima: ${product.minOrder} • Presentación: ${product.packaging}`
                      : `Categoría futura • Registro de pre-lanzamiento de muestras`}
                  </p>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Restaurant Name */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="restaurantName" className="block text-xs font-mono font-bold uppercase text-neutral-700 tracking-wider">
                    Nombre del Restaurante *
                  </label>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    required
                    value={formData.restaurantName}
                    onChange={handleInputChange}
                    placeholder="Ej. Osaka Sushi Bar"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary outline-none transition-colors text-sm bg-neutral-50/50"
                  />
                </div>

                {/* Contact Name */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="contactName" className="block text-xs font-mono font-bold uppercase text-neutral-700 tracking-wider">
                    Persona de Contacto / Chef *
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    required
                    value={formData.contactName}
                    onChange={handleInputChange}
                    placeholder="Ej. Chef Manuel Torres"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary outline-none transition-colors text-sm bg-neutral-50/50"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="phone" className="block text-xs font-mono font-bold uppercase text-neutral-700 tracking-wider">
                    Celular / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Ej. +57 312 345 6789"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary outline-none transition-colors text-sm bg-neutral-50/50"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="email" className="block text-xs font-mono font-bold uppercase text-neutral-700 tracking-wider">
                    Correo Corporativo *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="chef@restaurante.com"
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary outline-none transition-colors text-sm bg-neutral-50/50"
                  />
                </div>

                {/* Quantity */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="quantity" className="block text-xs font-mono font-bold uppercase text-neutral-700 tracking-wider flex justify-between">
                    <span>Cantidad a Cotizar *</span>
                    <span className="text-brand-gold-dark lowercase normal-case text-[10px]">Unidad: {unitName}</span>
                  </label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    required
                    min={1}
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary outline-none transition-colors text-sm bg-neutral-50/50 font-semibold"
                  />
                </div>

                {/* Extra Notes */}
                <div className="space-y-1.5 text-left sm:col-span-2">
                  <label htmlFor="notes" className="block text-xs font-mono font-bold uppercase text-neutral-700 tracking-wider">
                    Requerimientos Especiales / Horario de Entrega
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="Ej. Requerimos entrega en andén antes de las 11:00 AM con empaque palletizado..."
                    className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-green-primary focus:ring-1 focus:ring-brand-green-primary outline-none transition-colors text-sm bg-neutral-50/50 resize-none"
                  />
                </div>
              </div>

              {/* Dynamic Interactive Price Estimator (Only for active products) */}
              {product.isAvailable && (
                <div className="bg-brand-gold-light/60 rounded-2xl p-5 border border-brand-gold/30 space-y-3">
                  <div className="flex items-center space-x-2 text-brand-green-dark">
                    <Calculator className="h-4 w-4 text-brand-gold-dark" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase">
                      Estimador de Presupuesto INTERA B2B
                    </span>
                  </div>

                  <div className="space-y-1.5 text-sm font-light">
                    <div className="flex justify-between text-neutral-600 text-xs">
                      <span>Costo unitario ({unitName}):</span>
                      <span>${pricePerUnit.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 text-xs">
                      <span>Subtotal ({formData.quantity} unidades):</span>
                      <span>${subtotal.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-neutral-600 text-xs pb-1.5 border-b border-brand-gold/20">
                      <span>Impuestos estimados (16% IVA):</span>
                      <span>${estimatedTax.toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between text-brand-green-dark font-bold text-base pt-1">
                      <span>Costo Estimado Final:</span>
                      <span className="text-brand-green-primary">${total.toFixed(2)} USD</span>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-500 italic font-mono">
                    * El cálculo es referencial. Se confirmará precio final por volumen y frecuencia en la cotización oficial.
                  </p>
                </div>
              )}

              {/* Footer CTA */}
              <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row gap-3 sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-3 border border-neutral-300 hover:bg-neutral-50 text-neutral-600 rounded-xl text-sm font-medium transition-colors cursor-pointer"
                  style={{ minHeight: "44px" }}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-brand-green-primary hover:bg-brand-green-dark text-white hover:text-brand-gold font-semibold rounded-xl text-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg shadow-brand-green-primary/10 cursor-pointer"
                  style={{ minHeight: "44px" }}
                  id="submit-quote-btn"
                >
                  <Send className="h-4 w-4" />
                  <span>Procesar Cotización</span>
                </button>
              </div>

            </form>
          ) : (
            /* SUCCESS ANIMATION SCREEN */
            <div className="p-8 text-center space-y-6">
              <div className="mx-auto bg-emerald-100 text-emerald-800 p-5 rounded-full w-20 h-20 flex items-center justify-center border-4 border-emerald-50 animate-bounce">
                <Check className="h-10 w-10" />
              </div>

              <div className="space-y-2">
                <h4 className="font-serif text-2xl font-bold text-brand-green-dark">
                  ¡Solicitud Procesada Exitosamente!
                </h4>
                <p className="text-sm text-neutral-600 font-light max-w-md mx-auto">
                  Estimado Chef, hemos recopilado los datos técnicos de tu restaurante. Para agilizar la asignación de tu asesor comercial y programar el despacho de muestras, puedes enviar estos datos directo por WhatsApp o copiarlos.
                </p>
              </div>

              {/* Message Details Preview box */}
              <div className="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 text-left text-xs font-mono space-y-2 text-neutral-700 max-h-48 overflow-y-auto">
                <div className="text-neutral-400 border-b border-neutral-200 pb-1 flex justify-between items-center uppercase font-mono tracking-wider">
                  <span>Mensaje a enviar</span>
                  <span className="text-[10px] lowercase text-neutral-400">Listo para enviar</span>
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">
                  {decodeURIComponent(getWhatsAppMessage())}
                </p>
              </div>

              {/* Action grid */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <button
                  onClick={handleWhatsAppRedirect}
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shadow-lg shadow-[#25D366]/20 cursor-pointer"
                  style={{ minHeight: "44px" }}
                  id="send-whatsapp-btn"
                >
                  <Smartphone className="h-4 w-4" />
                  <span>Enviar por WhatsApp</span>
                </button>

                <button
                  onClick={handleCopyMessage}
                  className="bg-brand-green-light hover:bg-brand-green-primary hover:text-white text-brand-green-primary font-semibold py-3.5 px-6 rounded-xl text-sm transition-colors flex items-center justify-center space-x-2 border border-brand-green-light cursor-pointer"
                  style={{ minHeight: "44px" }}
                  id="copy-msg-btn"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
                  <span>{copied ? "¡Mensaje Copiado!" : "Copiar al Portapapeles"}</span>
                </button>

                <button
                  onClick={onClose}
                  className="bg-neutral-100 hover:bg-neutral-200 text-neutral-600 font-medium py-3.5 px-6 rounded-xl text-sm transition-colors cursor-pointer"
                  style={{ minHeight: "44px" }}
                >
                  Cerrar Ventana
                </button>
              </div>

              <p className="text-[10px] text-neutral-400 font-mono">
                INTERA • Conectando origen con alta cocina.
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
