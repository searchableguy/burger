import {
    WindicssHTMLParser,
    WindicssProcessor,
} from "../deps.ts"

import { castArray } from "./util.ts";

export function windicss(html: string) {
    const processor = new WindicssProcessor({
        darkMode: "media",
    });
    const parser = new WindicssHTMLParser(html);
    const preflightSheet = processor.preflight(html);

    const attrs = parser.parseAttrs().reduceRight<{ [key: string]: string[] }>(
        (acc, curr) => {
            const attrKey = curr.key;

            // ignore class or className attributes
            if (attrKey === "class" || attrKey === "className") return acc;

            // get current match value as array
            const attrValue = castArray(curr.value);

            // if current match key is already in accumulator
            if (attrKey in acc) {
                // get current attr key value as array
                const attrKeyValue = castArray(acc[attrKey]);

                // append current value to accumulator value
                acc[attrKey] = [...attrKeyValue, ...attrValue];
            } else {
                // else add atrribute value array to accumulator
                acc[attrKey] = attrValue;
            }

            return acc;
        },
        {},
    );

    // Build styles
    const MINIFY = true;
    const styles = processor
        .attributify(attrs)
        .styleSheet.extend(preflightSheet)
        .build(MINIFY);

    return styles;
}
