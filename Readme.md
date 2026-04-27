# Generador de Paletas de Colores

Aplicacion web para crear paletas de colores de forma rapida. Permite generar colores aleatorios, bloquear los que te gusten y guardar combinaciones en el navegador.

# Instrucciones de uso 

## Funcionalidades

| Funcionalidad | Descripcion                                |
|---|---|
| Tamaño   | Elegi entre 6, 8 o 9 colores                    |
| Formato  | Visualiza los codigos en HEX o HSL              |
| Generar  | Crea una nueva paleta aleatoria                 |
| Bloquear | Fija colores para que no cambien al regenerar   |
| Copiar   | Clic sobre el color para copiar su codigo HEX   |
| Guardar  | Almacena paletas en el navegador (localStorage) |
| Cargar   | Recupera una paleta guardada                    |
| Eliminar | Borra una paleta guardada                       |

## Instalacion y uso

1. Descarga el repositorio (Code -> Download ZIP).
2. Descomprime la carpeta.
3. Abre index.html en tu navegador.

Al iniciar, se genera una paleta automaticamente. Luego puedes:

- Cambiar la cantidad de colores
- Cambiar formato entre HEX y HSL
- Generar una nueva paleta
- Bloquear/desbloquear colores
- Guardar o recuperar paletas

## Despliegue

Disponible en GitHub Pages:
https://gerardodamacosta-ui.github.io/ProyectoM1_Gerardo-Acosta/

## Caracteristicas

- Paletas de 6, 8 o 9 colores
- Vista de valores en HEX o HSL
- Bloqueo de colores para mantenerlos al regenerar
- Copia de color al portapapeles (siempre en HEX)
- Guardado, carga y eliminacion de paletas con localStorage
- Limite de 8 paletas guardadas (se conservan las mas recientes)

## Decisiones tecnicas

- JavaScript vanilla (sin frameworks) para mantener el proyecto simple y liviano
- localStorage para persistencia sin backend
- Estructura separada en HTML, CSS y JS para facilitar mantenimiento

## Tecnologias

- HTML5
- CSS3 (Flexbox, Grid, media queries)
- JavaScript (ES6+)
- localStorage
- Clipboard API

## Posibles mejoras

- Exportar paletas en otros formatos (PNG, JSON o variables CSS)
- Permitir renombrar paletas guardadas
- Agregar atajos de teclado

[⬆️ Volver arriba](#generador-de-paletas-de-colores)