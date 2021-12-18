import React from "react"
import Questions from "./Components/Questions"
import "./App.css"
import { nanoid } from 'nanoid'

export default function App() {

const [data, setData] = React.useState([])

function findNanoId(id) {

  const refreshArr = data.map((data) => {
    
    const answersArr = data.answers.map((answers) => {
      if (id === answers.nanoId) {
        return {
          ...answers,
          isHeld: !answers.isHeld
        }
      } else {
        return {
          ...answers,
          isHeld: false
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
            </main>
  )
} 