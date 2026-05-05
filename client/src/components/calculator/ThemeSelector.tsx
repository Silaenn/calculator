import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/solid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPalette } from "@fortawesome/free-solid-svg-icons";
import { warna } from "@/data/index";

interface ThemeSelectorProps {
  onApply: (category: string, id: string) => void;
  visible: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ onApply, visible, containerRef }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div
      ref={containerRef}
      className={`panel warna w-full md:w-[calc(50%-1rem)] xl:w-auto max-w-[360px] sm:max-w-[500px] md:max-w-none lg:max-w-[420px] xl:flex-1 xl:max-w-md bg-white p-6 border-[3px] border-black rounded-2xl shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] reveal-left min-w-0 order-2 xl:order-1 mx-auto xl:mx-0 flex flex-col ${visible ? "revealed" : ""}`}
    >
      <h5 className="font-black uppercase tracking-widest mb-6 flex items-center gap-2">
        <FontAwesomeIcon icon={faPalette} className="text-xl" /> Pilih Warna
      </h5>
      <div className="relative mb-6">
        <Input
          placeholder="Cari Jenis Warna (ex: Pastel, Cold)"
          className="h-12 border-2 border-black rounded-xl font-bold px-4 focus:ring-0 focus:border-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="absolute right-3 top-3 opacity-20">
          <AdjustmentsHorizontalIcon className="w-6 h-6" />
        </div>
      </div>
      <div className="h-[320px] sm:h-[420px] md:h-[520px] overflow-y-auto pr-4 space-y-6">
        {Object.keys(warna).map((category) => {
          if (!category.toLowerCase().includes(searchTerm.toLowerCase())) return null;
          return (
            <div key={category} className="space-y-4">
              <p className="font-black text-xs uppercase opacity-40 mb-2 border-b-2 border-black inline-block">{category}</p>
              {Object.keys(warna[category]).map((id) => {
                const { badan, angka, operator } = warna[category][id];
                return (
                  <div key={id} className="bg-[#f8f8f8] p-4 border-2 border-black rounded-xl shadow-[4px_4px_0px_#000] space-y-3 transition-transform hover:translate-y-1 hover:translate-x-0.5 mb-2">
                    <div className="flex gap-2 h-10">
                      <div className="flex-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]" style={{ backgroundColor: badan }} />
                      <div className="flex-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]" style={{ backgroundColor: angka }} />
                      <div className="flex-1 rounded-lg border-2 border-black shadow-[2px_2px_0px_#000]" style={{ backgroundColor: operator }} />
                    </div>
                    <Button
                      className="w-full font-black uppercase text-xs rounded-lg h-10 shadow-[3px_3px_0px_#000] active:shadow-none active:translate-y-[2px]"
                      onClick={() => onApply(category, id)}
                    >
                      Apply Theme
                    </Button>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ThemeSelector;
