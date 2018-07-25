const Hapi = require('hapi')
const next = require('next')
const { parse } = require('url')

const nextHandlerWrapper = app => {
    const handler = app.getRequestHandler()
    return async ({ raw, url }, h) => {
        await handler(raw.req, raw.res, url)
        return h.close
    }
}
const defaultHandlerWrapper = app => async ({ raw: { req, res }, url }) => {
    const { pathname, query } = parse(url, true)
    return app.renderToHTML(req, res, pathname, query)
}

const pathWrapper = (app, pathName, opts) => async ({ raw, query, params }) => {
    return app.renderToHTML(raw.req, raw.res, pathName, { ...query, ...params }, opts)
}

const port = process.env.PORT || 3333;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dev})

const server = new Hapi.Server({port});

app.prepare()
    .then(async () => {
        server.route({
            method: 'GET',
            path: '/_next/{p*}', /* next specific routes */
            handler: nextHandlerWrapper(app)
        })

        server.route({
            method: '*',
            path: '/{all*}',
            handler: nextHandlerWrapper(app)
        })

        try {
            await server.start()
            console.log(`> Ready on http://localhost:${port}`)
        } catch (error) {
            console.log('Error starting server')
            console.log(error)
        }
    }, (err) => console.error(err))