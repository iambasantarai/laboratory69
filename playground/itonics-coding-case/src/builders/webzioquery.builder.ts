import { WebzQuery } from '../types/webzio.type';

export class WebzQueryBuilder {
  private queryParams: WebzQuery = {};

  /**
   * Set the main search query
   * @param query Search terms
   */
  query(query: string): this {
    this.queryParams.q = query;
    return this;
  }

  /**
   * Set sorting filter
   */
  sort(sortType: string): this {
    this.queryParams.sort = sortType;
    return this;
  }

  /**
   * Set sorting order
   */
  order(order: string): this {
    this.queryParams.order = order;
    return this;
  }

  /**
   * Build final query parameters
   */
  build(): WebzQuery {
    return { ...this.queryParams };
  }
}
