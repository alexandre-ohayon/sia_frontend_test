# Étape 1 : Builder l'application avec Node.js
FROM node:18-alpine AS build

WORKDIR /app
COPY package.json package-lock.json ./

# Supprime les caches npm et node_modules
RUN rm -rf node_modules package-lock.json && npm cache clean --force

# Réinstalle tout proprement
RUN npm install --frozen-lockfile
COPY . .

# Assurer que TypeScript est bien installé avant le build
RUN npm install --save-dev typescript @types/node && \
    npx tsc && npm run build

# Étape 2 : Serveur Nginx pour servir l'application
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
