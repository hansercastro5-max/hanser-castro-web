# Hanser Castro — Web • Automation • 3D

Página web estática, responsive y lista para publicar.

## Incluye

- Diseño premium oscuro.
- Animación 3D con Three.js.
- Navegación responsive.
- Menú móvil.
- Animaciones al hacer scroll.
- Servicios.
- Automatizaciones.
- Portafolio.
- Sección sobre Hanser.
- Proceso de trabajo.
- Tecnologías.
- Formulario validado.
- Email mediante `mailto:`.
- Instagram configurado.
- WhatsApp preparado.
- SEO básico y Open Graph.
- Favicon.
- Soporte para `prefers-reduced-motion`.

## Ejecutar localmente

Como usa módulos ES y Three.js, no abras `index.html` directamente con `file://`.

Puedes usar VS Code + Live Server o cualquier servidor estático.

Ejemplo:

```bash
python -m http.server 5500
```

Después abre:

`http://localhost:5500`

## Configurar WhatsApp

Abre `config.js` y coloca tu número con código de país, sin `+`, espacios o guiones.

Ejemplo:

```js
whatsappNumber: "5939XXXXXXXX"
```

El enlace se generará automáticamente.

## Formulario

Por defecto, el formulario valida los datos y abre el cliente de correo del visitante con el mensaje preparado.

Para recibir formularios automáticamente sin depender del correo del visitante, conecta Formspree, Resend, Supabase o un backend propio en `script.js`.

No pongas claves secretas en el frontend.

## Publicar en Vercel

1. Sube esta carpeta a GitHub.
2. Entra a Vercel.
3. Importa el repositorio.
4. Framework: `Other` / sitio estático.
5. No necesitas comando de build.
6. Publica.

También funciona en Netlify y Cloudflare Pages.

## Estructura

```text
hanser-castro-digital/
├── index.html
├── style.css
├── script.js
├── config.js
├── README.md
└── assets/
    └── favicon.svg
```
