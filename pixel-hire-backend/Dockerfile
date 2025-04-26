# 1. Use official Node.js (like installing Node inside your box)
FROM node:18

# 2. Set the working directory inside the box to /app
WORKDIR /app

# 3. Copy package.json and package-lock.json into the box
COPY package*.json ./

# 4. Install dependencies (just like npm install)
RUN npm install

# 5. Copy the rest of your app’s files into the box
COPY . .

# 6. Open the port your app listens on
EXPOSE 5000

# 7. Command to start your backend
CMD ["npm", "start"]
