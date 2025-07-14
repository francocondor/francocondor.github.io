# Modo Oscuro en el Portafolio

Este portafolio soporta modo claro y oscuro usando Tailwind CSS v4, configurado de forma inline en `src/input.css`.

## ¿Cómo funciona?

- El modo oscuro se activa automáticamente según la preferencia del sistema operativo (media query `prefers-color-scheme`).
- Puedes alternar manualmente el modo con el botón en la esquina superior derecha (`#theme-toggle`).
- Tailwind v4 permite usar utilidades como `dark:bg-slate-900` o `dark:text-slate-100` para adaptar cualquier elemento.
- La configuración de colores y variantes está en `src/input.css` usando la directiva `@theme`.

## Ejemplo de configuración inline (input.css)

```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

@theme {
    --color-slate-50: #f8fafc;
    --color-slate-900: #0f172a;
    /* ...otros colores... */
}
```

## Buenas prácticas

- Usa siempre las variantes `dark:` en los elementos importantes.
- Prueba todos los componentes en ambos modos antes de publicar.
- Mantén buen contraste: texto claro sobre fondo oscuro y viceversa.
- Si agregas nuevos colores, hazlo en la sección `@theme` de `input.css`.

## Accesibilidad

- El contraste cumple con WCAG AA.
- Las transiciones de color son suaves (`transition-colors duration-300`).
- El modo se recuerda en localStorage si el usuario lo cambia manualmente.

## Referencia rápida de clases

| Elemento           | Claro              | Oscuro                  |
|--------------------|--------------------|-------------------------|
| Fondo principal    | `bg-slate-50`      | `dark:bg-slate-900`     |
| Cards              | `bg-white`         | `dark:bg-slate-800`     |
| Texto principal    | `text-slate-900`   | `dark:text-slate-100`   |
| Texto secundario   | `text-slate-600`   | `dark:text-slate-400`   |
| Bordes             | `border-slate-200` | `dark:border-slate-600` |
| Inputs             | `bg-white`         | `dark:bg-slate-700`     |

## Pruebas y soporte

- Compatible con Chrome, Firefox, Edge, Safari modernos.
- Puedes simular el modo oscuro en DevTools (Rendering > Emulate CSS prefers-color-scheme).

---

Desarrollado por Franco Condor.