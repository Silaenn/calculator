import React from "react";
import arrow from "../assets/images/arrow.gif";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  return (
    <div className="w-100 min-vh-100">
      <header
        className="inti"
        style={{
          marginTop: "120px",
        }}
      >
        <div className="containerL">
          <fieldset id="container">
            <form name="calculator">
              <input id="display" type="text" name="display" readOnly />
              <div className="justify-center flex flex-wrap">
                <input
                  className="button digits"
                  type="button"
                  value="7"
                  onClick="calculator.display.value += '7'"
                />
                <input
                  className="button digits"
                  type="button"
                  value="8"
                  onClick="calculator.display.value += '8'"
                />
                <input
                  className="button digits"
                  type="button"
                  value="9"
                  onClick="calculator.display.value += '9'"
                />
                <input
                  className="button mathButtons"
                  type="button"
                  value="+"
                  onClick="calculator.display.value += ' + '"
                />
                <br />
                <input
                  className="button digits"
                  type="button"
                  value="4"
                  onClick="calculator.display.value += '4'"
                />
                <input
                  className="button digits"
                  type="button"
                  value="5"
                  onClick="calculator.display.value += '5'"
                />
                <input
                  className="button digits"
                  type="button"
                  value="6"
                  onClick="calculator.display.value += '6'"
                />
                <input
                  className="button mathButtons"
                  type="button"
                  value="-"
                  onClick="calculator.display.value += ' - '"
                />
                <br />
                <input
                  className="button digits"
                  type="button"
                  value="1"
                  onClick="calculator.display.value += '1'"
                />
                <input
                  className="button digits"
                  type="button"
                  value="2"
                  onClick="calculator.display.value += '2'"
                />
                <input
                  className="button digits"
                  type="button"
                  value="3"
                  onClick="calculator.display.value += '3'"
                />
                <input
                  className="button mathButtons"
                  type="button"
                  value="x"
                  onClick="calculator.display.value += ' * '"
                />
                <br />
                <input
                  id="clearButton"
                  className="button"
                  type="button"
                  value="C"
                  onClick="calculator.display.value = ''"
                />
                <input
                  className="button digits"
                  type="button"
                  value="0"
                  onClick="calculator.display.value += '0'"
                />
                <input
                  className="button mathButtons"
                  type="button"
                  value="="
                  onClick="calculator.display.value = eval(calculator.display.value)"
                />
                <input
                  className="button mathButtons"
                  type="button"
                  value="/"
                  onClick="calculator.display.value += ' / '"
                />
              </div>
            </form>
          </fieldset>
        </div>{" "}
      </header>
    </div>
  );
};

export default HomePage;
