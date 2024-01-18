import React, { useState } from "react";
import arrow from "../assets/images/arrow.gif";
import { Input } from "@/components/ui/input";

const btnValues = [
  ["C", "DEL", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "+/-", "="],
];

const getButtonClassName = (btn) => {
  // Add conditions based on button values to determine the class name
  switch (btn) {
    case "C":
    case "DEL":
    case "%":
    case "/":
    case "X":
    case "-":
    case "+":
    case ".":
    case "+/-":
    case "=":
      return "button mathButtons";
    default:
      return "button digits";
  }
};

const HomePage = () => {
  const [displayValue, setDisplayValue] = useState("");

  const handleButtonClick = (btn) => {
    // Handle different button clicks here
    if (btn === "C") {
      setDisplayValue("");
    } else if (btn === "DEL") {
      setDisplayValue(displayValue.slice(0, -1));
    } else if (btn === "=") {
      try {
        setDisplayValue(eval(displayValue).toString());
      } catch (error) {
        setDisplayValue("Error");
      }
    } else if (btn === "%") {
      try {
        setDisplayValue((eval(displayValue) / 100).toString());
      } catch (error) {
        setDisplayValue("Error");
      }
    } else if (btn === "+/-") {
      // Toggle antara bilangan positif dan negatif
      setDisplayValue((prevValue) => {
        if (prevValue.startsWith("-")) {
          return prevValue.slice(1); // Hilangkan tanda negatif jika sudah ada
        } else {
          return "-" + prevValue; // Tambahkan tanda negatif jika belum ada
        }
      });
    } else {
      const clickedButton = btn === "X" ? "*" : btn;
      setDisplayValue((prevValue) => prevValue + clickedButton);
    }
  };

  return (
    <div className="w-100 min-vh-100">
      <header
        className="inti"
        style={{
          marginTop: "90px",
        }}
      >
        <div className="flex justify-center">
          <h3
            className=""
            style={{
              fontFamily: "Relaway",
            }}
          >
            Kalkulator Genius
          </h3>
        </div>
        <div className="containerL">
          <fieldset id="container">
            <form name="calculator">
              <input
                id="display"
                type="text"
                name="display"
                value={displayValue}
              />
              <div className="justify-center flex flex-wrap">
                {btnValues.flat().map((btn, i) => (
                  <button
                    className={getButtonClassName(btn)}
                    type="button"
                    onClick={() => handleButtonClick(btn)}
                    value={btn}
                    key={i}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </form>
          </fieldset>
        </div>{" "}
      </header>
    </div>
  );
};

export default HomePage;
