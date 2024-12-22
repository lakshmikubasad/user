import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { IngestionService } from './ingestion/ingestion.service';
import { IngestionController } from './ingestion/ingestion.controller';
import { DocumentModule } from './document/document.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Document } from './document/entities/document.entity';
import { Ingestion } from './ingestion/entities/ingestion.entity';
import { IngestionModule } from './ingestion/ingestion.module';

/**
 * The root module of the application that brings together all functionality
 * by importing the necessary modules and setting up the TypeORM database connection.
 * 
 * This module is responsible for wiring together:
 * - Authentication
 * - User management
 * - Document management
 * - Ingestion process management
 */
@Module({
  imports: [
    /**
     * The TypeOrmModule.forRoot() method is used to configure and initialize the
     * connection to the PostgreSQL database. It takes the following configuration:
     * 
     * - type: Specifies the database type (PostgreSQL in this case).
     * - host, port, username, password, database: These values are taken from the
     *   environment variables to securely configure the database connection.
     * - entities: An array of entity classes that TypeORM should manage. These entities
     *   map to tables in the database.
     * - synchronize: When set to true, TypeORM will automatically synchronize the
     *   database schema with the entities. This is useful for development but should be
     *   set to false in production to avoid unintended schema changes.
     */
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST, // The database host (e.g., localhost, or a cloud DB).
      port: +process.env.DB_PORT, // The database port.
      username: process.env.DB_USER, // The database username.
      password: process.env.DB_PASS, // The database password.
      database: process.env.DB_NAME, // The name of the database.
      entities: [User, Document, Ingestion], // The entities that TypeORM will track and manage.
      synchronize: true, // Sync the database schema automatically. Disable in production.
    }),
    
    /**
     * AuthModule: Handles user authentication (login, registration, JWT token generation).
     */
    AuthModule,

    /**
     * UserModule: Manages user-related operations such as user creation, role management, etc.
     */
    UserModule,

    /**
     * DocumentModule: Manages document-related operations such as document uploading,
     * metadata handling, etc.
     */
    DocumentModule,

    /**
     * IngestionModule: Manages the document ingestion process, including tracking its
     * progress, actions (e.g., process, complete), and handling failures.
     */
    IngestionModule,
  ],

  /**
   * The `controllers` array is empty because controllers are already provided within
   * their respective modules (e.g., `AuthModule`, `UserModule`, `DocumentModule`, and
   * `IngestionModule`). No global controllers are defined in the AppModule itself.
   */
  controllers: [],

  /**
   * The `providers` array is empty as all the necessary services (providers) are already
   * registered within their respective modules (e.g., `AuthModule`, `UserModule`, `IngestionModule`).
   */
  providers: [],
})
export class AppModule {}
