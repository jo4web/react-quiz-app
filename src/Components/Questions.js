import React from "react"

export default function Questions() {
    
    const newArr = [{question: "what is you name", answer1: "Adios", answer2: "ola", answer3: "qualquer", answer4: "anyway"}, 
                    {question: "what is you car", answer1: "Gol", answer2: "Mercedes", answer3: "Fusca", answer4: "Monza"}
    ]           
    console.log(newArr[1].question)
    const QaElements = newArr.map(elements => {
        return (
                <div className="container">
                        <h1 className="title-question">{elements.question} </h1>
                        <div className="answers">
                            <div>{elements.answer1}</div>
                            <div>{elements.answer2}</div>
                            <div>{elements.answer3}</div>
                            <div>{elements.answer4}</div>
                        </div>

                    </div>
        )
    })
    return (
        <>{QaElements}</>
    )
}