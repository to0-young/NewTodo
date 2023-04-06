# Використовуємо офіційний образ node
FROM node:18.13.0

# Встановлюємо директорію робочої області в /NewTodo
WORKDIR /NewTodo

# Копіюємо файли проекту package.json  в директорію робочої області
COPY package.json .
COPY package-lock.json .

# Перевіряемл та встановлюємо всі пакети, вказані в  package.json
RUN  npm install


COPY . .

# Відкриваємо порт 3000 для з'єднань ззовні
EXPOSE 3001


# Команда, яка буде виконуватись при запуску контейнера
CMD ["npm", "start"]
