# Documento de Orden & Riesgos

> Handoff operacional del sistema de medios, animaciones y rendimiento del proyecto.

## 1. Propósito

Proporcionar una referencia única para mantener calidad visual, rendimiento, accesibilidad y consistencia al escalar o modificar el sitio. Sirve como:

- Guía de incorporación para nuevos desarrolladores.
- Checklist previo a deploy.
- Registro de riesgos conocidos y mitigaciones.

## 2. Estructura y Convenciones

### 2.1 Organización de medios

- Todas las imágenes y videos residen en `src/assets/`.
- Manifest central: `src/lib/asset-manifest.ts` (arrays `imageAssets` y `videoAssets`).
- Placeholders (LQIP): `lqip-map.json` + cache incremental `.lqip-cache.json`.
- Métricas: `image-metrics.json` (width/height reales, inferencia de aspectRatio si no está declarado).

### 2.2 Convención de IDs

Formato sugerido: `<categoria>-<descriptor|-n>`

- Categorías válidas: `hero`, `plato`, `ambiente`, `bebida`, `proceso`, `experiencia`, `decorativo`.
- Evitar espacios, usar minúsculas, guiones simples.
- Mantener estabilidad del `id` (no renombrar salvo necesidad fuerte); es clave para cache y lookups.

### 2.3 Flujo para añadir nueva IMAGEN

1. Copiar archivo a `src/assets` (nombre legible y estable).
2. Importarlo dentro de `asset-manifest.ts` y añadir objeto al array `imageAssets` con: `id`, `category`, `src`, `alt` descriptivo, `aspectRatio` (opcional si dejaremos que se infiera) y tags si aplica.
3. Ejecutar: `npm run lqip` (genera LQIP + métricas + cache). Verificar logs `Generated` o `Cached`.
4. Confirmar que en runtime se ve placeholder blur y la imagen final sin CLS.
5. Commit: manifest + nuevos archivos + actualizaciones de `lqip-map.json`, `image-metrics.json` y `.lqip-cache.json`.

### 2.4 Flujo para reemplazar una IMAGEN existente

1. Sustituir archivo (mismo nombre) o añadir nuevo y actualizar manifest.
2. Ejecutar `npm run lqip` para regenerar LQIP (hash cambia → recalcula).
3. Revisar accesibilidad: alt sigue representando correctamente el contenido.
4. Revisar que no se introdujo un tamaño > límites recomendados (ver sección 5).

### 2.5 Flujo para añadir VIDEO

1. Colocar `.mp4` (idealmente comprimido H.264 progressive, <= 1.5MB si loop ambient) y poster `.jpeg` optimizado.
2. Importar en manifest y añadir a `videoAssets` (id, alt, poster, tags).
3. Usar `<AutoPlayVideo>` con heurística de visibilidad (ya integrada).
4. Test en mobile real: verificar que no auto-reproduce en conexiones muy lentas (prefers-reduced-motion + connection effectiveType heurística).

### 2.6 Alt Text (accesibilidad y SEO)

- Debe describir el contenido y/o función contextual (
  Ej: “Bandeja paisa gourmet reinterpretada con presentación moderna”).
- Evitar: “imagen de…”, “foto de…”, redundancias.
- Decorativos (puramente visuales) → no incluir en manifest, o alt vacío solo si el componente lo soporta; aquí preferimos que decorativos vengan marcados vía CSS/aria-hidden y mantengan alt semántico si se reutilizan.

### 2.7 Prioridad de carga

- `priority: true` sólo para hero y primer plato destacado.
- Preloads manuales limitados en `index.html` (no exceder 2–3 críticos para no competir con CSS).

### 2.8 Animaciones y micro‑interacciones

- Animaciones base con `framer-motion` centralizadas en wrappers (`ScrollReveal`, `StaggeredScrollReveal`, `AnimatedCard`).
- Respetar `prefers-reduced-motion`: no introducir animaciones no degradables sin fallback.
- Parallax controlado por hook, throttle incluido.

### 2.9 ResponsiveImage

- Usa `lqip` + `width/height` para estabilidad.
- `aspectRatio` puede declararse manualmente para evitar flash si width/height desconocidos (caso de imágenes externas futuras).

## 3. Riesgos y Impacto

