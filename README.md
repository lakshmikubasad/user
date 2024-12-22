# Project Name

## Description
This project is a NestJS-based backend service that manages user authentication, user management, document CRUD operations, and ingestion control. It uses PostgreSQL for database management and JWT for secure authentication. The system also integrates with a Python-based backend for triggering ingestion processes.

## Modules

1. **User Module**: Handles user registration, authentication, roles, and permissions.
2. **Document Module**: Provides CRUD operations for managing documents.
3. **Ingestion Module**: Manages interactions with the Python backend for triggering and tracking ingestion processes.

---

## Table of Contents

- [Technologies](#technologies)
- [Setup](#setup)
  - [Pre-requisites](#pre-requisites)
  - [Local Development Setup](#local-development-setup)
  - [Docker Setup](#docker-setup)
- [Modules Overview](#modules-overview)
  - [User Module](#user-module)
  - [Document Module](#document-module)
  - [Ingestion Module](#ingestion-module)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)

---

## Technologies

- **NestJS**: Backend framework for building efficient, scalable Node.js applications.
- **PostgreSQL**: Relational database for managing user, document, and ingestion data.
- **JWT**: JSON Web Tokens for authentication and authorization.
- **TypeORM**: ORM for interacting with the PostgreSQL database.
- **Axios**: HTTP client for communicating with the Python backend.
- **bcryptjs**: Library for hashing passwords.

---

## Setup

### Pre-requisites

Ensure you have the following tools installed on your local system:

- [Node.js](https://nodejs.org/en/) (v18.x or higher recommended)
- [PostgreSQL](https://www.postgresql.org/download/) (for local database)
- [NestJS CLI](https://docs.nestjs.com/) 
  ```bash
  npm install -g @nestjs/cli
