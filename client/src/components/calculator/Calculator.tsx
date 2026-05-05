import React from "react";
import { TrashIcon, BackspaceIcon, BeakerIcon } from "@heroicons/react/24/solid";
import { useCalculator } from "@/hooks/useCalculator";
import { CalculatorTheme } from "@/hooks/useTheme";
import { sound } from "@/assets/images/index.ts";

const btnValues = [
  ["C", "DEL", "%", "÷"],
  [7, 8, 9, "×"],
  [4, 5, 6, "-"],
  [1, 2, 3, "+"],
  [0, ".", "+/-", "="],
];

interface CalculatorProps {
  theme: CalculatorTheme;
  isColorApplied: boolean;
  calcVisible: boolean;
  calcRef: React.RefObject<HTMLFieldSetElement>;
}

const Calculator: React.FC<CalculatorProps> = ({ theme, isColorApplied, calcVisible, calcRef }) => {
  const { displayValue, prevExpression, isPopping, audioRef, handleButtonClick } = useCalculator();
  const [scientificMode, setScientificMode] = React.useState(false);

  const getButtonClassName = (btn: string | number) => {
    const base = "button !w-full flex items-center justify-center rounded-2xl border-[3px] border-black font-black shadow-[4px_4px_0px_#000] hover:-translate-y-[2px] hover:-translate-x-[2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all";
    if (btn === "C" || btn === "DEL") return `${base} h-14 sm:h-16 text-white bg-red-500`;
    if (btn === "=") return `${base} h-14 sm:h-16 bg-black text-white`;
    return `${base} h-14 sm:h-16 text-lg sm:text-2xl`;
  };

  const getButtonStyle = (btn: string | number) => {
    if (!isColorApplied) return {};
    if (typeof btn === "number" || (typeof btn === "string" && btn >= "0" && btn <= "9"))
      return { backgroundColor: theme.angka };
    if (["%", "÷", "×", "-", "+", ".", "÷", "+/-", "=", "C", "DEL"].includes(btn as string))
      return { backgroundColor: theme.operator };
    return {};
  };

  const additionalButtons = scientificMode ? ["π", "√", "x²", "x³"] : [];

  return (
    <fieldset
      id="container"
      ref={calcRef}
      className={`reveal-up w-full max-w-[360px] sm:max-w-[500px] p-6 sm:p-10 border-[4px] border-black rounded-[2rem] sm:rounded-[3rem] shadow-[10px_10px_0px_#000] sm:shadow-[16px_16px_0px_#000] transition-all duration-300 ${calcVisible ? "revealed" : ""}`}
      style={{ backgroundColor: isColorApplied ? theme.badan : "#FFDB00" }}
    >
      <form name="calculator" onSubmit={(e) => e.preventDefault()}>
        <audio ref={audioRef} hidden><source src={sound} type="audio/mp3" /></audio>

        <div className="flex items-center justify-between mb-6">
          <div className="calc-brand font-black text-[10px] tracking-[0.4em] uppercase opacity-40">
            CALGENIUS FX-2.0
          </div>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-black opacity-20"></div>
            <div className="w-2 h-2 rounded-full bg-black opacity-20"></div>
          </div>
        </div>

        <div className="display-container relative w-full mb-8">
          <div className="absolute top-2 right-6 text-right text-xs font-black opacity-40 h-4 overflow-hidden">
            {prevExpression}
          </div>
          <input
            className={`display ${isPopping ? "display-pop" : ""} w-full h-20 sm:h-24 bg-white border-[4px] border-black rounded-[1.2rem] sm:rounded-[1.5rem] pt-4 sm:pt-6 px-6 text-right text-3xl sm:text-4xl font-black shadow-[inset_4px_4px_0px_rgba(0,0,0,0.1)] focus:outline-none`}
            type="text"
            value={displayValue}
            readOnly
            placeholder="0"
          />
        </div>

        <div className="grid grid-cols-4 gap-3 sm:gap-4">
          <div className="col-span-4">
            <button
              type="button"
              className={`!w-full button flex items-center justify-center gap-2 rounded-xl h-12 font-black uppercase text-xs tracking-widest border-2 border-black transition-all mb-2 !text-white ${
                scientificMode 
                ? "bg-teal-400 shadow-[4px_4px_0px_#000]" 
                : "bg-black shadow-[4px_4px_0px_#FFDB00]"
              } active:shadow-none active:translate-y-[2px]`}
              onClick={() => setScientificMode(!scientificMode)}
            >
              <BeakerIcon className="w-4 h-4" />
              {scientificMode ? "Simple Mode" : "Scientific Mode"}
            </button>          </div>

          {scientificMode && (
            <div className="col-span-4 grid grid-cols-4 gap-3 sm:gap-4 mb-2 animate__animated animate__fadeInDown animate__faster">
              {additionalButtons.map((btn, i) => (
                <button
                  type="button"
                  key={i}
                  className="button !w-full !h-12 sm:!h-14 flex items-center justify-center border-2 border-black rounded-xl font-black text-xl shadow-[4px_4px_0px_#000] active:shadow-none active:translate-y-[2px] transition-all bg-white hover:bg-gray-50"
                  onClick={() => handleButtonClick(btn)}
                >
                  {btn}
                </button>
              ))}
            </div>
          )}

          {btnValues.flat().map((btn, i) => (
            <button
              className={getButtonClassName(btn)}
              type="button"
              key={i}
              onClick={() => handleButtonClick(btn)}
              style={getButtonStyle(btn)}
            >
              {btn === "C" ? (
                <TrashIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              ) : btn === "DEL" ? (
                <BackspaceIcon className="w-6 h-6 sm:w-7 sm:h-7" />
              ) : (
                btn
              )}
            </button>
          ))}
        </div>
      </form>
    </fieldset>
  );
};

export default Calculator;
