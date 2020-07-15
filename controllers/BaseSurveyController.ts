import { RouterContext } from "../deps.ts"
import Survey from "../models/Survey.ts"
import User from "../models/User.ts"


export default class BaseSurveyController {
    async findSurveyOrFail(id: string, ctx: RouterContext): Promise<Survey | null> {
        const survey = await Survey.findById(id)
        if (!survey) {
            ctx.response.status = 404
            ctx.response.body = { message: 'incorrect ID' }
            return null
        }
        //authorization
        const user = ctx.state.user as User
        if (survey.userId !== user.id) {
            ctx.response.status = 403
            ctx.response.body = {
                message: "You don't have permission to view/mutate this survey"
            }
            return null
        }
        return survey
    }
}