import { Oleo_Script, Playfair_Display } from "next/font/google";

const oleo = Oleo_Script({ weight: "400", subsets: ["latin"] });
const playfair = Playfair_Display({ weight: "800", subsets: ["latin"] });

export default function TextLogo() {
  return (
    <div className="flex flex-col items-center justify-center pt-2">
      <span className={`${oleo.className} text-[#cc0000] text-3xl md:text-4xl leading-none`}>
        Bemitex
      </span>
      <span className={`${playfair.className} text-[#cc0000] text-[10px] md:text-xs font-black tracking-[0.2em] leading-none mt-1`}>
        INDIA
      </span>
    </div>
  );
}
