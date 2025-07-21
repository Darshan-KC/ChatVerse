
# Chatverse – Real-Time Chat App with Laravel, Reverb, Echo, and Core JS

Chatverse is a real-time messaging application built using Laravel for the backend, Tailwind CSS for styling, and Core JavaScript with Laravel Echo and Reverb for real-time communication.

## 🔧 Technologies Used

- Laravel 11
- Laravel Reverb (WebSocket server)
- Laravel Echo
- Tailwind CSS
- Core JavaScript (No frontend frameworks)
- Breeze for Authentication

---

## 📁 Project Structure Overview

- `routes/web.php`: Web routes for chat views for fetching and storing messages
- `resources/views/chat.blade.php`: Frontend chat UI
- `resources/js/chat.js`: Handles chat interaction logic
- `resources/js/echo.js`: Echo setup for real-time listening
- `app/Models/Message.php`: Message model
- `app/Http/Controllers/MessageController.php`: Handles message fetch/store
- `app/Events/MessageSent.php`: Broadcast message event

---

## 🚀 Steps to Run

### 1. Clone and Install Dependencies

```bash
git clone https://github.com/Darshan-KC/chatverse.git
cd chatverse
composer install
npm install
cp .env.example .env
php artisan key:generate
```

### 2. Setup Database

```bash
php artisan migrate
```

### 3. Setup Reverb

```bash
php artisan reverb:install
```

### 4. Compile Assets

```bash
npm run dev
```

### 5. Serve App

```bash
php artisan serve
php artisan reverb:start
php artisan queue:work
```

Make sure your `.env` includes:

```env
VITE_REVERB_APP_KEY=your-key
VITE_REVERB_HOST=127.0.0.1
VITE_REVERB_PORT=6001
VITE_REVERB_SCHEME=http
```

---

## 💬 Features

- Real-time messaging with Laravel Reverb
- User-to-user direct chat
- Timestamps on messages
- Clean and responsive Tailwind UI
- Dynamic chat UI updates
- Message persistence in database

---

## Contributing
Contributions are welcome! If you have ideas for improvements or new features, feel free to fork the repository, make changes, and submit a pull request.

## 📄 License

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

This project is licensed under the [MIT License](LICENSE).  
You are free to use, modify, and distribute this software in compliance with the license terms.

## ©️ Copyright

© 2025 Darshan KC 
All rights reserved.  
ChatVerse is an open-source project released under the MIT license.
