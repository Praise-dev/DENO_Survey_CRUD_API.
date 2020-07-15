import { Router, RouterContext } from './deps.ts'
import questionController from "./controllers/QuestionsController.ts"
import authController from './controllers/AuthController.ts'
import surveyController from './controllers/surveyController.ts'
import { authMiddleware } from './middlewares/authMiddleware.ts'
import siteController from './controllers/SiteController.ts'
const router = new Router()

//home route
router.get('/', siteController.Surveys)

router.get('/survey/:id', siteController.viewSurvey)

router.post('/survey/:id', siteController.submitSurvey)



//login
router.post('/api/login', authController.login)

//register
router.post('/api/register', authController.register)

//FOR SURVEY
//get all surveys
router.get('/api/survey', authMiddleware, surveyController.getAllForUser.bind(surveyController))
//get one survey
router.get('/api/survey/:id', authMiddleware, surveyController.getSingle.bind(surveyController))
//create a survey
router.post('/api/survey', authMiddleware, surveyController.create.bind(surveyController))
//update a survey
router.put('/api/survey/:id', authMiddleware, surveyController.update.bind(surveyController))
//delete a survey
router.delete('/api/survey/:id', authMiddleware, surveyController.delete.bind(surveyController))


//get all Questions
router.get('/api/survey/:surveyId/questions', authMiddleware, questionController.getBySurvey.bind(questionController))
//get one question
router.get('/api/question/:id', authMiddleware, questionController.getSingle.bind(questionController))
//create a question
router.post('/api/question/:surveyId', authMiddleware, questionController.create.bind(questionController))
//update a question
router.put('/api/question/:id', authMiddleware, questionController.update.bind(questionController))
//delete a question
router.delete('/api/question/:id', authMiddleware, questionController.delete.bind(questionController))


export default router