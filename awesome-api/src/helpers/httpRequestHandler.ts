import * as express from 'express';

export interface HttpRequestInterface {
    path: string;
    method: string;
    pathParams: any;
    queryParams: any;
    body: any;
    headers: any;
}

/**
 * handle http request
 * @param req 
 * @returns HttpRequestInterface
 */
export default function handleHttpRequest(req: express.Request): HttpRequestInterface {
    return Object.freeze({
        path: req.path,
        method: req.method,
        pathParams: req.params,
        queryParams: req.query,
        body: req.body,
        headers: req.headers
    });
}
