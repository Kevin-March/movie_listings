# 🎬 Movie Listings App

Este proyecto es una aplicación web desarrollada como prueba tecnica para la empresa TDP

## Tecnologías utilizadas

- **Next.js 14+** (App Router)
- **React**
- **TypeScript**
- **Tailwind CSS**
- **DaisyUI**
- **Lucide Icons**
- **Fetch API / Services layer**

## Requisitos previos

- **Node.js** (versión 18 o superior)
- **npm** / **yarn** / **pnpm** / **bun**

## ▶️ Instrucciones para correr el proyecto

1. Clonar el repositorio:

```bash
git clone https://github.com/Kevin-March/movie_listings.git
cd movie_listings
```

2.Instalar dependencias:

```bash
npm install
```

3- Ejecutar en modo desarollo:

```bash
npm run dev
```

4- Abrir el navegador en:

http://localhost:3000 //default

### Si se quiere correr como produccion

1- generamos el build de produccion:

```bash
npm run build
```

2- corremos localmente:

```bash
npm start
```

## Credenciales de prueba:

Usuario: emilys
Contraseña: emilyspass

## 🧠 Decisiones técnicas

### 📌 Elección del framework

Se decidió utilizar la **última versión estable de Next.js** con App Router como un desafío personal, con el objetivo de adaptarse a los nuevos paradigmas del framework (Server Components, layouts, routing basado en archivos y separación entre componentes de cliente y servidor).  
Esta elección permitió profundizar en las buenas prácticas actuales recomendadas por el ecosistema de Next.js.

### 📌 Manejo de autenticación

La autenticación se implementó mediante un **AuthContext**, siguiendo un enfoque profesional y escalable para el manejo del estado global de autenticación.

Este contexto centraliza:

- El estado del usuario autenticado
- El manejo de tokens
- Las funciones de login y logout
- La verificación de sesión activa

El uso de un contexto dedicado permite:

- Evitar el prop drilling
- Mantener una arquitectura limpia
- Facilitar la reutilización y el mantenimiento del código
- Alinear el proyecto con patrones comúnmente utilizados en aplicaciones reales de producción

### 📌 Manejo de tokens

Los tokens de autenticación se almacenan en **cookies**, lo que permite su persistencia entre recargas y su uso para validar sesiones desde el cliente.  
El sistema verifica la existencia del token para proteger rutas y redirigir al usuario al login cuando corresponde.

### 📌 Manejo de estado

Para el estado local se utilizan los hooks nativos de React (`useState`, `useEffect`), manteniendo el estado lo más cercano posible a los componentes que lo consumen.  
No se utilizaron librerías externas de manejo de estado global (Redux, Zustand, etc.) debido al alcance del proyecto.

### 📌 UI y experiencia de usuario

El diseño de la interfaz y la forma de presentar las películas se inspiró en plataformas existentes como **IMDB** y **Netflix**, especialmente en la manera en que recomiendan y organizan el contenido visual dentro del home.

Por este motivo, la página principal prioriza:

- El contenido visual
- Tarjetas de películas
- Una disposición orientada a exploración y descubrimiento

Aunque el endpoint utilizado (`dummyjson`) no provee imágenes de portada para las películas, la decisión de incluir imágenes fue **intencional**.  
El objetivo fue mostrar cómo debería verse la aplicación desde una perspectiva real de producto, priorizando la experiencia de usuario por sobre una representación puramente textual de los datos.

En un escenario con un backend real, la intención sería implementar un feature propio para que estas películas cuenten con una imagen de portada, ya sea mediante almacenamiento interno o integración con un servicio externo.

## ✨ Features implementadas

### 👤 Gestión de cuenta de usuario

Se implementó la funcionalidad de **visualización y edición de la cuenta del usuario**.

Esta feature fue priorizada porque, tras más de **3 años de experiencia trabajando con React**, se considera una de las piezas más básicas pero a la vez más útiles en aplicaciones reales, ya que permite al usuario:

- Ver su información personal
- Editar sus datos
- Recibir feedback inmediato de los cambios realizados

Dado que el proyecto no cuenta con un backend real, los cambios realizados por el usuario se mantienen en el estado de la aplicación como un objeto persistente durante la sesión.  
La intención fue simular un comportamiento realista sin depender de infraestructura adicional.

La decisión de implementar esta feature por sobre otras (como light/dark mode) se basó en su **impacto funcional**, ya que aporta mayor valor desde el punto de vista del usuario y representa un caso de uso común en aplicaciones de producción.
