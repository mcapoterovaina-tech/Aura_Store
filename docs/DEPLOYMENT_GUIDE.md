# Guía de Despliegue (Backend en Render, Frontend Externo)

Esta guía detalla los pasos para desplegar tu aplicación `Aura_Store` separando el Backend (Render) del Frontend.

## 1. Backend y Base de Datos (Render.com)

Tu archivo `render.yaml` ya está configurado para crear:
1.  **Servicio Web**: `aura-store-backend` (Node.js)
2.  **Base de Datos**: `aura-store-db` (PostgreSQL)

### Pasos:
1.  Sube tus cambios a GitHub (`git add .`, `git commit`, `git push`).
2.  Ve a [Render Dashboard](https://dashboard.render.com/).
3.  Selecciona **New +** -> **Blueprint Instance**.
4.  Conecta tu repositorio `Aura_Store`.
5.  Render detectará automáticamente el `render.yaml` y creará los servicios.

## 2. Frontend (Vercel, Netlify, etc.)

Despliega tu carpeta raíz (o la carpeta del frontend si decides separarla más adelante) en tu proveedor favorito.
Asegúrate de configurar las variables de entorno en el Frontend para que apunten a tu nuevo Backend en Render.

## 3. Conexión Final (CORS)

Una vez que tengas la URL de tu frontend (ej: `https://mi-tienda-aura.vercel.app`), debes "autorizarla" en tu backend para evitar errores de CORS.

1.  Ve al Dashboard de Render -> `aura-store-backend`.
2.  Ve a la pestaña **Environment**.
3.  Añade una nueva variable de entorno:
    *   **Key**: `CORS_ORIGIN`
    *   **Value**: `https://mi-tienda-aura.vercel.app` (La URL real de tu frontend).
4.  Render redeplegará el backend automáticamente.

¡Listo! Tu sistema distribuido estará funcionando.
