import { Product, Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "sushi",
    name: "Arroz y Granos Especiales",
    description: "Granos con molienda y pulido de precisión para platos que requieren consistencia óptima.",
    icon: "Wheat",
  },
  {
    id: "coffee",
    name: "Café de Especialidad",
    description: "Granos de altura cultivados bajo sombra, tostados a la medida para cafeterías exigentes.",
    icon: "Coffee",
  },
];

export const PRODUCTS: Product[] = [
  {
    id: "arroz-sushi-premium",
    name: "Arroz para Sushi Koshihikari Premium",
    category: "sushi",
    description: "Arroz de grano corto pulido al grado ideal. Su excelente contenido de almidón asegura la textura pegajosa, brillante y firme que requiere el sushi de nivel profesional.",
    benefits: [
      "Grano corto seleccionado con 99% de homogeneidad.",
      "Excelente absorción del aderezo de vinagre (Su).",
      "Brillo natural perlado al cocinarse.",
      "Consistencia óptima para moldear niguiris y rolls.",
    ],
    image: "/src/assets/images/sushi_rice_1784079930526.jpg",
    origin: "Tolima",
    packaging: "Saco de polipropileno laminado de 25 kg",
    minOrder: "1 Saco (25 kg)",
    isAvailable: true,
  },
  {
    id: "cafe-especialidad-placeholder",
    name: "Café de Especialidad Bourbon Rojo",
    category: "coffee",
    description: "Granos cultivados a 1,600 msnm con notas complejas de frutos rojos, chocolate belga y acidez cítrica brillante. Tueste medio óptimo para espresso y filtrados.",
    benefits: [
      "Puntaje de taza SCA +86.",
      "Proceso de beneficio lavado y secado en camas africanas.",
      "Tueste semanal bajo demanda para máxima frescura.",
    ],
    image: "/src/assets/images/specialty_coffee_1784079941158.jpg",
    origin: "Fincas de Altura (Próximamente)",
    packaging: "Bolsa aluminizada con válvula desgasificadora de 5 kg",
    minOrder: "10 kg",
    isAvailable: false,
  },
];
