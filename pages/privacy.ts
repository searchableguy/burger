import { html, respond, windicss, seo } from "../lib/mod.ts"

export function privacyPage() {
  const body = html`
    <h1 font="bold" text="sm dark:blue-900"> Burger </h1>
    `;

  const response = html`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        $${ seo({ title: "Burger", description: "" }) }
        <style> $${windicss(body)} </style>
    </head>
    <body>
        $${body}
    </body>
    </html>
    `;
  return respond.html(response);
}

