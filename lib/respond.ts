import {
    Status,
    STATUS_TEXT,
} from "../deps.ts"

function json<T>(object: T, init?: ResponseInit) {
    const body = JSON.stringify(object);
    return new Response(body, {
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            ...init?.headers,
        },
        status: init?.status ?? Status.OK,
        statusText: init?.statusText ?? STATUS_TEXT.get(Status.OK),
    });
}

function html(body: string, init?: ResponseInit) {
    return new Response(body, {
        headers: {
            "Content-Type": "text/html; charset=UTF-8",
            ...init?.headers,
        },
        status: init?.status ?? Status.OK,
        statusText: init?.statusText ?? STATUS_TEXT.get(Status.OK),
    });
}

export const respond = {
    html,
    json
}