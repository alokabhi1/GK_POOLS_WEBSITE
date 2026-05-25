# Gurukrupa Pools Java Backend

Spring Boot backend for the Gurukrupa Pools website.

## Features

- Contact inquiry API with validation
- Inquiry status management
- Services API
- Products API
- H2 database for local development
- MySQL profile for production/local MySQL
- CORS configured for the static frontend

## Run With H2 Database

```bash
cd backend
mvn spring-boot:run
```

The API runs at:

```text
http://localhost:8080
```

H2 console:

```text
http://localhost:8080/h2-console
```

Use this JDBC URL:

```text
jdbc:h2:file:./data/gurukrupa-pools
```

## Run With MySQL

Create or use a MySQL database, then run:

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

Default MySQL settings can be changed with environment variables:

```text
DB_URL=jdbc:mysql://localhost:3306/gurukrupa_pools?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Kolkata
DB_USERNAME=root
DB_PASSWORD=your_password
```

## API Endpoints

```text
GET    /api/health
POST   /api/inquiries
GET    /api/inquiries
GET    /api/inquiries?status=NEW
PATCH  /api/inquiries/{id}/status
GET    /api/services
GET    /api/products
```

## Contact Form Payload

```json
{
  "name": "Customer Name",
  "email": "customer@example.com",
  "phone": "+91 98765 43210",
  "service": "Pool Construction & Engineering",
  "message": "Project details"
}
```