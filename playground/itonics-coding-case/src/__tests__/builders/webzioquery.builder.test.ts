import { describe, expect } from '@jest/globals';
import { WebzQueryBuilder } from '../../builders/webzioquery.builder';

describe('WebzQueryBuilder', () => {
  it('should build basic query', () => {
    const query = new WebzQueryBuilder().query('foo').build();

    expect(query).toEqual({ q: 'foo' });
  });

  it('should combine multiple queries', () => {
    const query = new WebzQueryBuilder()
      .query('foo')
      .sort('relevancy')
      .order('desc')
      .build();

    expect(query).toEqual({
      q: 'foo',
      sort: 'relevancy',
      order: 'desc'
    });
  });

  it('should handle parameter overwrites', () => {
    const query = new WebzQueryBuilder().query('foo').query('bar').build();

    expect(query).toEqual({
      q: 'bar'
    });
  });
});
