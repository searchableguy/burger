import { html } from "./html.ts";

interface SeoOptions {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export function seo({ title, description, image, url }: SeoOptions) {
  let seo = "";

  if (title) {
    seo += html`
      <title>${title}</title>
      <meta name="title" content="${title}">`;
  }

  if (description) {
    seo += html`
      <meta name="description" content="${description}">
      <meta property="og:description" content="${description}">
      <meta property="twitter:description" content="${description}">
      `;
  }

  if (image) {
    seo += html`
        <meta property="og:image" content="${image}">
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:image" content="${image}">
        `;
  }

  if (url) {
    seo += html`
      <meta property="twitter:url" content="${url}">
      <meta property="og:url" content="${url}">
      `;
  }

  return seo;
}
