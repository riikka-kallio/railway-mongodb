server
client (public dir)

liveserver
public: the root of the project

# Vanilla

public
   index.html

live-server.js

# Vite (process/ tool chain)

(DEV) src + public => public (index.html + react code)

toolchain server (npm run dev)

(PROD) npm run build =>  src + public (optimised) => dist

npm run preview (preview server)

# express

public
   index.html

server.js (app.use(express.static('public')))

# express & vite

(PROD) npm run build =>  src + public (optimised) => dist
   index.html

server.js (app.use(express.static('../client/dist')))


 - install (npm install)
 - build (npm run build - creates optimsed stuff)
 - serve (npm start) - shows us the product