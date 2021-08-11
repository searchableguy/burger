import { html, news, respond, seo, windicss, cache } from "../lib/mod.ts";
import { PUBLISHERS } from "../config/publishers.ts";

export async function indexPage() {
  const res = cache.get("index")
  if(res) {
    return respond.html(res as string)
  }
  const feeds = await news(PUBLISHERS);
  const body = html`
    <body max-w="screen-md" m="x-auto" p="x-8 y-32" >
      <header p="y-8">
        <div space="y-2">
        <h1 font="extrabold" text="3xl gray-900"> Burger </h1>
        <p text="lg gray-700"> A work in progress news aggregator for other news aggregators. It punishes toxic and negative content. </p>
        </div>
      </header>

      <div p="4" border="~ rounded" grid="~" gap="5">
        <h1 font="extrabold"> Subscribe to receive content in your email. </h1>
        <input placeholder="Coming soon" disabled border="~ rounded" p="2" />
      </div>
      <div>
        <div grid="~" gap="y-4" p="y-8">
          ${
    feeds.map((feed) => {
      const feedItems = feed.items.map((item) => (
        html`
          <div flex="~">
          <a text="lg gray-800" rounded="~" font="medium" hover="bg-gray-600 text-gray-100" p="x-2" bg="gray-100" href="${item.url}"> ${item.title} </a>
          </div>
         
        `
      )).join("");

      const feedBody = html`
                <div>
                  <div  flex="~" border="b" p="py-1">
                    <h1 rounded="~" font="semibold" p="x-2" bg="gray-200" text="gray-800"> ${feed.title} </a>
                  </div>
              
                  <div p="y-4" grid="~" gap="y-2">
                    $${feedItems}
                  </div>
                </div>
              `;
      return feedBody;
    })
  }
        </div>
      </div>
    </body>
    
    `;

  const response = html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        $${seo({ title: "Burger", description: "" })}
        <style> $${windicss(body)} </style>
    </head>
    $${body}
    </html>
    `;
  cache.set("index", response, 3600)
  return respond.html(response);
}
