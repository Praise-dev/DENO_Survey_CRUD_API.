import Survey from "../models/Survey.ts"
import { RouterContext } from "../deps.ts"
import { renderView } from "../helpers.ts"
import Question from "../models/Question.ts"

class SiteController {
    async Surveys(ctx: RouterContext) {
        const surveys = await Survey.findAll()
        ctx.response.body = await renderView('surveys', { surveys })
    }

    async viewSurvey(ctx: RouterContext) {
        const id = ctx.params.id!
        const survey = await Survey.findById(id)
        if (!survey) {
            ctx.response.body = await renderView('notfound')
            return
        }
        const questions = await Question.findBySurvey(id)
        ctx.response.body = await renderView('survey', { survey, questions })
    }

    async submitSurvey(ctx: RouterContext) {
        const { value } = await ctx.request.body()
        const formData: URLSearchParams = value as URLSearchParams


    }
}


const siteController = new SiteController()
export default siteController