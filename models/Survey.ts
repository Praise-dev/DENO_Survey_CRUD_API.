import { surveyCollection } from "../mongo.ts"
import BaseModel from "./BaseModel.ts"

export default class Survey extends BaseModel {
    public id: string = ""

    constructor(
        public userId: string,
        public name: string,
        public description: string) {
        super()
    }

    static async findAll(): Promise<Survey[]> {
        const surveys = await surveyCollection.find()
        return surveys.map((survey: any) => Survey.prepare(survey))
    }

    static async findByUser(userId: string): Promise<Survey[]> {
        const surveys = await surveyCollection.find({ userId })
        return surveys.map((survey: any) => Survey.prepare(survey))
    }

    static async findById(id: string): Promise<Survey | null> {
        const survey = await surveyCollection.findOne({ _id: { $oid: id } })
        if (!survey) {
            return null
        }
        return Survey.prepare(survey)
    }

    async create() {
        delete this.id
        const { $oid } = await surveyCollection.insertOne(this)
        this.id = $oid
        return this
    }

    async update({ name, description }: { name: string, description: string }) {
        await surveyCollection.updateOne({ _id: { $oid: this.id } }, { $set: { name, description } })
        this.name = name
        this.description = description
        return this
    }

    async delete() {
        return surveyCollection.deleteOne({ _id: { $oid: this.id } })
    }

    protected static prepare(data: any): Survey {
        data = super.prepare(data)
        const survey = new Survey(data.userId, data.name, data.description)
        survey.id = data.id
        return survey
    }

}