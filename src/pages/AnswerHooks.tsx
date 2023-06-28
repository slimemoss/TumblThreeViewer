import React from "react"

export interface Answer {
  question: string,
  answer: string,
}

export interface AnswerHooks {
  answer: Answer[]
  setAnswer: (data: string) => void
}

export const useAnswer = (): AnswerHooks => {
  const [answer, setAnswer] = React.useState<Answer[]>([])
  
  const setAnswerString = (data: string): void => {
    const post = data.split('Post id: ')
    const result: Answer[] = []

    post.forEach((p) => {
      const line = p.split('\n')

      if(line.length > 8) {
        const e: Answer = {question: line[7], answer: line[8]}
        result.push(e)
      }
    })

    setAnswer(result)
  }

  return {answer, setAnswer: setAnswerString}
}
