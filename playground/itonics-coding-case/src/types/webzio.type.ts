export type PostType = {
  thread: any;
  uuid: string;
  url: string;
  ord_in_thread: number;
  parent_url: string;
  author: string;
  published: Date;
  title: string;
  text: string;
  highlightText: string;
  highlightTitle: string;
  highlightThreadTitle: string;
  language: string;
  sentiment: string;
  categories: Array<string>;
  external_links: Array<string>;
  external_images: Array<string>;
  entities: any;
  rating?: number;
  crawled: Date;
  updated: Date;
};

export type ResponseType = {
  posts: Array<PostType>;
  totalResults: number;
  moreResultsAvailable: number;
  next: string | null;
  requestsLeft: number;
  warnings: string | null;
};

export interface WebzQuery {
  q?: string;
  sort?: string;
  order?: string;
}
