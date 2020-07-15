import { Application, Router, RouterContext } from './deps.ts'
import router from './router.ts'
import { staticFileMiddleware } from './middlewares/StaticFileMiddleware.ts'

const app = new Application()


app.use(router.routes())
app.use(router.allowedMethods())
app.use(staticFileMiddleware)

app.addEventListener('listen', ({ hostname, port, secure }) => {
    console.log(`
    Listening on ${secure ? 'https://' : 'http://'}${hostname || 'localhost'}:${port}`)
})

//error handling?
app.addEventListener('error', e => {
    console.log(e.error)
})
await app.listen({ port: 8000 })

//`deno run --allow-net --unstable --allow-read --allow-write --allow-env --allow-plugin server.ts