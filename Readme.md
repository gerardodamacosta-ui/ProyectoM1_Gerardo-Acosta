# Instrucciones de uso - Generador de paletas de colores

## Acceso rápido

- [**Descripción**](#descripción)
- [**Tecnologías usadas**](#tecnologías-usadas)
- [**Cómo abrir la aplicación**](#cómo-abrir-la-aplicación)
- [**Estructura de la interfaz**](#estructura-de-la-interfaz)
- [**Funciones principales**](#funciones-principales)
- [**1. Elegir el tamaño de la paleta**](#1-elegir-el-tamaño-de-la-paleta)
- [**2. Cambiar el formato de visualización**](#2-cambiar-el-formato-de-visualización)
- [**3. Generar una nueva paleta**](#3-generar-una-nueva-paleta)
- [**4. Bloquear un color**](#4-bloquear-un-color)
- [**5. Copiar un color**](#5-copiar-un-color)
- [**6. Guardar una paleta**](#6-guardar-una-paleta)
- [**7. Cargar una paleta guardada**](#7-cargar-una-paleta-guardada)
- [**8. Eliminar una paleta guardada**](#8-eliminar-una-paleta-guardada)
- [**Notificaciones del sistema**](#notificaciones-del-sistema)
- [**Comportamiento del guardado**](#comportamiento-del-guardado)
- [**Recomendaciones de uso**](#recomendaciones-de-uso)
- [**Despliegue**](#despliegue)
- [**Producción**](#producción)
- [**Publicar cambios en GitHub Pages**](#publicar-cambios-en-github-pages)
- [**Decisiones técnicas**](#decisiones-técnicas)
- [**Mejoras futuras**](#mejoras-futuras)
- [**Resumen rápido**](#resumen-rápido)

## Descripción

Esta web permite crear paletas de colores aleatorias, bloquear colores que quieras conservar, copiar códigos de color y guardar tus combinaciones directamente en el navegador.

No requiere instalación de programas adicionales ni conexión con servidores externos. Toda la información guardada permanece en el navegador mediante localStorage.

## Tecnologías usadas

- HTML5 semántico
- CSS3 (Flexbox, Grid, variables CSS, media queries y animaciones)
- JavaScript (ES6+) con manipulación del DOM
- localStorage (guardado de paletas)
- Clipboard API (copia de códigos HEX)

## Cómo abrir la aplicación

1. Descargá el proyecto desde GitHub: hacé clic en el botón verde Code y luego en Download ZIP.
2. Descomprimí el archivo ZIP en la carpeta que quieras.
3. Entrá a la carpeta del proyecto descomprimido.
4. Abrí el archivo index.html en tu navegador.
5. Esperá a que cargue la interfaz principal. La aplicación generará automáticamente una paleta inicial.

## Estructura de la interfaz

La pantalla está dividida en tres áreas principales:

- Configuración: permite elegir la cantidad de colores y el formato principal de visualización.
- Paleta actual: muestra los colores generados y sus acciones disponibles.
- Paletas guardadas: lista las combinaciones almacenadas en este navegador.

## Funciones principales

### 1. Elegir el tamaño de la paleta

En la sección Configuración encontrarás el selector Tamaño de la paleta.

Opciones disponibles:

- 6 colores
- 8 colores
- 9 colores

Al cambiar esta opción, la paleta se ajusta automáticamente a la nueva cantidad.

### 2. Cambiar el formato de visualización

Puedes elegir entre dos botones:

- HEX
- HSL

El formato seleccionado se muestra como valor principal en cada tarjeta de color.

Importante:

- Aunque visualices HSL, al hacer clic sobre el código siempre se copia el valor HEX al portapapeles.

### 3. Generar una nueva paleta

Haz clic en el botón Generar paleta.

Resultado:

- Se crean colores aleatorios nuevos.
- Los colores bloqueados se mantienen sin cambios.
- Los colores no bloqueados se reemplazan por otros nuevos.

### 4. Bloquear un color

Cada tarjeta de color tiene un botón con icono de candado.

Uso:

1. Haz clic en el candado del color que quieras conservar.
2. El color quedará bloqueado.
3. Al generar una nueva paleta, ese color seguirá igual.

Si vuelves a hacer clic en el candado, el color se desbloquea.

### 5. Copiar un color

Cada tarjeta muestra un código de color clickable.

Para copiarlo:

1. Haz clic sobre el código visible del color.
2. La aplicación copiará el valor HEX al portapapeles.
3. Verás una notificación breve confirmando la acción.

### 6. Guardar una paleta

Haz clic en el botón Guardar paleta.

La aplicación:

- Guarda la paleta actual en el navegador.
- La agrega a la lista de Paletas guardadas.
- Conserva hasta 8 paletas guardadas.

Si guardas más de 8, se conservarán las más recientes.

### 7. Cargar una paleta guardada

En la sección Paletas guardadas, cada registro incluye un botón Cargar.

Al usarlo:

1. Se recupera esa combinación de colores.
2. La paleta actual se reemplaza por la seleccionada.
3. También se ajusta automáticamente la cantidad de colores.

Nota:

- Los colores cargados se restauran desbloqueados.

### 8. Eliminar una paleta guardada

Cada paleta guardada incluye un botón Eliminar.

Al hacer clic:

1. La paleta se borra de la lista.
2. También se elimina del localStorage del navegador.

## Notificaciones del sistema

La aplicación muestra mensajes breves para informar acciones como:

- Color bloqueado o desbloqueado
- Color copiado
- Paleta guardada
- Paleta recuperada
- Paleta eliminada

## Comportamiento del guardado

Las paletas se guardan solo en el navegador actual.

Esto significa que:

- Si abres la web en otro navegador, no verás las mismas paletas.
- Si limpias los datos del navegador, las paletas guardadas pueden perderse.
- Si vuelves a abrir la página en el mismo navegador, las paletas guardadas seguirán disponibles.

## Recomendaciones de uso

- Usa el bloqueo para conservar los colores que te gusten mientras sigues explorando opciones.
- Cambia entre HEX y HSL para trabajar con el formato que necesites.
- Guarda tus paletas favoritas antes de cerrar el navegador.
- Usa la copia rápida para llevar los colores a otros proyectos de diseño o desarrollo.

## Despliegue

Este proyecto es estático (HTML, CSS y JavaScript puro), por lo que no requiere build ni backend para publicarse.

### Producción

La aplicación está desplegada en GitHub Pages en la siguiente URL:

https://gerardodamacosta-ui.github.io/ProyectoM1_Gerardo-Acosta/

### Publicar cambios en GitHub Pages

1. Realiza tus cambios en el proyecto local.
2. Sube los cambios a tu repositorio en GitHub (commit + push).
3. Verifica en GitHub que Pages esté configurado para publicar desde la rama y carpeta correctas.
4. Espera unos minutos y recarga la URL pública para ver la nueva versión.

## Decisiones técnicas

- Uso de JavaScript vanilla (sin frameworks): prioriza simplicidad, menor complejidad de setup y ejecución directa en navegador.
- Persistencia con localStorage: permite guardar paletas sin servidor y mantener los datos entre sesiones en el mismo navegador.
- Límite de 8 paletas guardadas: evita crecimiento indefinido en almacenamiento local y mantiene la lista de acceso rápida y ordenada.
- Copia en formato HEX aunque se visualice HSL: estandariza el valor copiado para su uso inmediato en herramientas de diseño y CSS.
- Estructura por carpetas (css/ y js/): separa responsabilidades y facilita mantenimiento básico del proyecto.

## Mejoras futuras

- Permitir exportar paletas en formatos adicionales (JSON, CSS variables o PNG).
- Agregar opción para renombrar paletas guardadas.
- Incorporar atajos de teclado para generar, bloquear y copiar colores.
- Mejorar accesibilidad (contraste, foco visible y etiquetas ARIA en controles).
- Añadir tests de lógica para generación de color y gestión de almacenamiento.
- Implementar importación y compartido de paletas mediante URL.

## Resumen rápido

Flujo de uso recomendado:

1. Elige 6, 8 o 9 colores.
2. Selecciona si quieres ver HEX o HSL.
3. Genera una paleta.
4. Bloquea los colores que quieras conservar.
5. Genera de nuevo hasta obtener la combinación ideal.
6. Copia los colores que necesites.
7. Guarda la paleta si quieres reutilizarla más tarde.

