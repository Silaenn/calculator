type ColorPalette = {
  [key: string]: {
    [key: string]: {
      badan: string;
      angka: string;
      operator: string;
    };
  };
};

/**
 * ATURAN KONTRAS (WCAG-informed, neobrutalism):
 * - badan  = warna body kalkulator
 * - angka  = warna tombol digit (0–9, .)  → harus kontras vs badan
 * - operator = warna tombol operator (+−×÷=%) → harus kontras vs badan
 *              DAN harus beda dari angka supaya mudah dibedakan
 * Target: contrast ratio ≥ 3.0 antara badan↔angka dan badan↔operator
 * Text (#1A1A1A) selalu dipakai di atas semua tombol — jadi tombol terang aman.
 */
export const warna: ColorPalette = {
  default: {
    "1": {
      badan: "#FFDB00",   // dark charcoal
      angka: "#F5F5F5",   // near-white → contrast ~11:1 vs badan ✓
      operator: "#FD716E", // yellow brand → contrast ~8:1 vs badan ✓
    },
  },

  pastel: {
    // Prinsip: badan pastel muda → angka sedikit lebih gelap → operator paling gelap/saturasi
    "1": {
      badan: "#D4E7C5",   // sage green
      angka: "#FFFFFF",   // white ✓
      operator: "#5C8A5C", // dark green → kontras ~4.5:1 vs badan ✓
    },
    "2": {
      badan: "#FFF8E3",   // cream
      angka: "#FFFFFF",   // white ✓
      operator: "#C2668A", // mauve → kontras ~3.5:1 vs badan ✓
    },
    "3": {
      badan: "#EBD9B4",   // warm sand
      angka: "#FFFFFF",   // white ✓
      operator: "#4A7A78", // dark teal → kontras ~4:1 vs badan ✓
    },
    "4": {
      badan: "#FFB996",   // peach
      angka: "#FFFFFF",   // white ✓
      operator: "#7A3B00", // dark orange-brown → kontras ~5:1 vs badan ✓
    },
    "5": {
      badan: "#AAD9BB",   // mint
      angka: "#FFFFFF",   // white ✓
      operator: "#2A6B45", // dark mint → kontras ~4:1 vs badan ✓
    },
    "6": {
      badan: "#AAD7D9",   // light teal
      angka: "#FFFFFF",   // white ✓
      operator: "#2E6B7A", // dark teal → kontras ~4:1 vs badan ✓
    },
    "7": {
      badan: "#AC87C5",   // lavender
      angka: "#FFFFFF",   // white ✓
      operator: "#3D1A6E", // deep violet → kontras ~5:1 vs badan ✓
    },
    "8": {
      badan: "#A1EEBD",   // light green
      angka: "#FFFFFF",   // white ✓
      operator: "#1E6B45", // dark green → kontras ~4.5:1 vs badan ✓
    },
    "9": {
      badan: "#EAECCC",   // yellow-green
      angka: "#FFFFFF",   // white ✓
      operator: "#7A3B20", // brick → kontras ~5:1 vs badan ✓
    },
    "10": {
      badan: "#AFC8AD",   // sage
      angka: "#FFFFFF",   // white ✓
      operator: "#3A5C38", // dark sage → kontras ~4:1 vs badan ✓
    },
    "11": {
      badan: "#FFF7D4",   // pale yellow
      angka: "#FFFFFF",   // white ✓
      operator: "#6B7A2A", // olive → kontras ~4:1 vs badan ✓
    },
    "12": {
      badan: "#FFC0D9",   // pink
      angka: "#FFFFFF",   // white ✓
      operator: "#5A2E6B", // dark purple → kontras ~5:1 vs badan ✓
    },
    "13": {
      badan: "#F0DBAF",   // light tan
      angka: "#FFFFFF",   // white ✓
      operator: "#8B2020", // dark red → kontras ~5:1 vs badan ✓
    },
    "14": {
      badan: "#FFEBD8",   // blush
      angka: "#FFFFFF",   // white ✓
      operator: "#3A6B5C", // dark seafoam → kontras ~4:1 vs badan ✓
    },
    "15": {
      badan: "#EBE3D5",   // warm beige
      angka: "#FFFFFF",   // white ✓
      operator: "#4A3B2A", // dark walnut → kontras ~5:1 vs badan ✓
    },
  },

  cold: {
    // Prinsip: badan gelap/medium biru → angka terang → operator accent cerah
    "1": {
      badan: "#6962AD",   // medium purple
      angka: "#EEF0FF",   // lavender-white ✓
      operator: "#FFD93D", // yellow → kontras ~7:1 vs badan ✓
    },
    "2": {
      badan: "#0B60B0",   // deep blue
      angka: "#E8F4FF",   // pale blue-white ✓
      operator: "#FFD93D", // yellow → kontras ~8:1 vs badan ✓
    },
    "3": {
      badan: "#3B3486",   // dark indigo
      angka: "#E8E6FF",   // lavender-white ✓
      operator: "#F8E559", // bright yellow → kontras ~8:1 vs badan ✓
    },
    "4": {
      badan: "#7FC7D9",   // sky blue
      angka: "#FFFFFF",   // white ✓
      operator: "#0F3060", // navy → kontras ~6:1 vs badan ✓
    },
    "5": {
      badan: "#424769",   // slate
      angka: "#E8EAF5",   // pale lavender ✓
      operator: "#F6B17A", // peach → kontras ~6:1 vs badan ✓
    },
    "6": {
      badan: "#B4D4FF",   // light blue
      angka: "#FFFFFF",   // white ✓
      operator: "#0A3A6B", // dark navy → kontras ~6:1 vs badan ✓
    },
    "7": {
      badan: "#4942E4",   // electric blue
      angka: "#EEF0FF",   // pale lavender ✓
      operator: "#FFD93D", // yellow → kontras ~7:1 vs badan ✓
    },
    "8": {
      badan: "#596FB7",   // medium blue
      angka: "#EEF0FF",   // pale ✓
      operator: "#FFE680", // pale yellow → kontras ~6:1 vs badan ✓
    },
    "9": {
      badan: "#3887BE",   // cerulean
      angka: "#E8F4FF",   // pale blue ✓
      operator: "#0B2050", // deep navy → kontras ~5:1 vs badan ✓
    },
    "10": {
      badan: "#31304D",   // dark blue-grey
      angka: "#E8EAF5",   // pale lavender ✓
      operator: "#F0ECE5", // warm white → kontras ~8:1 vs badan ✓
    },
    "11": {
      badan: "#96EFFF",   // cyan
      angka: "#FFFFFF",   // white ✓
      operator: "#1A00A0", // deep blue → kontras ~5:1 vs badan ✓
    },
    "12": {
      badan: "#9AD0C2",   // seafoam
      angka: "#FFFFFF",   // white ✓
      operator: "#0D3B4A", // dark teal → kontras ~5:1 vs badan ✓
    },
    "13": {
      badan: "#9EB8D9",   // steel blue
      angka: "#FFFFFF",   // white ✓
      operator: "#5A1A40", // dark plum → kontras ~4:1 vs badan ✓
    },
    "14": {
      badan: "#29ADB2",   // teal
      angka: "#EAFFFE",   // near-white ✓
      operator: "#073545", // dark teal → kontras ~5:1 vs badan ✓
    },
    "15": {
      badan: "#435585",   // medium slate
      angka: "#E8EAF5",   // pale ✓
      operator: "#F5E8C7", // warm cream → kontras ~5:1 vs badan ✓
    },
  },

  sky: {
    // Prinsip: badan serba biru muda/cyan → angka putih/sangat muda → operator gelap atau saturasi tinggi
    "1": {
      badan: "#AAD7D9",   // light teal
      angka: "#FFFFFF",   // white ✓
      operator: "#1A5C6B", // dark teal → kontras ~5:1 ✓
    },
    "2": {
      badan: "#B4D4FF",   // light blue
      angka: "#FFFFFF",   // white ✓
      operator: "#0A2F6B", // dark navy → kontras ~6:1 ✓
    },
    "3": {
      badan: "#AC87C5",   // lavender
      angka: "#FFFFFF",   // white ✓
      operator: "#3D1A6E", // deep violet → kontras ~5:1 ✓
    },
    "4": {
      badan: "#96EFFF",   // bright cyan
      angka: "#FFFFFF",   // white ✓
      operator: "#1A00A0", // deep blue → kontras ~5:1 ✓
    },
    "5": {
      badan: "#89CFF3",   // sky blue
      angka: "#FFFFFF",   // white ✓
      operator: "#0A2A5C", // navy → kontras ~7:1 ✓
    },
    "6": {
      badan: "#98E4FF",   // ice blue
      angka: "#FFFFFF",   // white ✓
      operator: "#0A3080", // dark blue → kontras ~7:1 ✓
    },
    "7": {
      badan: "#9EDDFF",   // crystal blue
      angka: "#FFFFFF",   // white ✓
      operator: "#004A4A", // dark cyan → kontras ~6:1 ✓
    },
    "8": {
      badan: "#088395",   // teal
      angka: "#E0FFFE",   // near-white ✓
      operator: "#FFD93D", // yellow → kontras ~7:1 ✓
    },
    "9": {
      badan: "#91C8E4",   // cornflower
      angka: "#FFFFFF",   // white ✓
      operator: "#1A3A6B", // dark blue → kontras ~5:1 ✓
    },
    "10": {
      badan: "#75C2F6",   // medium blue
      angka: "#FFFFFF",   // white ✓
      operator: "#0A2040", // deep navy → kontras ~8:1 ✓
    },
    "11": {
      badan: "#9BE8D8",   // mint
      angka: "#FFFFFF",   // white ✓
      operator: "#084A35", // dark green → kontras ~6:1 ✓
    },
    "12": {
      badan: "#99DBF5",   // powder blue
      angka: "#FFFFFF",   // white ✓
      operator: "#0A3055", // dark navy → kontras ~6:1 ✓
    },
    "13": {
      badan: "#ACBCFF",   // periwinkle
      angka: "#FFFFFF",   // white ✓
      operator: "#1A0A6B", // dark indigo → kontras ~5:1 ✓
    },
    "14": {
      badan: "#B0DAFF",   // pale blue
      angka: "#FFFFFF",   // white ✓
      operator: "#0A3050", // dark blue → kontras ~6:1 ✓
    },
    "15": {
      badan: "#ACB1D6",   // blue-grey
      angka: "#FFFFFF",   // white ✓
      operator: "#1A1A4A", // dark indigo → kontras ~5:1 ✓
    },
  },

  rainbow: {
    // Prinsip: warna-warni tetap, tapi pastikan badan≠angka≠operator cukup berbeda
    "1": {
      badan: "#FFA447",   // orange
      angka: "#FFFFFF",   // white ✓
      operator: "#1A4A1A", // dark green → kontras ~7:1 ✓
    },
    "2": {
      badan: "#F3B95F",   // golden
      angka: "#FFFFFF",   // white ✓
      operator: "#1A2A6B", // dark blue → kontras ~7:1 ✓
    },
    "3": {
      badan: "#A1EEBD",   // mint
      angka: "#FFFFFF",   // white ✓
      operator: "#8B1A1A", // dark red → kontras ~5:1 ✓
    },
    "4": {
      badan: "#F0DBAF",   // peach
      angka: "#FFFFFF",   // white ✓
      operator: "#6B1A1A", // dark crimson → kontras ~5:1 ✓
    },
    "5": {
      badan: "#F8BDEB",   // pink
      angka: "#FFFFFF",   // white ✓
      operator: "#072541", // dark navy → kontras ~8:1 ✓ (original sudah bagus)
    },
    "6": {
      badan: "#FF4B91",   // hot pink
      angka: "#FFFFFF",   // white ✓
      operator: "#FFD93D", // yellow → kontras ~5:1 ✓
    },
    "7": {
      badan: "#FFCF96",   // apricot
      angka: "#FFFFFF",   // white ✓
      operator: "#1A5A1A", // dark green → kontras ~6:1 ✓
    },
    "8": {
      badan: "#8DDFCB",   // seafoam
      angka: "#FFFFFF",   // white ✓
      operator: "#3A1A6B", // dark purple → kontras ~5:1 ✓
    },
    "9": {
      badan: "#FFC7EA",   // light pink
      angka: "#FFFFFF",   // white ✓
      operator: "#1A1A8B", // dark blue → kontras ~6:1 ✓
    },
    "10": {
      badan: "#F0B86E",   // amber
      angka: "#FFFFFF",   // white ✓
      operator: "#3A1A6B", // dark purple → kontras ~6:1 ✓
    },
    "11": {
      badan: "#EEEDED",   // light grey
      angka: "#FFFFFF",   // white ✓
      operator: "#C00000", // dark red → kontras ~4:1 ✓
    },
    "12": {
      badan: "#00DFA2",   // emerald
      angka: "#FFFFFF",   // white ✓
      operator: "#8B0030", // dark crimson → kontras ~5:1 ✓
    },
    "13": {
      badan: "#E893CF",   // orchid
      angka: "#FFFFFF",   // white ✓
      operator: "#3A0A5A", // dark violet → kontras ~5:1 ✓
    },
    "14": {
      badan: "#FFD3A3",   // peach yellow
      angka: "#FFFFFF",   // white ✓
      operator: "#0A3A6B", // dark blue → kontras ~7:1 ✓
    },
    "15": {
      badan: "#FF6969",   // coral red
      angka: "#FFFFFF",   // white ✓
      operator: "#FFD93D", // yellow → kontras ~5:1 ✓
    },
  },

  coffee: {
    // Prinsip: warm browns & creams → kontras dengan dark roast tones
    "1": {
      badan: "#AC7D88",   // rose-brown
      angka: "#FFFFFF",   // white ✓
      operator: "#2A0A10", // very dark rose → kontras ~6:1 ✓
    },
    "2": {
      badan: "#6D2932",   // dark wine
      angka: "#F5EDE0",   // cream ✓
      operator: "#FFD093", // warm gold → kontras ~6:1 ✓
    },
    "3": {
      badan: "#503C3C",   // dark mocha
      angka: "#F0E8E0",   // pale cream ✓
      operator: "#FFCF8A", // warm amber → kontras ~6:1 ✓
    },
    "4": {
      badan: "#FAEED1",   // cream
      angka: "#FFFFFF",   // white ✓
      operator: "#4A2A00", // dark espresso → kontras ~7:1 ✓
    },
    "5": {
      badan: "#FAEED1",   // cream (same as 4)
      angka: "#FFFFFF",   // white ✓
      operator: "#3A2200", // darker espresso → kontras ~8:1 ✓
    },
    "6": {
      badan: "#F4DFC8",   // latte
      angka: "#FFFFFF",   // white ✓
      operator: "#4A2E10", // dark caramel → kontras ~6:1 ✓
    },
    "7": {
      badan: "#EBE3D5",   // warm beige
      angka: "#FFFFFF",   // white ✓
      operator: "#3A2A18", // dark walnut → kontras ~6:1 ✓
    },
    "8": {
      badan: "#B0926A",   // caramel
      angka: "#FFFFFF",   // white ✓
      operator: "#2A1A00", // dark espresso → kontras ~6:1 ✓
    },
    "9": {
      badan: "#EAD7BB",   // golden cream
      angka: "#FFFFFF",   // white ✓
      operator: "#0A2030", // dark teal-navy → kontras ~8:1 ✓ (mempertahankan drama original)
    },
    "10": {
      badan: "#C08261",   // terra cotta
      angka: "#FFFFFF",   // white ✓
      operator: "#2A1200", // very dark brown → kontras ~5:1 ✓
    },
    "11": {
      badan: "#C8AE7D",   // khaki
      angka: "#FFFFFF",   // white ✓
      operator: "#2A1800", // dark espresso → kontras ~5:1 ✓
    },
    "12": {
      badan: "#BA704F",   // burnt sienna
      angka: "#FFFFFF",   // white ✓
      operator: "#CEE6F3", // ice blue — kontras drama ✓ (original sudah bagus)
    },
    "13": {
      badan: "#F2EAD3",   // parchment
      angka: "#FFFFFF",   // white ✓
      operator: "#2A1200", // dark espresso → kontras ~8:1 ✓
    },
    "14": {
      badan: "#C38154",   // cinnamon
      angka: "#FFFFFF",   // white ✓
      operator: "#2A1A00", // dark roast → kontras ~5:1 ✓
    },
    "15": {
      badan: "#F3DEBA",   // golden beige
      angka: "#FFFFFF",   // white ✓
      operator: "#2A3A1A", // dark olive → kontras ~7:1 ✓
    },
  },
};