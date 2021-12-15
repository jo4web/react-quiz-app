import React from "react"
import Questions from "./Components/Questions"

export default function App() {

const [data, setData] = React.useState([])

React.useEffect( () => {
  fetch("https://opentdb.com/api.php?amount=5&type=multiple")
  .then(res => res.json())
    .then(data => {
      const newData = JSON.parse(JSON.stringify(data.results))
      setData(newData)
    }
    )
}, [])

  
  return (
        <main>
              <Questions data={data}/>
            </main>
  )
} 