import { RouterContext } from "../deps.ts"
import { validateJwt } from "../deps.ts"
import User from "../models/User.ts"

export const authMiddleware = async (ctx: RouterContext, next: Function) => {
    const header = ctx.request.headers

    const authHeader = header.get('Authorization')
    if (!authHeader) {
        ctx.response.status = 401
        ctx.response.body = { message: 'unauthorized' }
        return
    }
    const jwt = authHeader.split(' ')[1]
    if (!authHeader) {
        ctx.response.status = 401
        return
    }
    const data = await validateJwt(jwt, Deno.env.get("JWT_SECRET_KEY")!, { critHandlers: {} })
    const payload = JSON.parse(JSON.stringify(data)).payload

    if (data) {
        //console.log(data)
        const user = await User.findOne({ email: payload.iss })
        ctx.state.user = user
        await next()
    }
    else {
        ctx.response.status = 401
    }

}