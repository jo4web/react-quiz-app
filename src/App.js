import React from "react"
import Questions from "./Components/Questions"
import "./App.css"
import { nanoid } from 'nanoid'

export default function App() {

const [fetchData, setFetchData] = React.useState([])
const [resetData, setResetData] = React.useState(0)

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
      setFetchData(newArr)
    }
    )
}, [resetData])

const [data, setData] = React.useState(JSON.parse(localStorage.getItem('localData')) || [])
const [count, setCount] = React.useState(0)
const [check, setCheck] = React.useState(false)

function startQuiz() {
  setData(fetchData)
}

function playAgain() {
  localStorage.removeItem('localData')
  setResetData(resetData + 1)
  setData(fetchData)
  setCount(0)
  setCheck(false)
}

function checkAnswers() {
  setData(prevData => prevData.map(data => {
    const newArr = data.answers.map(answers => {
      return answers.select === data.correct_answer ? 
        {...answers, isCorrect: true} : {...answers, isCorrect: false}

    })
    return {
          ...data,
          answers: newArr
    }
  }))
  setCheck(true)
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
    localStorage.setItem('localData', JSON.stringify(refreshArr))

}


return data.length <= 0 ? 
      (
        <main>
            <div className="start-quiz">
              <h1>Quizzical</h1>
              <p>Play our Quiz with random questions about everything!</p>
              <button className="check-button" onClick={startQuiz}>Start Quiz</button>
            </div>
          </main> 
          )
          :
          (
            <main>
                <Questions data={data} findNanoId={findNanoId} />
                <div className="footer">
                  {check && <h3>You scored {count}/5 correct answers</h3>}
                  <button onClick={check ? playAgain : checkAnswers} className="check-button">{check ? "Play Again" : "Check answers"}</button>
                </div>
              </main>
              )
  

  
} 