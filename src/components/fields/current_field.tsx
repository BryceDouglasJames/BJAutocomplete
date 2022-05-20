import * as React from "react"
import { SuffixTrie } from "../../assets/suffix_trie";
import DisplaySuggestions from "../suggestions/display_suggestions";
import { random_words } from "./words"
import { Suggestions } from "../suggestions/suggestions";
import "./fields.css"

interface AutoComplete {
    searchTree: SuffixTrie;
}

export default function CurrentField(): JSX.Element {
    let possible: string[];
    let search_time: number;
    let current_dict = "";

    sessionStorage.getItem("DICTIONARY") !== null ? current_dict = sessionStorage.getItem("DICTIONARY") : sessionStorage.setItem("DICTIONARY", "");
    const [dict, setDict] = React.useState(current_dict.split(" "));
    const [word, setWord] = React.useState("");
    [[possible], search_time] = Suggestions(word, dict);


    const TextEntered = (e: { target: { value: string; }; }) => {
        let current = e.target.value;
        setWord(current.toLowerCase());
    }

    const UpdateDictionary = (e: { target: { value: any; }; }) => {
        let current: string = e.target.value;
        current_dict = current;
    }

    const SubmitDictionary = (e: any) => {
        let s = sessionStorage.getItem("DICTIONARY")
        let list = current_dict + " " + s;
        if (current_dict === s) {
            e.preventDefault()
            alert("Please enter words in the dicionary box!");
        } else {
            let temp = list.split(" ")
            temp.forEach(word => {
                (s.includes(word.toLowerCase())) ? s = s : s += " " + word.toLowerCase();
            })
            sessionStorage.setItem("DICTIONARY", s);
        }
    }

    const AddRandomWords = (e: any) => {
        let s = "";
        let min1 = Math.ceil(1);
        let max1 = Math.floor(10);
        let seed1 = Math.floor(Math.random() * (max1 - min1) + min1);
        let word_set = random_words.split("    ")
        let temp = sessionStorage.getItem("DICTIONARY");
        for (var i = 0; i < seed1 * 10; i++) {
            let min = Math.ceil(0);
            let max = Math.floor(2001);
            let seed = Math.floor(Math.random() * (max - min) + min);
            if (!temp.includes(word_set[seed])) s = s + " " + word_set[seed]
        }
        s = temp + s
        sessionStorage.setItem("DICTIONARY", s.toLowerCase());
    }

    const deleteDictionary = (e: any) => {
        sessionStorage.removeItem("DICTIONARY");
        current_dict = ""
    }

    const poss = possible;
    const currentWord = word;
    const time = search_time;

    //TODOOOOO regex check the dictionary fields (no special characters, only letters)
    return (
        <>
            <br></br>
            <div className="first-box">
                {
                    sessionStorage.getItem("DICTIONARY") != "" ?
                        <h3>You have {current_dict.split(" ").length - 1} words in dictionary.</h3>
                        :
                        <h3>Start adding words to dictionary!</h3>
                }
                <label style={{ fontSize: "20px", paddingBottom: "60px" }}>Enter word:&emsp;
                    <input onChange={TextEntered}></input>
                </label>
                <h1>{currentWord}</h1>
                <DisplaySuggestions guesses={poss} runtime={time}></DisplaySuggestions>
                {
                }
            </div>
            <br></br>
            <div className="second-box">
                <div className="double-cols">
                    <p style={{ padding: "5px" }}>Enter words for dictionary.<br></br><br></br><br></br>Seperate each word with a space.</p>
                    <form onSubmit={SubmitDictionary}>
                        <button>Update Dictionary</button>
                    </form>
                    <br></br>
                    <form onSubmit={AddRandomWords}>
                        <button>Generate Random Words</button>
                    </form>
                    <br></br>
                    <form onSubmit={deleteDictionary}>
                        <button >Delete Dictionary</button>
                    </form>

                </div>
                <br></br><br></br>
                <input style={{ width: "85%", maxWidth: "95%" }} onChange={UpdateDictionary}></input>
                <br></br><br></br>
            </div>
        </>
    );
}