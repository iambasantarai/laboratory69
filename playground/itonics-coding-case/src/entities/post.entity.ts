import { Column, CreateDateColumn, Entity } from 'typeorm';
import { AbstractEntity } from '../common/abstract.entity';

@Entity({ name: 'post' })
export class Post extends AbstractEntity {
  @Column({ type: 'varchar' })
  post_id: string;

  @Column({ type: 'jsonb', nullable: true, default: {} })
  thread: string;

  @Column({ type: 'text', nullable: true })
  url: string;

  @Column({ type: 'integer', nullable: true })
  ord_in_thread: number;

  @Column({ type: 'text', nullable: true })
  parent_url: string | null;

  @Column({ type: 'varchar', nullable: true })
  author: string | null;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  published: Date;

  @Column({ type: 'text', nullable: true })
  title: string;

  @Column({ type: 'text', nullable: true })
  text: string | null;

  @Column({ type: 'text', nullable: true })
  highlight_title: string;

  @Column({ type: 'text', nullable: true })
  highlight_text: string;

  @Column({ type: 'text', nullable: true })
  highlight_thread_title: string;

  @Column({ type: 'varchar', nullable: true })
  language: string;

  @Column({ type: 'varchar', nullable: true })
  sentiment: string;

  @Column({ type: 'text', nullable: true, array: true, default: [] })
  categories: string[];

  @Column({ type: 'text', nullable: true, array: true, default: [] })
  external_links: string[];

  @Column({ type: 'text', nullable: true, array: true, default: [] })
  external_images: string[];

  @Column({ type: 'jsonb', nullable: true, default: {} })
  entities: string;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  crawled: Date;

  @CreateDateColumn({ type: 'timestamptz', nullable: true })
  updated: Date;
}
