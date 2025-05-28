
import './App.css'
import { MysteryList } from './components/MysteryList'

import React, { useEffect, useState } from "react";

function App() {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);

  if (isPortrait) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white z-50 text-center">
        <div>
          <p className="text-2xl font-bold mb-4">Please rotate your device</p>
          <p>This app works only in landscape mode.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <MysteryList />
    </>
  );
}

export default App;