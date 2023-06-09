import PropTypes from "prop-types";
import { Component } from "react";

class WordleKeyboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="flex flex-col w-[500px] gap-1">
        <div className="flex flex-row justify-center gap-1">
          {"QWERTYUIOP".split("").map((letter, index) => (
            <button
              key={index}
              className={`flex justify-center items-center w-11 h-11 rounded
            text-black text-center font-bold
            ${
              this.props.keyboardState[letter] === -1
                ? "bg-slate-200 hover:bg-slate-400 focus:active:bg-slate-600"
                : this.props.keyboardState[letter] === 0
                ? "bg-slate-500 hover:bg-slate-600 focus:active:bg-slate-700"
                : this.props.keyboardState[letter] === 1
                ? "bg-yellow-300/90 hover:bg-yellow-500/90 focus:active:bg-yellow-700/90"
                : "bg-green-400 hover:bg-green-600 focus:active:bg-green-800"
            }`}
              onClick={this.props.keyboardCallback}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex flex-row justify-center gap-1">
          {"ASDFGHJKL".split("").map((letter, index) => (
            <button
              key={index}
              className={`flex justify-center items-center w-11 h-11 rounded
              text-black text-center font-bold
              ${
                this.props.keyboardState[letter] === -1
                  ? "bg-slate-200 hover:bg-slate-400 focus:active:bg-slate-600"
                  : this.props.keyboardState[letter] === 0
                  ? "bg-slate-500 hover:bg-slate-600 focus:active:bg-slate-700"
                  : this.props.keyboardState[letter] === 1
                  ? "bg-yellow-300/90 hover:bg-yellow-500/90 focus:active:bg-yellow-700/90"
                  : "bg-green-400 hover:bg-green-600 focus:active:bg-green-800"
              }`}
              onClick={this.props.keyboardCallback}
            >
              {letter}
            </button>
          ))}
        </div>
        <div className="flex flex-row justify-center gap-1">
          <button
            className="flex grow justify-center items-center w-11 h-11 rounded bg-slate-200 hover:bg-slate-400 focus:active:bg-slate-600
            text-black text-center font-bold text-sm"
            onClick={this.props.keyboardCallback}
          >
            Backspace
          </button>
          {"ZXCVBNM".split("").map((letter, index) => (
            <button
              key={index}
              className={`flex justify-center items-center w-11 h-11 rounded
              text-black text-center font-bold
              ${
                this.props.keyboardState[letter] === -1
                  ? "bg-slate-200 hover:bg-slate-400 focus:active:bg-slate-600"
                  : this.props.keyboardState[letter] === 0
                  ? "bg-slate-500 hover:bg-slate-600 focus:active:bg-slate-700"
                  : this.props.keyboardState[letter] === 1
                  ? "bg-yellow-300/90 hover:bg-yellow-500/90 focus:active:bg-yellow-700/90"
                  : "bg-green-400 hover:bg-green-600 focus:active:bg-green-800"
              }`}
              onClick={this.props.keyboardCallback}
            >
              {letter}
            </button>
          ))}
          <button
            className="flex grow justify-center items-center w-11 h-11 rounded bg-slate-200 hover:bg-slate-400 focus:active:bg-slate-600
            text-black text-center font-bold"
            onClick={this.props.keyboardCallback}
          >
            Enter
          </button>
        </div>
        {this.props.localeCode === "pl" && (
          <div className="flex flex-row justify-center gap-1">
            {"ĄĆĘŁŃÓŚŹŻ".split("").map((letter, index) => (
              <button
                key={index}
                className={`flex justify-center items-center w-11 h-11 rounded
            text-black text-center font-bold
            ${
              this.props.keyboardState[letter] === -1
                ? "bg-slate-200 hover:bg-slate-400 focus:active:bg-slate-600"
                : this.props.keyboardState[letter] === 0
                ? "bg-slate-500 hover:bg-slate-600 focus:active:bg-slate-700"
                : this.props.keyboardState[letter] === 1
                ? "bg-yellow-300/90 hover:bg-yellow-500/90 focus:active:bg-yellow-700/90"
                : "bg-green-400 hover:bg-green-600 focus:active:bg-green-800"
            }`}
                onClick={this.props.keyboardCallback}
              >
                {letter}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }
}

WordleKeyboard.propsTypes = {
  keyboardCallback: PropTypes.func,
  keyboardState: PropTypes.object,
};

export default WordleKeyboard;
