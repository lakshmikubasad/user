import { Entity, Column, PrimaryGeneratedColumn, ManyToOne  } from 'typeorm';
import { User } from '../../user/entities/user.entity';
/**
 * Represents a Document uploaded by a User.
 * 
 * Properties:
 * - `id`: Primary key, unique identifier for the document.
 * - `title`: Title of the document.
 * - `description`: description of the document.
 * 
 * Relations:
 * - Each document belongs to a specific user, represented by the `user` field.
 */

@Entity()  // Marks this class as an entity.
export class Document {
  @PrimaryGeneratedColumn() // Auto-generated primary key
  id: number;

  @Column() // Document title
  title: string;

  @Column() // Document description (text field)
  description: string;

  @Column()
  filePath: string;

  @ManyToOne(() => User, user => user.documents) // Many documents can belong to one user
  user: User;
}
