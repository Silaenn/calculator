import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { CalculatorTheme } from "@/hooks/useTheme";

interface ColorGuideProps {
  theme: CalculatorTheme;
  isColorApplied: boolean;
  visible: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ColorGuide: React.FC<ColorGuideProps> = ({ theme, isColorApplied, visible, containerRef }) => {
  return (
    <div
      ref={containerRef}
      className={`panel petunjuk w-full md:w-[calc(50%-1rem)] xl:w-auto max-w-[360px] sm:max-w-[500px] md:max-w-[380px] lg:max-w-[420px] xl:flex-1 xl:max-w-md bg-white p-6 sm:p-8 border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] reveal-right min-w-0 order-3 mx-auto xl:mx-0 flex flex-col ${visible ? "revealed" : ""}`}
    >
      <h5 className="font-black uppercase tracking-widest mb-8 flex items-center gap-2">
        <FontAwesomeIcon icon={faCircleInfo} className="text-xl" /> Color Guide
      </h5>

      <div className="space-y-6 mb-10 flex-1">
        {[
          { label: "Background (Badan)", desc: "Warna utama untuk bingkai dan dasar kalkulator.", color: isColorApplied ? theme.badan : "#FFDB00" },
          { label: "Digits (Angka)", desc: "Warna untuk tombol angka 0-9 dan titik desimal.", color: isColorApplied ? theme.angka : "#FAFAFA" },
          { label: "Operators (Simbol)", desc: "Warna untuk tombol fungsi (+, -, ×, ÷, =, dll).", color: isColorApplied ? theme.operator : "#FD716E" },
        ].map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 group">
            <div 
              className={`w-16 h-16 rounded-xl border-[3px] border-black shadow-[4px_4px_0px_#000] flex-shrink-0 transition-transform ${idx % 2 === 0 ? "group-hover:rotate-3" : "group-hover:-rotate-3"}`}
              style={{ backgroundColor: item.color }}
            />
            <div>
              <p className="font-black text-sm uppercase tracking-tight mb-1">{item.label}</p>
              <p className="text-xs font-medium opacity-70">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="font-black text-sm uppercase mb-4 border-b-2 border-black inline-block">Style Categories:</p>
      <div className="flex flex-wrap gap-2 mb-8">
        {["Default", "Pastel", "Cold", "Sky", "Rainbow", "Coffee"].map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-[#FFDB00] border-2 border-black rounded-lg font-bold text-xs uppercase shadow-[3px_3px_0px_#000] hover:translate-y-[-2px] transition-transform cursor-default"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="text-sm font-medium leading-relaxed bg-[#f0f0f0] p-4 rounded-xl border-2 border-black border-dashed">
        <p><strong>Tips:</strong> Gunakan kategori di atas pada kolom pencarian di panel kiri untuk menemukan tema yang spesifik!</p>
      </div>
    </div>
  );
};

export default ColorGuide;
