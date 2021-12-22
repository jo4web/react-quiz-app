import React from "react"
import Questions from "./Components/Questions"
import "./App.css"
import { nanoid } from 'nanoid'

export default function App() {

const [data, setData] = React.useState([])
const [count, setCount] = React.useState(0)

function checkAnswers() {
  setData(prevData => prevData.map(data => {
    const newArr = data.answers.map(answers => {
      return answers.select === data.correct_answer ? {...answers, isCorrect: true} : {...answers, isCorrect: false}

    })
    return {
          ...data,
          answers: newArr
    }
  }))
}

function findNanoId(id) {
   const refreshArr = data.map((data) => {
    const answersArr = data.answers.map((answers) => {
      if (id === answers.nanoId) {
        if (answers.select === data.correct_answer) {
          setCount(count + 1)
          if (answers.isHeld) {
            setCount(count - 1)
          }
        }
        return {
          ...answers,
          isHeld: !answers.isHeld
        }
      } else {
        return {
          ...answers
        }
      }
    })
    return {
      ...data,
      answers: answersArr
    }
})

    setData(refreshArr)

}


React.useEffect( () => {
  fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  .then(res => res.json())
    .then(data => {
      const newData = JSON.parse(JSON.stringify(data.results))
      const newArr = newData.map(data => {
        data.answers = [...data.incorrect_answers, data.correct_answer]

        const updateArr = data.answers.map(answers => {
          return {
            select: answers,
            isHeld: false,
            nanoId: nanoid()
          }
        })
        return {
          ...data,
          answers: updateArr
        }
      })

      setData(newArr)
    }
    )
}, [])

  return (
        <main>
              <Questions data={data} findNanoId={findNanoId} />
              <button onClick={checkAnswers} className="check-button">Check answers</button>
            </main>
  )
} 