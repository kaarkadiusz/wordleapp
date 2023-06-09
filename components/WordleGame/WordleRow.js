"use client";
import PropTypes from "prop-types";
import { Component } from "react";

class WordleRow extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="wordle-row grid grid-cols-5 gap-2
      uppercase my-1 first-of-type:mt-0 last-of-type:mb-0 select-none">
        {this.props.word
          .padEnd(5, " ")
          .split("")
          .map((letter, index) => (
            <div
              className={`w-16 h-16 flex justify-center items-center 
              text-3xl font-bold rounded 
              ${
                letter !== " " ? "scale-up-center " : ""
              } 
              ${
                this.props.evaluation.length === 0 ? "bg-slate-200" : 
                this.props.evaluation[index] === 0 ? "bg-slate-500" :
                this.props.evaluation[index] === 1 ? "bg-yellow-300/90" : "bg-green-400"
              }
              ${
                this.props.evaluation.length === 0 ? "text-black" : "text-white" 
                
              }
              `}
              key={index}
            >
              {letter !== "" ? letter : ""}
            </div>
          ))}
      </div>
    );
  }
}

WordleRow.defaultProps = { word: "", evaluation: [] };
WordleRow.propsTypes = { word: PropTypes.string, evaluation: PropTypes.array };

export default WordleRow;
