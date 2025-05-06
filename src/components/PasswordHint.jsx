import React, { useState } from "react";

const hintImages = [
  "https://via.placeholder.com/100?text=Hint1",
  "https://via.placeholder.com/100?text=Hint2",
  "https://via.placeholder.com/100?text=Hint3",
  "https://via.placeholder.com/100?text=Hint4",
  "https://via.placeholder.com/100?text=Hint5",
  "https://via.placeholder.com/100?text=Hint6",
  "https://via.placeholder.com/100?text=Hint7",
  "https://via.placeholder.com/100?text=Hint8",
  "https://via.placeholder.com/100?text=Hint9",
  "https://via.placeholder.com/100?text=Hint10"
];

const correctPassword = "OpenSesame"; // Set your desired password here (10 characters)

export default function PasswordHint() {
  const [password, setPassword] = useState(Array(10).fill(""));
  const [showHints, setShowHints] = useState(Array(10).fill(false));
  const [unlocked, setUnlocked] = useState(false);

  const handleInputChange = (index, value) => {
    const updated = [...password];
    updated[index] = value.slice(-1); // Only keep last char
    setPassword(updated);

    const joinedPassword = updated.join("");
    if (joinedPassword.length === 10 && joinedPassword === correctPassword) {
      setUnlocked(true);
    }
  };

  const toggleHint = (index) => {
    const updated = [...showHints];
    updated[index] = !updated[index];
    setShowHints(updated);
  };

  if (unlocked) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <img
          src="https://via.placeholder.com/600x400?text=Access+Granted"
          alt="Unlocked"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-4">
      <h1 className="text-2xl font-semibold">Password Input with Hints</h1>
      <div className="grid grid-cols-10 gap-4">
        {password.map((char, i) => (
          <div key={i} className="flex flex-col items-center">
            <input
              type="text"
              maxLength={1}
              className="w-10 h-10 text-center border rounded"
              value={char}
              onChange={(e) => handleInputChange(i, e.target.value)}
            />
            <button
              className="mt-2 w-10 h-10 bg-gray-200 border rounded flex items-center justify-center"
              onClick={() => toggleHint(i)}
            >
              <img
                src="https://via.placeholder.com/30?text=🔍"
                alt="Logo"
              />
            </button>
            {showHints[i] && (
              <img
                className="mt-2 w-20 h-20"
                src={hintImages[i]}
                alt={`Hint ${i + 1}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
