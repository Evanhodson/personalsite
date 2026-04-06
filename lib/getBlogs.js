import Parser from 'rss-parser';
const parser = new Parser();

export async function getSubstackPosts() {
  const feed = await parser.parseURL('https://evanhodson.substack.com/feed');
  return feed.items.map(item => ({
    title: item.title,
    slug: item.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
    date: new Date(item.pubDate).toLocaleDateString(),
    content: item['content:encoded'] || item.content,
    link: item.link
  }));
}