# Boletín Autoconvocado — Propuesta de sitio web

## Concepto

Sitio web de boletín político para un sindicato. Funciona como espacio de publicación de textos libres (notas periodísticas, políticas, de opinión, literarias, poemas, reseñas de canciones, etc.) escritos por miembros del sindicato, con un sistema de moderación por parte de una comisión de administración.

El rasgo distintivo del sitio es el sistema de **polémicas**: cualquier texto puede ser respondido por otro texto, generando hilos de debate público dentro del boletín.

---

## Casos de uso

1. Un miembro escribe un texto y lo envía al boletín.
2. La comisión de administración revisa el texto y lo aprueba o rechaza.
3. El texto aprobado se publica en el feed principal.
4. Otro miembro escribe un texto en respuesta → se genera una **polémica** (hilo).
5. Los lectores pueden navegar el feed general o explorar los hilos de debate.

---

## Stack tecnológico

| Rol | Tecnología |
|---|---|
| Framework | SvelteKit + `@sveltejs/adapter-static` |
| Markdown | MDsveX |
| Estilos | Tailwind CSS |
| Hosting | Netlify o Cloudflare Pages |
| Control de versiones | GitHub |
| Moderación (futuro) | Decap CMS (ex Netlify CMS) |

El sitio es **completamente estático**: se genera desde archivos markdown en build time. No hay base de datos ni backend. El repositorio Git actúa como backend de contenido.

---

## Estructura de archivos

```
src/
  content/
    drafts/          ← textos enviados, pendientes de aprobación
    posts/           ← textos aprobados y publicados
propuestas/          ← documentación interna del proyecto
```

---

## Esquema de un texto (frontmatter)

Cada texto es un archivo `.md` con el siguiente frontmatter:

```yaml
---
slug: "sobre-la-huelga-de-marzo"
title: "Sobre la huelga de marzo"
author: "Juan Pérez"
type: "opinion"           # opinion | nota | poema | cancion | literaria | otro
date_published: 2024-03-15
date_edited: 2024-03-16   # opcional
reply_to: null            # slug del texto al que responde, o null si es raíz
---

Cuerpo del texto en markdown...
```

El campo `reply_to` es el corazón del sistema de polémicas: enlaza un texto con otro y permite construir los hilos en build time.

---

## Páginas del sitio

### `/feed`
Feed principal. Muestra **todos los textos aprobados** ordenados por `date_published` (más reciente primero). Cada entrada muestra: título, autor, tipo, fecha, y si es una respuesta: a qué texto responde (con link).

### `/hilos`
Página de polémicas. Muestra únicamente los **textos raíz** (sin `reply_to`) que tienen al menos una respuesta, ordenados por actividad reciente. Cada entrada muestra cuántos textos generó el hilo. Al hacer click se navega a la vista del hilo.

### `/hilos/[slug]`
Vista de un hilo completo. Muestra el texto raíz y todos los textos que lo responden (y los que responden a esos), en orden cronológico anidado.

### `/textos/[slug]`
Vista individual de un texto. Muestra el texto completo y, si tiene respuestas, las lista debajo.

---

## Lógica de construcción de hilos

En build time, SvelteKit carga todos los posts y construye el árbol de relaciones a partir del campo `reply_to`:

```
texto-A (raíz)
  └── texto-B (reply_to: "texto-A")
        └── texto-C (reply_to: "texto-B")
  └── texto-D (reply_to: "texto-A")

texto-E (raíz, sin respuestas → no aparece en /hilos)
```

Un texto es raíz de hilo si `reply_to` es `null`.
Un texto aparece en `/hilos` si tiene al menos un descendiente directo o indirecto.

---

## Flujo de moderación (sin CMS, versión inicial)

1. El miembro envía su texto por email o canal interno.
2. La comisión crea el archivo `.md` en `drafts/` con los metadatos correctos.
3. La comisión revisa y, si aprueba, mueve el archivo a `posts/`.
4. El sitio se regenera automáticamente (Netlify/Cloudflare detecta el push).

### Flujo futuro con CMS (Decap CMS)
- Los miembros suben su texto desde una UI web sin tocar Git.
- La comisión tiene un panel de revisión protegido con autenticación GitHub/Netlify Identity.
- La aprobación mueve el archivo de `drafts/` a `posts/` vía GitHub API.
- El deploy se dispara automáticamente.

---

## Tipos de texto contemplados

- `nota` — nota periodística
- `opinion` — texto de opinión
- `literaria` — texto literario
- `poema` — poema
- `cancion` — reseña o reflexión sobre una canción
- `otro` — cualquier otro formato

---

## Lo que no está en el alcance inicial

- Comentarios en tiempo real (se puede agregar Giscus en el futuro, que usa GitHub Discussions)
- Sistema de usuarios/login para lectores
- Búsqueda full-text (se puede agregar con Pagefind, que corre en el cliente sin backend)
- RSS feed (trivial de agregar en SvelteKit)
- Notificaciones por email

---

## Referencias y proyectos similares consultados

- [`zineland/zine`](https://github.com/zineland/zine) — herramienta para revistas digitales desde markdown (Rust); referente conceptual más cercano.
- [`josh-collinsworth/sveltekit-blog-starter`](https://github.com/josh-collinsworth/sveltekit-blog-starter) — starter de SvelteKit + MDsveX más usado.
- [Ghost](https://ghost.org/) — plataforma open source de boletines con moderación; referente de producto, descartado por ser overkill.
- [Decap CMS](https://decapcms.org/) — CMS sin backend sobre Git; candidato para la fase de moderación.
