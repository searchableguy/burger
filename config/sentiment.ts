// A dictionary on top of affin-165
export const SENTIMENT_DICTIONARY: Record<string, number> = {
    // The internet is oversaturated with news about big tech companies. Please stop.
    google: -4,
    microsoft: -4,
    apple: -4,
    facebook: -4,
    twitter: -4,
    amazon: -4,
    disney: -4,
    ea: -4,

    // Anything about government is generally boring or sensationalist.
    government: -4,
    chinese: -4,

    // I don't live in US.
    america: -4,
    american: -4,
    california: -4,
    sf: -4,
    "san-fransico": -4,
    texas: -4,
    "u.s": -4,
    "u.s.": -4,
    
    // I use chrome. 
    safari: -4,

    taxes: -2,
    taxation: -2,
    religion: -4,

    // No crypto.
    crypto: -4,
    bitcoin: -4,
    etherium: -4,
    dogecoin: -4,

    windows: -2,
    reddit: -4,
    vs: -4, // Clickbaits.
    apology: -4,

    deno: 4,
    rust: 4,
    elixir: 4,

    // No more.
    GME: -10
}