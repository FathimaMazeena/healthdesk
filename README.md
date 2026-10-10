# HealthDesk

### Clinic Appointment & Patient Scheduling Platform

HealthDesk is a full-stack web application for managing clinic appointments, doctor availability, and patient scheduling. It is designed to help clinic staff register and locate patients, organize doctors' schedules, book appointments, and manage the appointment lifecycle through a centralized interface.

> **Development status:** Work in progress. The application foundation and basic patient API integration are implemented. Appointment scheduling, authentication, and several other features described below are planned and are **not yet complete**.

## Project Goals

- Centralize patient and doctor scheduling information.
- Reduce double bookings through server-side availability and conflict checks.
- Support the appointment lifecycle, including booking, rescheduling, cancellation, check-in, and completion.
- Provide clinic staff with a clear view of daily schedules and patient appointment history.
- Demonstrate full-stack development using Angular, Spring Boot, and PostgreSQL.

## Technology Stack

| Layer | Technologies |
| --- | --- |
| Frontend | Angular, TypeScript, HTML, CSS, Tailwind CSS |
| Backend | Java, Spring Boot, Spring Web, Spring Data JPA, Spring Security (planned configuration) |
| Database | PostgreSQL |
| Build tools | Angular CLI / npm, Maven |
| API | REST / JSON |
| Testing | Manual API and UI testing so far; automated tests planned |

## Current Implementation Status

### Implemented / initially integrated

- Angular application scaffold with routes for login, dashboard, patients, and appointments.
- Spring Boot backend scaffold connected to PostgreSQL.
- Patient JPA entity, repository, service, and REST controller.
- Basic patient REST operations implemented in the backend.
- Angular `Patient` interface and `PatientService` using `HttpClient`.
- Patient listing that retrieves records from the backend and renders them with Angular signals.
- Basic dashboard/navigation scaffolding.

### In progress

- Patient Management: registration UI, validation, search, profile, controlled contact updates, and testing.

### Planned

- Doctor directory and availability management.
- Appointment booking, conflict prevention, rescheduling, and cancellation.
- Appointment status management and check-in workflow.
- Authentication, JWT-based sessions, and role-based authorization.
- Real dashboard metrics and appointment history integration.
- Automated tests, deployment configuration, and production hardening.
- Optional AI-assisted functionality, subject to a defined use case.

> Existing backend patient CRUD endpoints are an early implementation. They are not yet the final authorization or patient-record lifecycle design. Unrestricted patient deletion is **not** an intended clinic workflow.

## Core Workflows (Target MVP)

### Patient Management

Clinic staff will be able to register patients, search the patient directory, view profiles, and update permitted contact information. Appointment history will be displayed after the appointment module is integrated.

### Doctor Management

Authorized staff will manage doctor profiles, specializations, and available appointment slots.

### Appointment Scheduling

Staff will select a patient, doctor, date, and available time slot to create an appointment. The backend will validate availability and reject conflicting bookings. Staff will also be able to reschedule or cancel appointments and update their status.

### Access Control

Planned roles include receptionist, doctor, and administrator. Role-specific permissions will be enforced in the backend; frontend navigation alone is not a security boundary.

## Architecture

```text
Angular Frontend (localhost:4200)
    |
    | HTTP / JSON
    v
Spring Boot REST API (localhost:8080)
    |
    v
Controllers -> Services -> Spring Data JPA Repositories
                                    |
                                    v
                              PostgreSQL
```

- **Angular components** render pages and handle user interaction.
- **Angular services** centralize API requests.
- **Spring controllers** expose REST endpoints.
- **Spring services** contain application and scheduling rules.
- **JPA repositories** manage persistence.
- **PostgreSQL** stores application records.

## Planned Domain Model

The target data model includes:

| Entity | Purpose |
| --- | --- |
| User | Staff account and role |
| Patient | Patient identity and contact details |
| Doctor | Doctor profile and specialization |
| Availability | Doctor working dates and time ranges |
| Appointment | Patient booking, time, doctor, and status |
| VisitNote | Optional appointment-related clinical notes |

Relationships and fields will be refined as the corresponding modules are implemented. This table describes the **planned model**, not the current database schema.

## Repository Structure

```text
healthdesk/
├── frontend/                 # Angular application
│   └── src/app/
│       ├── models/           # TypeScript domain interfaces
│       ├── services/         # Angular API services
│       └── ...               # Pages, routing, and components
├── backend/                  # Spring Boot application
│   ├── pom.xml
│   └── src/main/
│       ├── java/             # Controllers, services, entities, repositories
│       └── resources/
│           └── application.properties
├── .gitignore
└── README.md
```

The exact package names and folder structure may evolve as development continues.

## Prerequisites

Install the following before running locally:

- Node.js and npm compatible with the project's Angular version.
- Angular CLI (or use `npx ng`).
- JDK compatible with the Spring Boot project (Java 21 is the intended development version).
- Maven.
- PostgreSQL.

