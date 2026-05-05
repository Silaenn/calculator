import { useState, useRef, useEffect } from "react";
import { evaluate } from "mathjs";

export const useCalculator = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [prevExpression, setPrevExpression] = useState("");
  const [isPopping, setIsPopping] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  useEffect(() => {
    setIsPopping(true);
    const t = setTimeout(() => setIsPopping(false), 150);
    return () => clearTimeout(t);
  }, [displayValue]);

  const evaluateExpression = () => {
    if (!displayValue) return;
    try {
      const expr = displayValue
        .replace(/×/g, "*")
        .replace(/÷/g, "/")
        .replace(/(\d+)π/g, (_, p) => `${p} * pi`)
        .replace(/²/g, "**2")
        .replace(/³/g, "**3")
        .replace(/√(\d+(\.\d+)?)/g, (_, p) => `sqrt(${p})`)
        .replace(/(\d+)%/g, (_, p) => `${p} / 100`);

      const result = evaluate(expr);
      setPrevExpression(displayValue + " =");
      setDisplayValue(result.toString());
    } catch {
      setDisplayValue("Error");
    }
  };

  const handleButtonClick = (btn: string | number) => {
    const symMap: Record<string, string> = { "π": "π", "√": "√", "x²": "²", "x³": "³" };

    if (prevExpression.includes("=")) {
      setPrevExpression("");
    }

    switch (btn) {
      case "C":
        setDisplayValue("");
        setPrevExpression("");
        break;
      case "DEL":
        setDisplayValue((v) => v.slice(0, -1));
        break;
      case "=":
        evaluateExpression();
        break;
      case "%":
        setDisplayValue((v) => v.includes("%") ? v : v + "%");
        break;
      case "+/-":
        setDisplayValue((v) => {
          if (v.includes("+") || v.includes("-")) {
            const i = Math.max(v.lastIndexOf("+"), v.lastIndexOf("-"));
            const a = v.substring(0, i + 1);
            let b = v.substring(i + 1);
            b = b.startsWith("-") ? b.slice(1) : "-" + b;
            return a + b;
          }
          return v.startsWith("-") ? v.slice(1) : "-" + v;
        });
        break;
      default:
        if (symMap[btn as string]) setDisplayValue((v) => v + symMap[btn as string]);
        else setDisplayValue((v) => v + btn);
    }
    playClickSound();
  };

  return {
    displayValue,
    prevExpression,
    isPopping,
    audioRef,
    handleButtonClick,
  };
};
