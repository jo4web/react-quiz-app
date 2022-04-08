import React from "react"
import "./Questions.css"

export default function Questions({ data, findNanoId}) {

    const QaElements = data.map((elements, index) => {
        return (
                <div key={elements.correct_answer} className="container">
                    <h1 className="title-question">{elements.question} </h1>
                    <div className="answers">
                        {elements.answers.map(answers => {
                            var style = {
                                backgroundColor: answers.isHeld ? "#D6DBF5" : "",
                                border: answers.isHeld ? "none" : ""
                            }
                            if (answers.isCorrect !== undefined) {
                                if (answers.isCorrect) {
                                    style.backgroundColor = "#94D7A2"
                                    style.border = "none"
                                } else {
                                    style.backgroundColor = answers.isHeld ? "#F8BCBC" : ""
                                    style.border = answers.isHeld ? "none" : ""
                                    style.color = answers.isHeld ? "#293264" : ""
                                    style.opacity = answers.isHeld ? "0.5" : "0.5"
                                }
                            }
                            
                            return (
                                    <div key={answers.nanoId} onClick={() => findNanoId(answers.nanoId, index)} className="select-answers" style={style}>
                                        {answers.select}
                                    </div>
                                    )
                        })}
                    </div>
                </div>
        )
    })

    return (
        <>{QaElements}</>
    )
}