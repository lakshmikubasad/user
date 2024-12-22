// src/ingestion/entities/ingestion.entity.ts

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from '../../document/entities/document.entity';

@Entity()
export class Ingestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentId: number;

  @ManyToOne(() => Document, (document) => document.id)
  @JoinColumn({ name: 'documentId' })
  document: Document; // This will create a relation to the Document entity

  @Column()
  action: string; // Action taken on the document (e.g., 'process', 'complete')

  @Column()
  status: string; // Status of the ingestion process (e.g., 'pending', 'completed', 'failed')

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  startedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  finishedAt: Date; // Nullable to allow for unfinished processes

  @Column({ nullable: true })
  error: string; // In case of failure, store error details here
}
