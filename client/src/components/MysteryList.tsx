import { passwords } from "@/lib/passwords"
import { CipherComponent } from "./CipherComponent"
import { useState } from "react"

export const MysteryList = () => {
  const [visibleIndices, setVisibleIndices] = useState<Set<number>>(new Set([0]));

  const enableVisibility = (index: number) => {
    if (!visibleIndices.has(index) && index < passwords.length) {
      setVisibleIndices(prev => new Set(prev).add(index));
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 bg-background">
      <h1 className="text-2xl font-semibold">Password Input with Hints</h1>
      <div className="flex flex-row gap-3 items-center justify-center">
        {passwords.map((password, i) => (
          <CipherComponent
            key={i}
            password={password.password}
            photoURL={password.photoURL}
            isEnabled={visibleIndices.has(i)}
            enableButton={() => enableVisibility(i + 1)}
          />
        ))}
      </div>
    </div>
  );
};
