import { faker } from '@faker-js/faker';

function fakeJSONB() {
  return JSON.stringify({
    foo: faker.word.sample(),
    bar: faker.word.sample()
  });
}

export function fakePost() {
  return {
    post_id: faker.string.uuid(),
    thread: fakeJSONB(),
    url: faker.internet.url(),
    ord_in_thread: faker.number.int({ min: 0, max: 69 }),
    parent_url: faker.internet.url(),
    author: faker.internet.username(),
    published: faker.date.past(),
    title: faker.lorem.sentence(),
    text: faker.lorem.paragraph(),
    highlight_title: faker.lorem.sentence(),
    highlight_text: faker.lorem.sentence(),
    highlight_thread_title: faker.lorem.sentence(),
    language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
    sentiment: faker.helpers.arrayElement(['positive', 'neutral', 'negative']),
    categories: [faker.word.sample(), faker.word.sample()],
    external_links: [faker.internet.url(), faker.internet.url()],
    external_images: [faker.image.url(), faker.image.url()],
    entities: fakeJSONB(),
    crawled: faker.date.past(),
    updated: faker.date.past()
  };
}