| Riesgo                                              | Impacto                       | Señal                     | Probabilidad | Mitigación                                                          |
| --------------------------------------------------- | ----------------------------- | ------------------------- | ------------ | ------------------------------------------------------------------- |
| Imagen pesada en hero (>250KB)                      | LCP alto / SEO penalización   | Lighthouse LCP > 2.5s     | Media        | Comprimir a AVIF/JPEG progresivo; reducir resolución a viewport max |
| Video ambient grande (>1.5MB)                       | Buffering / CPU mobile        | Stutter, dropped frames   | Media        | Re-encode ~720p o 540p, bitrate ≤ 1Mbps                             |
| Falta de `npm run lqip` tras añadir imagen          | CLS / sin blur placeholder    | Imagen salta al cargar    | Media        | Checklist pre-commit; hook opcional                                 |
| Alt ausente o erróneo                               | Accesibilidad / SEO degradado | Axe / Lighthouse warnings | Baja         | Revisión PR obligatoria                                             |
| Cambiar hero sin actualizar og:image                | Share preview inconsistente   | Dif entre preview y real  | Media        | Actualizar meta OG en `index.html`                                  |
| Reutilizar ID diferente con contenido nuevo         | Cache LQIP inconsistente      | Placeholder no coincide   | Baja         | Mantener IDs estables o eliminar cache antes                        |
| Animaciones intensas en usuarios reduce-motion      | Experiencia negativa          | Feedback usuario          | Baja         | Gate con media query (ya implementado)                              |
| Demasiados preloads                                 | Bloqueo de otros recursos     | Coverage network saturado | Baja         | Limitar a 2–3                                                       |
| Imagen sin contraste suficiente en overlay          | Legibilidad pobre             | Texto difícil de leer     | Media        | Añadir overlay dinámico (futuro heurístico)                         |
| Sharp falla en CI                                   | Build roto                    | Script error              | Media        | Añadir fallback script o generar assets localmente                  |
| Dependencia de manual import para nuevas categorías | Olvido de clasificación       | Activos no usados         | Media        | Validación script futuro                                            |

## 4. Mitigaciones Específicas

- Peso: usar `sharp` manualmente (no implementado en pipeline productivo todavía) para producir variante AVIF/JPEG con target quality 60–70.
- Cache busting: si se reemplaza una imagen críticamente diferente, considerar cambiar `id` para forzar recompilación y evitar servir placeholder antiguo.
- Video: evaluar añadir atributo `preload="metadata"` (ya aplicado) y poster siempre optimizado (<50KB).
- Overlay adaptativo (futuro): script de análisis de luminancia promedio → aplicar clase `bg-gradient-to-t from-black/50` si brillo > umbral.
- Auditoría trimestral: correr Lighthouse + axe devtools y guardar resultados.

## 5. Reglas de Calidad Objetiva

| Tipo              | Límite recomendado      | Notas                                |
| ----------------- | ----------------------- | ------------------------------------ |
| Hero principal    | ≤ 250KB (ideal ≤ 180KB) | Usar compresión adicional si > 300KB |
| Card / Galería    | ≤ 140KB                 | Preferir < 120KB                     |
| Banner video loop | ≤ 1.5MB                 | Duración corta, bitrate bajo         |
| Poster video      | ≤ 60KB                  | Recortar resolución a frame visible  |
| LQIP              | < 1KB típicamente       | 24px ancho + blur                    |

## 6. Checklist Pre‑Merge (Copiable)

- [ ] Manifest actualizado con nuevos assets (id, category, alt correctos).
- [ ] `npm run lqip` ejecutado sin errores (revisar lqip-map y metrics cambiados).
- [ ] Hero y primer plato siguen marcados `priority` (sin abuso extra).
- [ ] Alt texts ≤ 125 caracteres y descriptivos.
- [ ] No se añadieron más de 3 preloads en `index.html`.
- [ ] Nuevos videos con poster válido y peso aceptable.
- [ ] Animaciones respetan reduce-motion.
- [ ] Lighthouse LCP < 2.5s / CLS < 0.1 en build local.

## 7. Backlog Futuro

- Generar variantes AVIF/WebP automáticas y seleccionar vía `<picture>`.
- Script heurístico de overlay según luminancia / contraste.
- Extracción de paleta dominante para theming dinámico.
- Validación automática (script) que revise: peso > thresholds, alt faltantes, categorías desconocidas.
- Integración a CMS (ej: headless) con pipeline build que regenere manifest.

## 8. Roles / Ownership (Sugerido)

| Área                 | Responsable   | Acción                                    |
| -------------------- | ------------- | ----------------------------------------- |
| Manifest / Assets    | Frontend      | Añadir/depurar entries                    |
| Performance métricas | Frontend Lead | Revisión trimestral                       |
| Accesibilidad        | QA / Frontend | Auditoría alt + contraste                 |
| Animaciones          | Frontend      | Mantener consistencia micro‑interacciones |
| Media Pipeline       | DevOps/FE     | Mejoras LQIP, formatos, CI                |

## 9. Procedimiento de Rollback

1. Revertir commit con cambios en manifest y assets.
2. Ejecutar `npm run lqip` para regenerar mapas si se alteraron.
3. Verificar en preview que no quedan referencias huérfanas.
4. Tag opcional si la regresión era crítica.

## 10. Notas Finales

El sistema actual prioriza claridad y baja fricción sobre automatización total. Cada futura automatización (varias listadas en backlog) debe preservar legibilidad del manifest y no introducir dependencias difíciles de mantener.

---

Última actualización: (rellenar fecha al modificar)
