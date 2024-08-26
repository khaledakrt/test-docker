# Step 1: Build the Angular application
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Step 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Remove the default Nginx index.html
RUN rm /usr/share/nginx/html/index.html

# Copy the Angular build output to the Nginx HTML directory
COPY --from=build /app/dist/front/browser /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
