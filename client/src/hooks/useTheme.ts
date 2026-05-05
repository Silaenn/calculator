import { useState, useEffect, useCallback } from "react";
import { warna } from "../data/index.ts";

export type CalculatorTheme = {
  badan: string;
  angka: string;
  operator: string;
};

export const useTheme = () => {
  const [calculatorColor, setCalculatorColor] = useState<CalculatorTheme>({ badan: "#FFDB00", angka: "#F5F5F5", operator: "#FD716E" });
  const [isColorApplied, setIsColorApplied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("calculatorColor");
    if (stored) {
      setCalculatorColor(JSON.parse(stored));
      setIsColorApplied(true);
    }
  }, []);

  const applyTheme = useCallback((category: string, id: string) => {
    const nextColor = warna[category][id] as CalculatorTheme;
    setCalculatorColor(nextColor);
    setIsColorApplied(true);
    localStorage.setItem("calculatorColor", JSON.stringify(nextColor));
  }, []);

  return {
    calculatorColor,
    isColorApplied,
    applyTheme,
  };
};
