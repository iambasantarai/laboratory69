import { Column, CreateDateColumn, Entity } from 'typeorm';
import { AbstractEntity } from '../common/abstract.entity';

@Entity({ name: 'post' })
export class Post extends AbstractEntity {
  @Column({ type: 'varchar' })
  post_id: string;

  @Column({ type: 'jsonb', nullable: true, default: {} })
  thread: string;

  @Column({ type: 'text' })
  url: string;

  @Column({ type: 'integer' })
  ord_in_thread: number;

  @Column({ type: 'text', nullable: true })
  parent_url: string | null;

  @Column({ type: 'varchar', nullable: true })
  author: string | null;

  @CreateDateColumn({ type: 'timestamptz' })
  published: Date;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'text', nullable: true })
  text: string | null;

  @Column({ type: 'text' })
  highlight_title: string;

  @Column({ type: 'text' })
  highlight_text: string;

  @Column({ type: 'text' })
  highlight_thread_title: string;

  @Column({ type: 'varchar' })
  language: string;

  @Column({ type: 'varchar' })
  sentiment: string;

  @Column({ type: 'text', array: true, default: [] })
  categories: string[];

  @Column({ type: 'text', array: true, default: [] })
  external_links: string[];

  @Column({ type: 'text', array: true, default: [] })
  external_images: string[];

  @Column({ type: 'jsonb', nullable: true, default: {} })
  entities: string;

  @CreateDateColumn({ type: 'timestamptz' })
  crawled: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  updated: Date;
}
