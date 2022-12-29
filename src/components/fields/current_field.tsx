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
    
    const [dict, setDict] = React.useState(current_dict.split(' ').filter(i => i));
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

    const DeleteWord = (ans:string, index:number) =>{
        let temp = sessionStorage.getItem("DICTIONARY");
        let remove: string = ans;
        if(temp.includes(remove)) console.log("TRUEEE");
        temp = temp.replace(remove, '');
        dict.splice(index, 1);
        setDict(dict);
        sessionStorage.setItem("DICTIONARY", temp);
        current_dict = dict.toString();
    }

    const deleteDictionary = (e: any) => {
        sessionStorage.removeItem("DICTIONARY");
        current_dict = ""
    }

    const poss = possible;
    const currentWord = word;
    const time = search_time;
    let dic = dict;
    //TODOOOOO regex check the dictionary fields (no special characters, only letters)
    return (
        <>
            <div className="main-container">
                <br></br>
                <div className="first-box">
                    {
                        sessionStorage.getItem("DICTIONARY") !== "" ?
                            <h3>You have {dic.length - 1} words in dictionary.</h3>
                            :
                            <h3>Start adding words to dictionary!</h3>
                    }
                    <label style={{ fontSize: "20px", paddingBottom: "60px" }}>Enter word:&emsp;
                        <input onChange={TextEntered}></input>
                    </label>
                    <h1>{currentWord}</h1>
                    <DisplaySuggestions guesses={poss} runtime={time}></DisplaySuggestions>
                    
                </div>
                <br></br>
                <div style={{padding:"50px"}}></div>
                <div className="second-box">
                    <div style={{padding:"30px", textAlign:"center"}}>
                        <h4 style={{ paddingLeft: "10px" }}><br></br>Enter words for dictionary.<br></br><br></br>Separate each word with a space.</h4>
                    </div>
                    
                    <textarea placeholder = "Enter words to add to dictionary in this text area..." onChange={UpdateDictionary}></textarea>
                    <br></br><br></br><div style={{padding:"40px"}}></div>
                    <div className="single-col">
                        <div className = "button-rows">
                            <form className="button-row" onSubmit={SubmitDictionary}>
                                <button>Update Dictionary</button>
                            </form>
                            <br></br>
                            <form className="button-row" onSubmit={AddRandomWords}>
                                <button>Generate Random Words</button>
                            </form>
                            <br></br>
                            <form className="button-row" onSubmit={deleteDictionary}>
                                <button >Delete Dictionary</button>
                            </form>
                        </div>
                        <div style={{padding:"50px"}}></div>
                    </div>
                    <br></br><br></br>
                    <div style={{padding:"5px"}}></div>
                    {(dic.length !== 0)?
                        <div className="third-box">
                            <h2 style={{textAlign:"center", color:"black"}}>Dictionary</h2>
                            {dic?.slice(1).map((word: any, index: any)=>{
                                return(
                                    <>
                                        <form className="word-row">
                                            <p className="row-flex-item">Word {index+1}: </p>
                                            <h3 className="row-flex-item">{word}</h3>
                                            <div className="row-flex-item">
                                                <button onClick={ e => {DeleteWord(word, index+1)}}>Delete Word</button>
                                            </div>
                                        </form>
                                    </>
                                )
                            })}
                        </div>
                        :
                        <></>
                    }   
                    <div style={{padding:"20px"}}></div>
                </div>
            
                <br></br><br></br><br></br>
            </div>
        </>
    );
}