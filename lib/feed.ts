import { deserializeFeed } from "../deps.ts";
import { sentiment } from "./util.ts";

export async function feedFromURL(url: string) {
  const response = await fetch(url);
  const xml = await response.text();
  const { feed } = await deserializeFeed(xml, { outputJsonFeed: true });
  return feed;
}

export interface FeedItem {
  title: string;
  url: string;
  lastUpdated?: Date;
}
export interface NewsFeed {
  title: string;
  feed: string;
  items: FeedItem[];
}

export async function news(publishers: Record<string, string>, limitItems = 8) {
  const duplicate: Set<string> = new Set();
  const feedPromises = Object.entries(publishers)
    .map(async ([title, feedURL]) => {
      const feed = await feedFromURL(feedURL);
      const items: FeedItem[] = [];

      for (const item of feed.items) {
        if (!(item.url && item.title)) {
          continue;
        }

        if (duplicate.has(item.url)) {
          continue;
        }

        const { polarity } = sentiment(item.title);

        if (polarity < 0) {
          continue;
        }

        const feedItem: FeedItem = {
          title: item.title,
          url: item.url,
          lastUpdated: item.date_modified ?? item.date_published,
        };

        items.push(feedItem);
      }
      
      const newsFeed: NewsFeed = {
        title,
        feed: feedURL,
        items: items.slice(0, limitItems),
      };

      return newsFeed
    });

  const feeds = await Promise.allSettled(feedPromises);
  const news: NewsFeed[] = []

  for(const result of feeds) {
    if(result.status === "fulfilled" && result.value) {
        news.push(result.value)
    }
  }

  return news
}
