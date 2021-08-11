const HTML_ESCAPED_CHARS: Record<string, string> = {
  "&": "&amp;",
  ">": "&gt;",
  "<": "&lt;",
  '"': "&quot;",
  "'": "&#39;",
  "`": "&#96;",
};

const UNESCAPED_HTML_REGEX = /[&><"'`]/g;

export function escapeHtml(html: string) {
  return html.replace(UNESCAPED_HTML_REGEX, (ch) => HTML_ESCAPED_CHARS[ch]);
}

export function html(
  contents: TemplateStringsArray,
  ...values: string[] | string[][]
) {
  return contents.reduce((html, content, index) => {
    const prevIndex = index - 1;
    let value = values[prevIndex];
    if (Array.isArray(value)) {
      value = value.join("");
    } else if (contents[prevIndex]?.endsWith(`$`)) {
      html = html.slice(0, -1);
    } else {
      value = escapeHtml(value);
    }
    return html + value + content;
  });
}
