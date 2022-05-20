import * as React from "react"
import { runtime } from "webpack"
import { Suggestions } from "./suggestions"

type suggestions_state = {
    guesses: string[]
    runtime: number
}

export default class DisplaySuggestions extends React.Component<suggestions_state>{


    render() {
        if (this.props.runtime < 0) {
            return (
                <>
                    <h2 style={{ paddingBottom: "15px" }}>Waiting for search...</h2>
                    <br></br><br></br>
                </>
            )
        } else {
            return (
                <div style={{ height: "5%" }}>
                    {this.props.guesses?.map((item, index) => {
                        return index < 5 ? <><div style={{ backgroundColor: "#585E6A", width: "95%", padding: "7px", borderRadius: "2px", margin: "auto" }}><p style={{ padding: "3px" }} key={item}>{item}</p></div><br></br></> : <></>
                    })}
                    <h2 style={{ padding: "15px" }}>Search time: {this.props.runtime?.toFixed(3)} ms </h2>
                </div>
            )
        }

    }
}