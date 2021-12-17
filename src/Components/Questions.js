import React from "react"
import "./Questions.css"

export default function Questions({ data }) {
             

    const QaElements = data.map(elements => {

        return (
                <div className="container">
                        <h1 className="title-question">{elements.question} </h1>
                        <div className="answers">
                            {elements.answers.map(answers => {
                                return (<div className="select-answers">{answers.select}</div>)
                            })}
                        </div>

                    </div>
        )
    })

    return (
        <>{QaElements}</>
    )
}