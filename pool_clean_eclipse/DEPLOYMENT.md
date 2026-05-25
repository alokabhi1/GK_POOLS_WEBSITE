# Deployment Checklist

Use this checklist when publishing Gurukrupa Pools online. It keeps the current website design unchanged and only connects the public website to a hosted backend, database, and email service.

## 1. Backend

Deploy the `backend` folder as a Java 21 Spring Boot app or Docker app.

Recommended beginner-friendly hosts:

- Render
- Railway
- Hostinger VPS

Set these environment variables on the backend host:

```text
SPRING_PROFILES_ACTIVE=prod
PORT=8080
DB_URL=jdbc:mysql://YOUR_DB_HOST:3306/gurukrupa_pools?useSSL=true&serverTimezone=Asia/Kolkata
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
CORS_ALLOWED_ORIGIN_PATTERNS=https://yourdomain.com,https://www.yourdomain.com
ADMIN_API_TOKEN=replace_with_a_long_random_secret
ADMIN_EMAIL=admin@yourdomain.com
MAIL_FROM=no-reply@yourdomain.com
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=no-reply@yourdomain.com
MAIL_PASSWORD=your_email_app_password
MAIL_SMTP_AUTH=true
MAIL_SMTP_STARTTLS_ENABLE=true
```

After deployment, test:

```text
https://api.yourdomain.com/api/health
```

This project includes `render.yaml`, so Render can detect the backend Docker deploy settings from the repository. Secret values are marked `sync: false`, which means you must type them into Render during setup.

## 2. Database

Create a MySQL database named:

```text
gurukrupa_pools
```

Use the database host, username, and password in the backend environment variables. Do not use the local H2 database for production.

## 3. Frontend

Deploy the `frontend` folder as a static site.

Recommended beginner-friendly hosts:

- Netlify
- Vercel
- Hostinger static hosting

Before publishing, update `frontend/config.js`:

```js
window.GURUKRUPA_API_BASE_URL = "https://api.yourdomain.com";
```

Keep `frontend/config.production.example.js` as a reference copy.

This project includes `netlify.toml`, so Netlify can publish the `frontend` folder directly.

## 4. Domain

Recommended DNS structure:

```text
yourdomain.com          -> frontend
www.yourdomain.com      -> frontend
api.yourdomain.com      -> backend
```

After the domain is connected, update backend CORS:

```text
CORS_ALLOWED_ORIGIN_PATTERNS=https://yourdomain.com,https://www.yourdomain.com
```

## 5. Admin APIs

Customer enquiry submissions stay public:

```text
POST /api/inquiries
```

Inquiry list and status update APIs are private:

```text
GET   /api/inquiries
PATCH /api/inquiries/{id}/status
```

Call them only with:

```text
X-Admin-Token: your_ADMIN_API_TOKEN_value
```

Never put `ADMIN_API_TOKEN` inside frontend files.

## 6. Final Tests

Before sharing the website with clients:

1. Open the live frontend URL.
2. Submit a test enquiry.
3. Confirm the enquiry is saved in the production database.
4. Confirm the admin email arrives.
5. Check the backend health URL.
6. Check the website on mobile.
