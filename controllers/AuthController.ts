import { hashSync, compareSync, RouterContext, Payload, setExpiration, Jose, makeJwt } from '../deps.ts'
import User from '../models/User.ts'

const header: Jose = {
    alg: "HS256",
    typ: "JWT",
};



class AuthController {
    async login(ctx: RouterContext) {
        console.log(await ctx.request.body())
        const { value: { email, password } } = await ctx.request.body()
        //validation
        if (!email || !password) {
            ctx.response.status = 422
            ctx.response.body = {
                message: "Please provide email and password"
            }
            return
        }

        let user = await User.findOne({ email })
        if (!user) {
            ctx.response.status = 422
            ctx.response.body = {
                message: "Incorrect email"
            }
            return
        }

        if (!compareSync(password, user.password)) {
            ctx.response.status = 422
            ctx.response.body = {
                message: "Incorrect password"
            }
            return
        }

        const payload: Payload = {
            iss: user.email,
            exp: setExpiration(new Date().getTime() + (60 * 6) * 10000),
        };

        const jwt = makeJwt({ key: Deno.env.get("JWT_SECRET_KEY")!, header, payload })

        ctx.response.body = {
            id: user.id,
            name: user.name,
            email: user.email,
            jwt
        }


    }

    async register(ctx: RouterContext) {
        const { value: { name, email, password } } = await ctx.request.body()
        console.log({ email })
        let user = await User.findOne({ email })
        if (user) {
            ctx.response.status = 422
            ctx.response.body = {
                message: "Email is already in use"
            }
            return
        }
        const hashedPassword = hashSync(password)
        user = new User({ name, email, password: hashedPassword })
        await user.save()
        ctx.response.status = 201
        ctx.response.body = {
            id: user.id,
            name: user.name,
            email: user.email
        }

    }

    logout() {

    }
}

const authController = new AuthController()

export default authController