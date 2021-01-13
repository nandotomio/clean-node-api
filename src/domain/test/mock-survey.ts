import { SurveyModel } from '@/domain/models/survey'
import { AddSurveyParams } from '@/domain/usecases/survey/add-survey'

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    answer: 'any_answer'
  },{
    answer: 'other_answer',
    image: 'any_image'
  }],
  date: new Date()
})

export const mockSurveyModel = (): SurveyModel => ({
  id: 'any_id',
  ...mockAddSurveyParams()
})

export const mockSurveyModels = (): SurveyModel[] => {
  return [
    { ...mockSurveyModel() },
    {
      id: 'other_id',
      question: 'other_question',
      answers: [{
        image: 'other_image',
        answer: 'other_answer'
      }],
      date: new Date()
    }
  ]
}
