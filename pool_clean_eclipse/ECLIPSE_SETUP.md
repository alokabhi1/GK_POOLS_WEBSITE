# Gurukrupa Pools - Eclipse Run Guide

Use this guide if you are running the project in Eclipse IDE for Enterprise Java and Web Developers.

## 1. Required Software

Install these first:

- Eclipse IDE for Enterprise Java and Web Developers
- JDK 21
- Node.js

After installing JDK 21, confirm Eclipse is using it:

1. Open Eclipse.
2. Go to `Window > Preferences > Java > Installed JREs`.
3. Click `Add...`.
4. Select `Standard VM`.
5. Choose your JDK 21 folder, for example:
   `C:\Program Files\Java\jdk-21`
6. Tick the checkbox beside JDK 21.
7. Click `Apply and Close`.

## 2. Backend Project Import

Import only the backend as a Maven project:

1. Open Eclipse.
2. Go to `File > Import...`.
3. Select `Maven > Existing Maven Projects`.
4. Click `Next`.
5. Browse to:
   `C:\Users\ALOK ABHI\OneDrive\Desktop\pool_project\pool\backend`
6. Make sure `pom.xml` is selected.
7. Click `Finish`.

If Eclipse shows Maven errors:

1. Right-click the backend project.
2. Select `Maven > Update Project...`.
3. Tick `Force Update of Snapshots/Releases`.
4. Click `OK`.

## 3. Backend Java Settings

Check Java version inside the imported backend:

1. Right-click backend project.
2. Select `Properties`.
3. Open `Java Compiler`.
4. Set `Compiler compliance level` to `21`.
5. Open `Java Build Path > Libraries`.
6. Confirm `JRE System Library` is JDK 21.

## 4. Run Backend

Run the Spring Boot main class:

1. In Eclipse Package Explorer, open:
   `src/main/java/com/gurukrupapools/backend/PoolBackendApplication.java`
2. Right-click inside the file.
3. Select `Run As > Java Application`.

Backend URL:

```text
http://localhost:8080
```

Health check:

```text
http://localhost:8080/api/health
```

This project uses H2 local database by default, so you do not need MySQL for local Eclipse running.

H2 console:

```text
http://localhost:8080/h2-console
```

H2 JDBC URL:

```text
jdbc:h2:file:./data/gurukrupa-pools
```

Username:

```text
sa
```

Password is blank.

## 5. Frontend Project Import

Import the frontend separately:

1. Go to `File > Import...`.
2. Select `General > Existing Projects into Workspace`.
3. Click `Next`.
4. Browse to:
   `C:\Users\ALOK ABHI\OneDrive\Desktop\pool_project\pool\frontend`
5. Click `Finish`.

If Eclipse does not recognize it as a project, use:

1. `File > Open Projects from File System...`
2. Choose the `frontend` folder.
3. Click `Finish`.

## 6. Run Frontend

In Eclipse:

1. Right-click `frontend/server.js`.
2. Select `Run As > Node.js Application` if available.

If Node.js run option is not available in your Eclipse, use Eclipse Terminal:

1. Go to `Window > Show View > Terminal`.
2. Open a local terminal.
3. Run:

```powershell
cd "C:\Users\ALOK ABHI\OneDrive\Desktop\pool_project\pool\frontend"
node server.js
```

Frontend URL:

```text
http://localhost:8000
```

## 7. Correct Running Order

Always start in this order:

1. Start backend from Eclipse.
2. Wait until console shows Spring Boot started on port `8080`.
3. Start frontend.
4. Open `http://localhost:8000`.

## 8. Files You Need

Root:

- `README.md`
- `ECLIPSE_SETUP.md`
- `docker-compose.yml`

Frontend:

- `frontend/index.html`
- `frontend/style.css`
- `frontend/main.js`
- `frontend/config.js`
- `frontend/server.js`

Backend:

- `backend/pom.xml`
- `backend/README.md`
- `backend/Dockerfile`
- `backend/.env.example`
- `backend/.gitignore`
- `backend/data/.gitkeep`
- `backend/src/main/resources/application.properties`
- `backend/src/main/resources/application-mysql.properties`
- `backend/src/main/resources/application-prod.properties`
- `backend/src/main/resources/data.sql`
- `backend/src/main/java/com/gurukrupapools/backend/PoolBackendApplication.java`
- `backend/src/main/java/com/gurukrupapools/backend/config/WebConfig.java`
- `backend/src/main/java/com/gurukrupapools/backend/controller/CatalogController.java`
- `backend/src/main/java/com/gurukrupapools/backend/controller/HealthController.java`
- `backend/src/main/java/com/gurukrupapools/backend/controller/InquiryController.java`
- `backend/src/main/java/com/gurukrupapools/backend/dto/InquiryRequest.java`
- `backend/src/main/java/com/gurukrupapools/backend/dto/InquiryResponse.java`
- `backend/src/main/java/com/gurukrupapools/backend/dto/StatusUpdateRequest.java`
- `backend/src/main/java/com/gurukrupapools/backend/entity/Inquiry.java`
- `backend/src/main/java/com/gurukrupapools/backend/entity/InquiryStatus.java`
- `backend/src/main/java/com/gurukrupapools/backend/entity/Product.java`
- `backend/src/main/java/com/gurukrupapools/backend/entity/ServiceOffering.java`
- `backend/src/main/java/com/gurukrupapools/backend/exception/ApiExceptionHandler.java`
- `backend/src/main/java/com/gurukrupapools/backend/exception/ResourceNotFoundException.java`
- `backend/src/main/java/com/gurukrupapools/backend/repository/InquiryRepository.java`
- `backend/src/main/java/com/gurukrupapools/backend/repository/ProductRepository.java`
- `backend/src/main/java/com/gurukrupapools/backend/repository/ServiceOfferingRepository.java`
- `backend/src/main/java/com/gurukrupapools/backend/service/AdminNotificationService.java`
- `backend/src/main/java/com/gurukrupapools/backend/service/InquiryService.java`
- `backend/src/test/java/com/gurukrupapools/backend/PoolBackendApplicationTests.java`

## 9. Files You Do Not Need To Create Manually

Do not manually create or copy these:

- `target`
- `.classpath`
- `.project`
- `.settings`
- `.class` files
- old `.db` files

Eclipse and Maven will generate their own project/build files when needed.
