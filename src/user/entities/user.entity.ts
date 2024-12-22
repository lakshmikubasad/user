import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Document } from '../../document/entities/document.entity';
/**
 * Represents a User in the system.
 * 
 * Properties:
 * - `id`: Primary key, unique identifier for the user.
 * - `username`: Unique username for the user.
 * - `password`: The hashed password of the user.
 * - `role`: The role of the user (admin, editor, viewer).
 * 
 * Relations:
 * - A user can have many documents, represented by the `documents` field.
 */

@Entity() // This decorator tells TypeORM that this class is an entity.
export class User {
  @PrimaryGeneratedColumn() // Auto-generated primary key
  id: number;

  @Column({ unique: true })  // Username must be unique
  username: string;

  @Column()  // Password field
  password: string;

  @Column()  // Role of the user (admin, editor, viewer)
  role: string;

  @OneToMany(() => Document, (document) => document.user)
  documents: Document[]; // A user can have many documents, represented by the `documents` field.
}
