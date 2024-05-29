# Trucks

Simple CRUD (adding, filtering, updating, deleting) app for trucks. Functionality includes also pagination and very basic new truck data validation.

Installation

* git clone https://github.com/maciekkand/nuxt3trucks_db
* cd [repo]
* npm install
* node server.js

* git clone https://github.com/maciekkand/nuxt3trucks
* cd [repo]
* npm install
* npm run dev

* browser:  http://localhost:3000/


# Notes

1. **Pinia**
   Pinia has better DX than Vuex, due to lack of mutations and individual stores by default. It is also recommended for Vue 3 by Vue core team
2. **Tailwind**
   I write much faster in it than in (s)css. Moreover, it's faster both during development (jit compiler) and in the resulting application (dead code elimination).
3. **Layout and responsiveness**
   GridCSS and Flexbox.
4. **Node version**
   20.10
5. **Lack of semicolons**
   For aesthetic reasons :)
