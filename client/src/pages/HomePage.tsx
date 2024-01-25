import React, { useEffect, useState } from "react";
import arrow from "../assets/images/arrow.gif";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { warna } from "@/data/index";
import body from "@/assets/images/body.png";

const btnValues = [
  ["C", "DEL", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "+/-", "="],
];

// const warna = [{ badan: "green", angka: "red", operator: "yellow" }];

const HomePage = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [calculatorColor, setCalculatorColor] = useState(null);
  const [nextColor, setNextColor] = useState("c");
  const [isColorApplied, setIsColorApplied] = useState(false);

  const applyNewColor = () => {
    setCalculatorColor(nextColor);
    setIsColorApplied(true); // Setel menjadi true setelah warna baru diterapkan
  };

  const initializeNextColor = (category, id) => {
    setNextColor(warna[category][id]);
  };

  useEffect(() => {
    if (nextColor) {
      applyNewColor();
    }
  }, [nextColor]);

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
        return `button mathButtons`;
      default:
        return "button digits";
    }
  };

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
    <div className="w-100">
      <header
        className="inti"
        style={{
          marginTop: "90px",
          backgroundColor: "",
        }}
      >
        <div className="flex justify-center">
          <h3
            className="ml-6"
            style={{
              fontFamily: "Geneva",
            }}
          >
            Kalkulator Genius
          </h3>
        </div>
        <div className="containerL">
          <div className="warna mt-4">
            <h5 className="justify-center flex">Tentukan Warna Favoritmu</h5>
            <Input placeholder="Cari Jenis Warna" className="mb-3" />
            <div className="max-h-80 overflow-y-auto text-slate-200 text-sm">
              <div className="mt-1 rounded-md ">
                {Object.keys(warna).map((category) => (
                  <div key={category}>
                    {Object.keys(warna[category]).map((id) => (
                      <div key={id}>
                        <div
                          className="badan"
                          style={{
                            backgroundColor: `${warna[category][id].badan}`,
                          }}
                        >
                          <p className="bg-slate-700 -tracking-tight hover-text">
                            {warna[category][id].badan}
                          </p>
                        </div>
                        <div
                          className="angka"
                          style={{
                            backgroundColor: `${warna[category][id].angka}`,
                          }}
                        >
                          <p className="bg-slate-700 -tracking-tight hover-text">
                            {warna[category][id].angka}
                          </p>
                        </div>
                        <div
                          className="operator"
                          style={{
                            backgroundColor: `${warna[category][id].operator}`,
                          }}
                        >
                          <p className="bg-slate-700 -tracking-tight hover-text">
                            {warna[category][id].operator}
                          </p>
                        </div>

                        <Button
                          className="mt-3 mb-5 bg-violet-950"
                          onClick={() => {
                            applyNewColor();
                            initializeNextColor(category, id);
                          }}
                        >
                          Ganti Warna
                        </Button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <fieldset
            id="container"
            style={{
              backgroundColor: isColorApplied ? calculatorColor.badan : "",
            }}
          >
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
                    style={{
                      backgroundColor:
                        isColorApplied &&
                        (btn >= "0" && btn <= "9"
                          ? calculatorColor && calculatorColor.angka
                          : btn === "%" ||
                            btn === "/" ||
                            btn === "X" ||
                            btn === "-" ||
                            btn === "+" ||
                            btn === "." ||
                            btn === "+/-" ||
                            btn === "=" ||
                            btn === "C" ||
                            btn === "DEL"
                          ? calculatorColor && calculatorColor.operator
                          : ""),
                    }}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </form>
          </fieldset>

          <div className="petunjuk mt-4">
            <h5 className="flex justify-center ">Petunjuk Mengubah Warna</h5>
            <div className="flex justify-center mt-3 mb-3">
              <img src={body} width={300} alt="" />
            </div>

            <ol>
              <li
                style={{
                  listStyle: "-moz-initial",
                }}
              >
                Dalam mencari warna hanya terdapat beberapa opsi, anda bisa
                ketikan ini :
                <br />
              </li>
              <ul
                style={{
                  marginTop: "5px",
                  marginLeft: "-25px",
                }}
              >
                <li className="color">Pastel</li>
                <li className="color">Cold</li>
                <li className="color">Cold</li>
                <li className="color">Cold</li>
              </ul>
              <li
                style={{
                  listStyle: "-moz-initial",
                  marginTop: "5px",
                }}
              >
                Sekarang Tentukan warna Favorit yang kamu sukai
              </li>
            </ol>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
