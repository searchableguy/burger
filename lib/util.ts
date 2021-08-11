import { inject, polarity } from "../deps.ts";
import { SENTIMENT_DICTIONARY } from "../config/sentiment.ts";

export function shuffle<T>(items: T[]): T[] {
  const length = items.length;
  const result = [...items];

  for (let i = 0; i <= length - 2; i++) {
    const rand = i + Math.floor(Math.random() * (length - i));
    const tmp = result[rand];
    result[rand] = result[i];
    result[i] = tmp;
  }

  return result;
}

export function ms(
  { hours = 0, minutes = 0, seconds = 0 }: Partial<
    Record<"hours" | "minutes" | "seconds", number>
  >,
) {
  const totalSeconds = hours * 3600 + minutes * 60 + seconds;
  return totalSeconds * 1000;
}

export function castArray<T>(value: T | T[]) {
  return Array.isArray(value) ? value : [value];
}

export class TTLCache {
  #storage: Map<string, { value: unknown; expire: number }> = new Map();
  set(key: string, value: unknown, ttl: number) {
    this.#storage.set(key, {
      value,
      expire: new Date(Date.now() + ttl).getTime(),
    });
  }
  get(key: string) {
    const response = this.#storage.get(key);
    if (response && response.expire > Date.now()) {
      return response.value;
    }
  }

  delete(key: string) {
    this.#storage.delete(key);
  }

  clear() {
    this.#storage.clear();
  }
}

inject(SENTIMENT_DICTIONARY);

export function sentiment(value: string) {
  const tokens = value.toLowerCase().match(/([A-Za-z.]{2,})\w+/g) as string[];
  return polarity(tokens, {});
}
