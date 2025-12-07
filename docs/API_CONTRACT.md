
# 🔌 API Integration (Backend Contract)

El frontend está configurado para consumir los siguientes endpoints. El backend debe cumplir estrictamente con este contrato JSON.

## 1. Catálogo de Apps
**Endpoint:** `GET /api/catalogo`

Devuelve el listado completo de aplicaciones.

```json
[
  {
    "id": "unique-id-1",
    "name": "Nombre App",
    "tagline": "Descripción corta",
    "description": "Descripción larga...",
    "category": "Productivity",
    "price": 0,
    "currency": "USD",
    "rating": 4.8,
    "reviewsCount": 120,
    "iconUrl": "url_imagen",
    "screenshots": ["url_1", "url_2"],
    "developer": "Dev Name",
    "size": "45 MB",
    "version": "1.0.0",
    "ageRating": "4+",
    "platforms": ["Android", "Web"],
    "releaseDate": "2024-01-01",
    "downloadUrl": "https://..."
  }
]
```

## 2. Categorías
**Endpoint:** `GET /api/categories`

Se utiliza para renderizar el carrusel horizontal de categorías en el Home.

```json
[
  { "id": "prod", "name": "Productivity", "image": "https://domain.com/img1.jpg" },
  { "id": "games", "name": "Games", "image": "https://domain.com/img2.jpg" }
]
```

## 3. Colecciones (Home Sections)
**Endpoint:** `GET /api/collections`

Define dinámicamente qué bloques aparecen en el Home (Featured, Rankings, etc).

```json
[
  { "id": "featured", "title": "Featured Apps", "type": "carousel" },
  { "id": "top-free", "title": "Top Free Apps", "type": "list" },
  { "id": "top-paid", "title": "Top Paid Apps", "type": "list" }
]
```

## 4. Noticias (Notice Feed)
**Endpoint:** `GET /api/news`

Alimenta la sección de "Notice" con artículos y novedades.

```json
[
  {
    "id": "news-1",
    "title": "Título",
    "excerpt": "Resumen...",
    "category": "Update",
    "imageUrl": "url_img",
    "date": "Today",
    "readTime": "4 min",
    "likes": 120,
    "commentsCount": 5
  }
]
```

## 5. Footer (Sitemap Columns)
**Endpoint:** `GET /api/footer`

Define las columnas de enlaces en el pie de página. Ahora incluye URLs.

```json
[
  {
    "id": "shop",
    "title": "Shop and Learn",
    "links": [
      { "label": "Store", "url": "/" },
      { "label": "Arcade", "url": "/arcade" }
    ]
  },
  {
    "id": "services",
    "title": "Services",
    "links": [
      { "label": "Aura Music", "url": "#" }
    ]
  }
]
```

## 6. Páginas Dinámicas (Legal & Sitemap)
**Endpoint:** `GET /api/pages/:slug`

Sirve el contenido para páginas estáticas como Privacy, Terms, Legal, Sitemap.
El parámetro `slug` puede ser: `privacy`, `terms`, `sales`, `legal`, `sitemap`.

```json
{
  "id": "privacy",
  "title": "Privacy Policy",
  "lastUpdated": "October 2024",
  "sections": [
    {
      "heading": "Introduction",
      "content": "At Aura Store, your privacy is paramount...",
      "imageUrl": "optional-url",
      "videoUrl": "optional-url"
    },
    {
      "heading": "Data Collection",
      "content": "We collect minimal data..."
    }
  ]
}
```

## 7. Interacciones (POST)

### Dar Like a una noticia
**Endpoint:** `POST /api/news/:id/like`

**Payload:**
```json
{ 
  "likedBy": "user-unique-id", 
  "value": 1 
}
```

### Comentar una noticia
**Endpoint:** `POST /api/news/:id/comment`

**Payload:**
```json
{ 
  "commentedBy": "user-unique-id", 
  "totalComments": 10, 
  "clientCommentsContent": [
    { 
      "text": "Contenido del comentario", 
      "timestamp": "ISO Date or String" 
    }
  ] 
}
```