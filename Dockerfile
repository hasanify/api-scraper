FROM zenika/alpine-chrome:with-node

LABEL fly_launch_runtime="Node.js"

WORKDIR /app
ENV NODE_ENV="production"
ENV PUPPETEER_EXECUTABLE_PATH='/usr/bin/chromium-browser'

COPY package*.json ./
RUN npm ci --include=dev

COPY . .
RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]
