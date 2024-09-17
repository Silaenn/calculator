import React, { useEffect, useState, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { warna } from "../data/index.ts";
import { body, math, smk, noData, sound } from "@/assets/images/index.ts";
import { evaluate } from "mathjs";

// ini merupakan deskripsi nilai di kalkulator nya yg berupa operator dan angka nya
const btnValues = [
  ["C", "DEL", "%", "÷"],
  [7, 8, 9, "×"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "+/-", "="],
];

// tes

type calculator = {
  badan: string;
  angka: string;
  operator: string;
};

const HomePage = () => {
  // untuk state displayValue input kalkulator
  const [displayValue, setDisplayValue] = useState("");

  // untuk state mengubah warna
  const [calculatorColor, setCalculatorColor] = useState<calculator>({
    badan: "",
    angka: "",
    operator: "",
  });

  const [nextColor, setNextColor] = useState<calculator>({
    badan: "",
    angka: "",
    operator: "",
  });

  const [isColorApplied, setIsColorApplied] = useState(false);

  // untuk state pencarian warna
  const [searchTerm, setSearchTerm] = useState("");

  // ini fungsi nya membuat suara klik pada kalkulator nya
  const audioRef = useRef<HTMLAudioElement>(null);
  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to start
      audioRef.current.play();
    }
  };

  // mengambil
  const handleSearchChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearchTerm(e.target.value);
  };

  // logika untuk mengubah warna kalkulator nya sesuai dengan warna yg telah di tentukan
  const initializeNextColor = (category: string, id: string) => {
    const color = warna[category][id] as calculator;
    setNextColor(color);
    console.log("warna", color);
  };

  const applyNewColor = () => {
    setIsColorApplied(true);

    setCalculatorColor(nextColor);

    localStorage.setItem("calculatorColor", JSON.stringify(nextColor));
  };

  useEffect(() => {
    if (nextColor) {
      applyNewColor();
    }
  }, [nextColor]);

  useEffect(() => {
    const storedColor = localStorage.getItem("calculatorColor");
    if (storedColor) {
      setCalculatorColor(JSON.parse(storedColor));
      setIsColorApplied(true);
    }
  }, []);

  // memeberikan css pada button angka dan operator nya
  const getButtonClassName = (btn: string | number) => {
    switch (btn) {
      case "C":
      case "DEL":
      case "%":
      case "÷":
      case "×":
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

  const getButtonStyle = (btn: string | number) => {
    if (!isColorApplied) return {};
    if (btn >= "0" && btn <= "9") {
      return { backgroundColor: calculatorColor.angka };
    } else if (
      ["%", "÷", "×", "-", "+", ".", "+/-", "=", "C", "DEL"].includes(
        btn as string
      )
    ) {
      return { backgroundColor: calculatorColor.operator };
    }
    return {};
  };

  //fungsi nya untuk menambahkan operator baru saat di klik Scientific Calculator
  const [scientificMode, setScientificMode] = useState(false);
  const [additionalButtons, setAdditionalButtons] = useState<
    { value: string }[]
  >([]);

  const handleScientificModeToggle = () => {
    setScientificMode((prevMode) => !prevMode);

    if (!scientificMode) {
      setAdditionalButtons([
        { value: "π" },
        { value: "√" },
        { value: "x²" },
        { value: "x³" },
      ]);
    } else {
      setAdditionalButtons([]);
    }

    // Play click sound
    playClickSound();
  };

  const appendPercentage = () => {
    setDisplayValue((prevValue) =>
      prevValue.includes("%") ? prevValue : prevValue + "%"
    );
  };

  // ini logika untuk operator +/-
  const toggleSign = () => {
    setDisplayValue((prevValue) => {
      if (prevValue.includes("+") || prevValue.includes("-")) {
        const lastIndex = Math.max(
          prevValue.lastIndexOf("+"),
          prevValue.lastIndexOf("-")
        );
        const firstPart = prevValue.substring(0, lastIndex + 1);
        let lastPart = prevValue.substring(lastIndex + 1);

        lastPart = lastPart.startsWith("-")
          ? lastPart.slice(1)
          : "-" + lastPart;

        return firstPart + lastPart;
      } else {
        return prevValue.startsWith("-") ? prevValue.slice(1) : "-" + prevValue;
      }
    });
  };

  // ini untuk logika mendapatkan hasil sesuai operator nya
  const evaluateExpression = () => {
    try {
      // Replace custom operators with mathjs compatible operators
      let expression = displayValue
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/(\d+)π/g, (_, p1) => `${p1} * pi`)
        .replace(/²/g, "**2")
        .replace(/³/g, "**3")
        .replace(/√(\d+(\.\d+)?)/g, (_, p1) => `sqrt(${p1})`)
        .replace(/(\d+)%/g, (_, p1) => `${p1} / 100`);

      // Evaluate the expression using mathjs
      const result = evaluate(expression);
      setDisplayValue(result.toString());
    } catch (error) {
      console.error("Error evaluating expression:", error);
      setDisplayValue("Error");
    }
  };

  // bagian khusus untuk logika Scientific Calculator
  const appendSymbol = (symbol: string) => {
    setDisplayValue((prevValue) => prevValue + symbol);
  };

  const handleButtonClick = (btn: string | number) => {
    // Handle different button clicks here
    switch (btn) {
      case "C":
        setDisplayValue("");
        break;
      case "DEL":
        setDisplayValue((prevValue) => prevValue.slice(0, -1));
        break;
      case "=":
        evaluateExpression();
        break;
      case "%":
        appendPercentage();
        break;
      case "+/-":
        toggleSign();
        break;
      case "π":
        appendSymbol("π");
        break;
      case "√":
        appendSymbol("√");
        break;
      case "x²":
        appendSymbol("²");
        break;
      case "x³":
        appendSymbol("³");
        break;
      default:
        setDisplayValue((prevValue) => prevValue + btn);
    }
    playClickSound();
  };

  const scrollDown = (position: number) => {
    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  };

  return (
    <div className="main overflow-x-hidden">
      {/* tampilan awal  */}
      <div className="w-100 min-vh-100 bg-gray-800 flex items-center">
        <div className="container relative z-10 flex items-center px-6 py-16 mx-auto md:px-12 xl:py-5">
          <div className="flex items-center item1">
            <div className="relative z-10 flex flex-col items-start  lg:w-3/5 xl:w-2/5 ">
              <span className="font-bold text-yellow-400 uppercase flex items-center animate__animated animate__fadeInDown">
                <img
                  src={smk}
                  className="bg-white mr-2"
                  style={{
                    borderRadius: "70px",
                  }}
                  width={50}
                  alt=""
                />
                SMK PGRI PEKANBARU
              </span>
              <h1
                className="mt-4 text-6xl font-bold leading-tight text-white sm:text-7xl animate__animated animate__fadeInLeft welcome"
                style={{
                  fontFamily: "NB-international",
                  lineHeight: "1.1",
                }}
              >
                Welcome to Calgenius
                <br />
                by Deo Silaen
              </h1>
              <button
                className="block px-4 py-3 mt-10 text-lg font-bold text-gray-800 uppercase bg-white rounded-lg hover:bg-gray-100 animate__animated animate__fadeInUp"
                onClick={() => scrollDown(800)}
              >
                Lihat Kalkulator
              </button>
            </div>
            <div className="ml-auto flex">
              <img
                src={math}
                width={600}
                alt=""
                className="animate__animated animate__fadeInRight kalku"
              />
            </div>
          </div>
        </div>
      </div>

      <header
        className="inti"
        id="containerL"
        style={{
          marginTop: "90px",
        }}
      >
        <div className="containerL">
          <div className="warna mt-4" data-aos="fade-right">
            <h5 className="justify-center flex font-bold">
              Tentukan Warna Favoritmu
            </h5>
            <Input
              placeholder="Cari Jenis Warna"
              className="mb-3"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <div className="max-h-80 pr-3 overflow-y-auto text-slate-200 text-sm">
              <div className="mt-1 rounded-md ">
                {Object.keys(warna).map((category) => {
                  // Pencarian berdasarkan kategori
                  const isCategoryMatched = category
                    .toLowerCase()
                    .includes(searchTerm.toLowerCase());

                  // Menampilkan pesan "Kategori tidak ada" jika tidak ada kategori yang cocok
                  if (!isCategoryMatched) {
                    return null; // Tidak menampilkan apapun jika kategori tidak cocok dengan pencarian
                  }

                  return (
                    <div key={category}>
                      {Object.keys(warna[category]).map((id) => {
                        const { badan, angka, operator } = warna[category][id];

                        const styleDiv = {
                          border: "1px solid black",
                        };

                        return (
                          <div key={id}>
                            <div
                              className="badan"
                              style={{ ...styleDiv, backgroundColor: badan }}
                            >
                              <p className="bg-slate-700 -tracking-tight hover-text">
                                {badan}
                              </p>
                            </div>
                            <div
                              className="angka"
                              style={{ ...styleDiv, backgroundColor: angka }}
                            >
                              <p className="bg-slate-700 -tracking-tight hover-text">
                                {angka}
                              </p>
                            </div>
                            <div
                              className="operator"
                              style={{ ...styleDiv, backgroundColor: operator }}
                            >
                              <p className="bg-slate-700 -tracking-tight hover-text">
                                {operator}
                              </p>
                            </div>

                            <Button
                              className="mt-3 mb-5 bg-violet-950"
                              onClick={() => {
                                initializeNextColor(category, id);
                                applyNewColor();
                              }}
                            >
                              Ganti Warna
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
                {/* Menampilkan pesan "Kategori tidak ada" jika tidak ada kategori yang cocok dengan pencarian */}
                {Object.keys(warna).length > 0 &&
                  Object.keys(warna).every(
                    (category) =>
                      !category.toLowerCase().includes(searchTerm.toLowerCase())
                  ) && (
                    <div className="flex justify-center items-center h-60 flex-col">
                      <img
                        src={noData}
                        width={200}
                        className="mb-6 mt-2"
                        alt=""
                      />
                      <p
                        className="text-black"
                        style={{
                          fontSize: "15px",
                        }}
                      >
                        Kategori Warna Tidak ditemukan
                      </p>
                    </div>
                  )}
              </div>
            </div>
          </div>

          <fieldset
            id="container"
            data-aos="zoom-in"
            style={{
              backgroundColor: isColorApplied ? calculatorColor.badan : "",
            }}
          >
            <form name="calculator">
              <audio ref={audioRef} hidden>
                <source src={sound} type="audio/mp3" />
                Maaf, browser Anda tidak mendukung elemen audio.
              </audio>
              <input className="display" type="text" value={displayValue} />
              <div className="justify-center flex flex-wrap">
                <button
                  type="button"
                  style={{
                    width: "250px",
                    padding: "10px",
                    borderRadius: "5px",
                    backgroundColor: "#DDE6ED",
                    border: "2px solid #181818",
                    marginBottom: "5px",
                    fontWeight: "bold",
                    color: "black",
                  }}
                  onClick={handleScientificModeToggle}
                >
                  {scientificMode ? "Simple" : "Scientific Calculator"}
                </button>

                {/* ini fungsi pada Scientific Calculator     */}
                {scientificMode &&
                  additionalButtons.map((button, index) => (
                    <button
                      type="button"
                      key={index}
                      className="button mathButtons"
                      onClick={() => handleButtonClick(button.value)}
                    >
                      {button.value}
                    </button>
                  ))}

                {/* ini fungsi mendapatkan operator dan angka nya      */}
                {btnValues.flat().map((btn, i) => (
                  <button
                    className={getButtonClassName(btn)}
                    type="button"
                    onClick={() => handleButtonClick(btn)}
                    value={btn}
                    key={i}
                    style={getButtonStyle(btn)}
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </form>
          </fieldset>

          <div className="petunjuk mt-4" data-aos="fade-left">
            <h5 className="flex font-bold">Petunjuk Mengubah Warna</h5>
            <div className="flex justify-center mt-3 mb-3">
              <img src={body} width={300} alt="" />
            </div>

            <ol>
              <li
                style={{
                  listStyle: "-moz-initial",
                  fontSize: "15px",
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
                  fontSize: "15px",
                }}
              >
                <li className="color">Default</li>
                <li className="color">Pastel</li>
                <li className="color">Cold</li>
                <li className="color">Sky</li>
                <li className="color">Rainbow</li>
                <li className="color">Coffee</li>
              </ul>
              <li
                style={{
                  listStyle: "-moz-initial",
                  marginTop: "5px",
                  fontSize: "15px",
                }}
              >
                Dan kamu bisa menentukan pilihan warna yang kamu suka, silahkan
                mencoba ya!
              </li>
            </ol>
          </div>
        </div>
      </header>
    </div>
  );
};

export default HomePage;
