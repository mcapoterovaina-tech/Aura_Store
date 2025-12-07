# Aura Store - Premium App Marketplace

Aura Store es una Single Page Application (SPA) moderna, diseñada con un enfoque obsesivo en la estética, la tipografía y las micro-interacciones. Inspirada en los estándares de diseño más altos, esta aplicación simula un marketplace de aplicaciones funcional, minimalista y responsivo.

## 🚀 Tecnologías y Stack

*   **React 18+:** Interfaz de usuario basada en componentes.
*   **TypeScript:** Tipado estático para robustez.
*   **Tailwind CSS:** Diseño, Dark Mode y Animaciones.
*   **React Router Dom:** Enrutamiento SPA.

## 📂 Estructura del Proyecto

```
/
├── index.html                  # Punto de entrada HTML
├── index.tsx                   # Punto de entrada React
├── App.tsx                     # Componente raíz y enrutamiento
├── types.ts                    # Definiciones de tipos TypeScript globales
├── constants.ts                # Datos mock y constantes
├── metadata.json               # Configuración de permisos y metadatos
├── README.md                   # Documentación principal
│
├── components/                 # Componentes UI reutilizables
│   ├── AppCard.tsx             # Tarjeta de aplicación
│   ├── Button.tsx              # Botón polimórfico
│   ├── Carousel.tsx            # Lógica de carrusel genérico
│   ├── ErrorBoundary.tsx       # Manejo de errores de renderizado
│   ├── Footer.tsx              # Pie de página global
│   ├── Navbar.tsx              # Barra de navegación
│   ├── RequireAuth.tsx         # Guard de rutas protegidas
│   ├── SearchOverlay.tsx       # Buscador a pantalla completa
│   ├── SecurityFrameBuster.tsx # Protección contra Clickjacking
│   ├── Seo.tsx                 # Manejo de Meta tags y Router Shim
│   ├── ShareMenu.tsx           # Menú flotante de compartir
│   ├── Toast.tsx               # Sistema de notificaciones
│   │
│   ├── details/                # Componentes específicos de AppDetails
│   │   ├── AppHeader.tsx
│   │   ├── AppInfo.tsx
│   │   ├── AppScreenshots.tsx
│   │   └── AppStats.tsx
│   │
│   ├── home/                   # Componentes específicos de Home
│   │   ├── ArcadeSection.tsx
│   │   ├── Hero.tsx
│   │   ├── HomeCarousel.tsx
│   │   └── HomeRankedList.tsx
│   │
│   ├── news/                   # Componentes específicos de Noticias
│   │   ├── CommentSection.tsx
│   │   └── NewsCard.tsx
│   │
│   └── profile/                # Componentes específicos de Perfil/Auth
│       ├── GreetingCharacter.tsx
│       ├── LoginForm.tsx
│       ├── RegisterForm.tsx
│       └── UserProfile.tsx
│
├── pages/                      # Vistas principales (Rutas)
│   ├── AppDetails.tsx
│   ├── Arcade.tsx
│   ├── Cart.tsx
│   ├── CategoryPage.tsx
│   ├── CollectionPage.tsx
│   ├── Home.tsx
│   ├── LegalPage.tsx
│   ├── Notice.tsx
│   ├── Profile.tsx
│   ├── PurchasedHistory.tsx
│   ├── Settings.tsx
│   └── Subscriptions.tsx
│
├── hooks/                      # Lógica de estado extraída (Custom Hooks)
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useNotification.ts
│   └── useTheme.ts
│
├── services/                   # Capa de comunicación con API (Backend)
│   ├── api.ts                  # Orquestador de API
│   ├── auth.ts
│   ├── cart.ts
│   ├── catalog.ts
│   ├── categories.ts
│   ├── collections.ts
│   ├── config.ts               # Cliente HTTP seguro
│   ├── footer.ts
│   ├── news.ts
│   ├── tax.ts
│   └── [legal_services]...     # (privacy, terms, sales, etc.)
│
├── utils/                      # Utilidades puras
│   ├── catalogUtils.ts
│   ├── security.ts             # Sanitización HTML
│   └── shareUtils.ts
│
└── docs/                       # Documentación técnica
    ├── API_CONTRACT.md
    ├── FRONTEND_AUDIT.md
    └── MODULARIZATION_ROADMAP.md
```

## 📚 Documentación Técnica

Para mantener el proyecto organizado, la documentación técnica se ha dividido en los siguientes módulos:

### 🔌 [Contrato de API (Backend)](docs/API_CONTRACT.md)
Especificaciones técnicas detalladas de los endpoints JSON que el backend debe servir para alimentar el catálogo, las categorías, las noticias y las interacciones de usuario.

### 📋 [Auditoría y Tareas Pendientes](docs/FRONTEND_AUDIT.md)
Lista detallada paso a paso (Punch List) de las funcionalidades que faltan, enlaces rotos, lógica simulada y mejoras de seguridad necesarias para llevar la app al 100%.

---
*Developed with obsession for detail.*