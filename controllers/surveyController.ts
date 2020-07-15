import { RouterContext } from "../deps.ts"
import Survey from "../models/Survey.ts"
import BaseSurveyController from "./BaseSurveyController.ts"
import User from "../models/User.ts"

class SurveyController extends BaseSurveyController {
    async getAllForUser(ctx: RouterContext) {
        const user = ctx.state.user as User
        const surveys = await Survey.findByUser(user.id)
        ctx.response.body = surveys
    }

    async getSingle(ctx: RouterContext) {
        const id = ctx.params.id!
        const survey = await this.findSurveyOrFail(id, ctx)
        if (survey) {
            ctx.response.body = survey
        }

    }

    async create(ctx: RouterContext) {
        const { value: { name, description } } = await ctx.request.body()

        const user = ctx.state.user as User

        const survey = new Survey(user.id, name, description)
        await survey.create()

        ctx.response.status = 201
        ctx.response.body = {
            message: "survey successfully created",
            survey
        }
    }
    async update(ctx: RouterContext) {
        const id = ctx.params.id!
        const survey = await this.findSurveyOrFail(id, ctx)
        if (survey) {
            const { value: { name, description } } = await ctx.request.body()
            await survey.update({ name, description })
            ctx.response.body = survey
        }
    }
    async delete(ctx: RouterContext) {
        const id = ctx.params.id!
        const survey = await this.findSurveyOrFail(id, ctx)
        if (survey) {
            await survey.delete()
            ctx.response.status = 204
        }
    }

}
const surveyController = new SurveyController()
export default surveyController