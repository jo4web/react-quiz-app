import React from "react"

export default function Questions({ data }) {
             
    console.log(data)

    const QaElements = data.map(elements => {
        return (
                <div className="container">
                        <h1 className="title-question">{elements.question} </h1>
                        <div className="answers">
                            <div>{elements.incorrect_answers[0]}</div>
                            <div>{elements.correct_answer}</div>
                            <div>{elements.incorrect_answers[1]}</div>
                            <div>{elements.incorrect_answers[2]}</div>
                        </div>

                    </div>
        )
    })

    return (
        <>{QaElements}</>
    )
}