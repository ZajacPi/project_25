import { passwords } from "@/lib/passwords";
import { CipherComponent } from "./CipherComponent";
import { useRef, useState } from "react";
import { Button } from "./ui/button";

export const MysteryList = () => {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(
    new Set([0]),
  );
  // const [rotate, setRotate] = useState<boolean>(false);
  const [animate, setAnimate] = useState<boolean>(false);
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (start: number, dir: 1 | -1) => {
    let i = start;
    while (i >= 0 && i < passwords.length) {
      const el = inputRefs.current[i];
      if (el && !el.disabled) {
        el.focus();
        const len = el.value.length;
        el.setSelectionRange(len, len); // caret zawsze na końcu
        break;
      }
      i += dir;
    }
  };
  const enableVisibility = (index: number) => {
    if (!visibleIndices.has(index) && index < passwords.length) {
      setVisibleIndices((prev) => new Set(prev).add(index));
    }
    focusInput(index, 1);
  };

  const cellSize = 64 + 12; // 64px ma input, 12px jest gap miedzy nimi

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-background">
      <h1 className="text-2xl font-semibold">Password Input with Hints</h1>

      <div className="flex flex-row gap-3 items-center justify-center">
        {passwords.map(({ password, photoURL, id }, i) => (
          <CipherComponent
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el}
            }
            index={i}
            password={password}
            photoURL={photoURL}
            isEnabled={visibleIndices.has(i)}
            enableButton={() => enableVisibility(i + 1)}
            focusInput={focusInput}
            animate={animate}
            translateSizePx={(id! - i) * cellSize}
            rotate={password === "3" && animate}
          />
        ))}
      </div>
      <Button onClick={() => setAnimate(true)}>
        Animate
      </Button>
    </div>
  );
};