## Local Setup

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd healthdesk-healthcare-management-platform
```

If you already have the local project, run the commands from its existing `healthdesk` directory instead.

### 2. Configure PostgreSQL

Create a PostgreSQL database named `healthdesk` and a database user with the required permissions. The development setup has used a role named `healthdesk_admin`.

Configure `backend/src/main/resources/application.properties` to read sensitive values from environment variables, for example:

```properties
spring.datasource.url=${DB_URL:jdbc:postgresql://localhost:5432/healthdesk}
spring.datasource.username=${DB_USERNAME:healthdesk_admin}
spring.datasource.password=${DB_PASSWORD}
spring.jpa.hibernate.ddl-auto=update
```

**Never commit database passwords or other secrets.** Set the required variables in your shell, IDE run configuration, or an appropriate secrets-management mechanism.

On macOS/Linux, for a single terminal session:

```bash
export DB_PASSWORD='YOUR_LOCAL_DATABASE_PASSWORD'
```

The `DB_PASSWORD` variable must be available to the process that starts Spring Boot. Spring Boot does not automatically read a generic `.env` file.

> `ddl-auto=update` is convenient during early local development; use versioned database migrations and a reviewed schema strategy before production deployment.

### 3. Start the backend

```bash
cd backend
mvn spring-boot:run
```

Default development URL: `http://localhost:8080`.

With the backend running, try:

```bash
curl http://localhost:8080/api/patients
```

The expected response is a JSON array if the API and database are configured correctly.

### 4. Start the frontend

In a **separate terminal**, from the project root:

```bash
cd frontend
npm install
npx ng serve
```

Open `http://localhost:4200` or navigate directly to `http://localhost:4200/patients`.

The patient directory requires the Spring Boot backend and PostgreSQL database to be running.

## API Reference (Current Patient Module)

The following endpoints exist in the initial backend implementation; validation, authorization, and lifecycle behavior are still being refined.

| Method | Endpoint | Current purpose |
| --- | --- | --- |
| GET | `/api/patients` | List patients |
| GET | `/api/patients/{id}` | Retrieve one patient |
| POST | `/api/patients` | Create patient record |
| PUT | `/api/patients/{id}` | Update patient record |
| DELETE | `/api/patients/{id}` | Early CRUD endpoint; intended for removal or restriction |

Example patient payload:

```json
{
  "name": "Amina Rahman",
  "dateOfBirth": "1998-05-14",
  "phone": "+94770000000",
  "email": "amina@example.com"
}
```

This example is illustrative. Final input validation and API request/response contracts will be documented as Stage 2 is completed.

## Development Roadmap

| Stage | Scope | Status |
| --- | --- | --- |
| 1 | Project setup, Angular/Spring Boot integration, PostgreSQL | Initial foundation implemented; repository baseline being organized |
| 2 | Patient directory, registration, search, profiles, validation | **In progress** |
| 3 | Doctor management and availability | Planned |
| 4 | Appointment scheduling and conflict prevention | Planned |
| 5 | Authentication and authorization | Planned |
| 6 | Dashboard and workflow integration | Planned |
| 7 | Optional AI-assisted feature | Optional |
| 8 | Testing, documentation, and release preparation | Planned |

## Git Workflow

This repository uses a lightweight feature-branch workflow:

- `main`: stable releases and tested milestones.
- `develop`: integration of completed features.
- `feature/<name>`: development of an individual module or feature.

Example for Stage 2:

```bash
git switch develop
git switch -c feature/patient-management
# Implement and test changes
git add <relevant-files>
git commit -m "feat: implement patient registration"
```

After review and testing, merge the feature branch into `develop`. Merge tested release milestones from `develop` into `main`.

### Commit conventions

- `chore:` setup, configuration, and maintenance.
- `feat:` new functionality.
- `fix:` bug fixes.
- `test:` automated tests.
- `docs:` documentation.
- `refactor:` code restructuring without changing behavior.

## Testing and Quality

Testing is being introduced incrementally. The planned approach includes:

- Spring Boot service and controller tests, including validation and booking conflicts.
- Angular component/service tests for critical workflows.
- API tests for successful and invalid requests.
- Manual end-to-end checks for booking, cancellation, and status transitions.

A feature is considered complete only when its intended behavior is implemented and verified, not merely when its UI is visible.

## Security Considerations

HealthDesk handles patient-related information. Before using it with real clinic or patient data, it will require appropriate authentication, authorization, secure deployment, input validation, auditing, privacy controls, and operational safeguards. **This repository is currently a development/portfolio project and should not be treated as production-ready clinical software.**

Use fictional data for development and demos. Do not commit credentials or real patient records.

## Project Status

**Current focus: Stage 2 — Patient Management.** The immediate work is to improve the patient backend contracts and validation, implement registration and search in Angular, and test the completed patient workflow before moving on to Doctor Management.

---

Built as a full-stack software engineering project using **Angular, Spring Boot, and PostgreSQL**.
