# Gurukrupa Pools Publish-Ready Website

This folder contains the website frontend and Java Spring Boot backend needed to publish Gurukrupa Pools online.

## What Happens When A Customer Submits An Enquiry

1. The frontend contact form sends the enquiry to the Java backend.
2. The backend validates the details.
3. The enquiry is stored in the database table `inquiries`.
4. The backend sends an email notification to the configured admin email.
5. If email fails, the enquiry still remains safely stored in the database.

## Folder Structure

```text
frontend/    Static website files
backend/     Java Spring Boot API with database and email support
docker-compose.yml
```

## Local Run

Install JDK 21 first and make sure `JAVA_HOME` points to it. Then run:

For Eclipse setup, follow `ECLIPSE_SETUP.md`.

Terminal 1, backend:

```bash
cd backend
mvn spring-boot:run
```

Terminal 2, frontend:

```bash
cd frontend
node server.js
```

Open:

```text
http://localhost:8000
```

Backend health check:

```text
http://localhost:8080/api/health
```

## Database

Local development uses H2 by default, saved inside the backend `data` folder when the app runs.

For production, use MySQL or a hosted MySQL-compatible database and set these environment variables:

```text
SPRING_PROFILES_ACTIVE=prod
DB_URL=jdbc:mysql://YOUR_DB_HOST:3306/gurukrupa_pools?useSSL=true&serverTimezone=Asia/Kolkata
DB_USERNAME=your_database_user
DB_PASSWORD=your_database_password
ADMIN_API_TOKEN=replace_with_a_long_random_secret
```

## Admin Email Setup

Set these variables on your hosting provider:

```text
ADMIN_EMAIL=admin@yourdomain.com
MAIL_FROM=no-reply@yourdomain.com
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=no-reply@yourdomain.com
MAIL_PASSWORD=your_email_app_password
MAIL_SMTP_AUTH=true
MAIL_SMTP_STARTTLS_ENABLE=true
```

For Gmail, use an App Password, not your normal Gmail password.

## Frontend Backend URL

Before publishing the frontend, open:

```text
frontend/config.js
```

Set your backend URL:

```js
window.GURUKRUPA_API_BASE_URL = "https://api.yourdomain.com";
```

If frontend and backend are tested locally, you can leave it blank.

The frontend already includes `config.js` with a blank local value.

## API Endpoints

```text
POST   /api/inquiries                  Public customer enquiry form
GET    /api/services                   Public service list
GET    /api/products                   Public product list
GET    /api/health                     Public backend health check
GET    /api/inquiries                  Admin only, requires X-Admin-Token
PATCH  /api/inquiries/{id}/status      Admin only, requires X-Admin-Token
```

## Docker Option

Update passwords and email values in `docker-compose.yml`, then run:

```bash
docker compose up --build
```

## Recommended Publishing Setup

- Frontend: Netlify, Vercel, Hostinger static hosting, or any static web host
- Backend: Render, Railway, VPS, AWS, Azure, or any Java hosting provider
- Database: MySQL on hosting provider, PlanetScale, Railway MySQL, AWS RDS, or VPS MySQL
- Email: Gmail SMTP App Password, Zoho Mail SMTP, SendGrid, or Mailgun

Keep database passwords, mail passwords, and `ADMIN_API_TOKEN` in environment variables only. Do not write real passwords into code.

## Admin API Safety

Customer enquiry submissions use `POST /api/inquiries` and remain public.

The admin-only APIs below require an `X-Admin-Token` header matching `ADMIN_API_TOKEN`:

```text
GET    /api/inquiries
PATCH  /api/inquiries/{id}/status
```

Do not place `ADMIN_API_TOKEN` in frontend files. Use it only from a private admin tool, Postman, or a protected admin panel.
