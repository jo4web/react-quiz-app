import React from "react"
import "./Questions.css"

export default function Questions({ data, findNanoId}) {
             

    const QaElements = data.map(elements => {

        return (
                <div className="container">
                    
                        <h1 className="title-question">{elements.question} </h1>
                        <div className="answers">
                            {elements.answers.map(answers => {
                                const style = {
                                    backgroundColor: answers.isHeld ? "blue" : ""
                                }
                                
                                return (
                                        <div onClick={() => findNanoId(answers.nanoId)} className="select-answers" style={style}>
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