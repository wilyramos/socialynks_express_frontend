**# 📌 Frontend - SocialLynks Todos tus enlaces en un solo lugar**

**#Demo**: [https://socialynks.vercel.app/](https://socialynks.vercel.app/)

Este es el frontend de la aplicación de gestión de enlaces de redes sociales, SocialLynks. Permite a los usuarios crear una página personalizada con todos sus enlaces importantes, facilitando el acceso a su contenido en diversas plataformas.

##  Dependencias Utilizadas

* **React:** Biblioteca de JavaScript para construir interfaces de usuario.
* **React Router DOM:** Para la navegación entre las diferentes páginas de la aplicación.
* **Axios:** Cliente HTTP basado en promesas para realizar solicitudes al backend.
* **@tanstack/react-query:** Para la gestión de datos asíncronos y caché.
* **react-hook-form:** Para el manejo de formularios de manera eficiente.
* **react-slugify:** Para generar slugs (URLs amigables) a partir de cadenas de texto.
* **react-spinners:** Para mostrar indicadores de carga.
* **sonner:** Para mostrar notificaciones.
* **@dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities:** Para la funcionalidad de arrastrar y soltar (drag and drop).
  
## ️ 🛠 Instalación y Configuración
Clona el repositorio:
   ```
git clone https://github.com/wilyramos/socialynks_express_frontend.git
cd frontend
npm install
npm run dev
```
Configura el .env
```
VITE_BACKEND_URL=http://localhost:4000
```


## ✅ Scripts Disponibles

* `npm run dev`: Inicia el servidor de desarrollo.
* `npm run build`: Construye la aplicación para producción.
* `npm run preview`: Previsualiza la construcción de producción localmente.

##  Contribución

¡Las contribuciones son bienvenidas! Si encuentras errores o tienes ideas para mejorar la aplicación, por favor abre un issue o envía un pull request.

---

Este proyecto está bajo la licencia MIT. Puedes usarlo y modificarlo libremente.
