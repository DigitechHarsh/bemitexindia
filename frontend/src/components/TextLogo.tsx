import { Oleo_Script, Playfair_Display } from "next/font/google";

const oleo = Oleo_Script({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ weight: "800", subsets: ["latin"] });

export default function TextLogo() {
  return (
    <div className="flex flex-row items-baseline justify-center gap-3">
      <span className={`${oleo.className} text-[#cc0000] text-5xl md:text-6xl leading-none`}>
        Bemitex
      </span>
      <span className={`${playfair.className} text-[#cc0000] text-3xl md:text-4xl font-black tracking-widest leading-none`}>
        INDIA
      </span>
    </div>
  );
}
