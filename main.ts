import { router } from "./deps.ts";
import { start, respond, news } from "./lib/mod.ts";
import { indexPage } from "./pages/index.ts";
import { privacyPage } from "./pages/privacy.ts";
import { PUBLISHERS } from "./config/publishers.ts"
await start(router({
  "GET@/_ping": () => {
    return respond.json({
      message: `The current UTC time is ${new Date().toUTCString()}`
    })
  },
  "GET@/": indexPage,
  "GET@/privacy": privacyPage,
  "GET@/api/news": async () => {
    const items = await news(PUBLISHERS)
    return respond.json({ items })
  }
}));
