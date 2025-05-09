export interface Password{
  password: string,
  photoURL: string,
  id?: number;
}

export const rawPasswords: Password[] = [
  {
    password: "S",
    photoURL: "Sakwa.png",
  },
  {
    password: "2",
    photoURL: "zakrzowek.png",
  },
  {
    password: "Y",
    photoURL: "brxnx.png",
  },
  {
    password: "M",
    photoURL: "Harris.png",
  },
  {
    password: "O",
    photoURL: "photo_wall.png",
  },
  {
    password: "N",
    photoURL: "Rapid",
  },
  {
    password: "S",
    photoURL: "pociag.png",
  },
  {
    password: "Z",
    photoURL: "kino.png",
  },
  {
    password: "3",
    photoURL: "agh.png",
  },
  {
    password: "F",
    photoURL: "wawel.png",
  }
]

// ------------------- helpery do shuffle ------------------------ 
/**
 * Deterministyczny PRNG z seeda (32-bit)
 */
function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates shuffle z własnym PRNG
 */
function shuffleArray<T>(array: T[], rand: () => number): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// --------------------------------------------------------------- 



// zapamietaj kolejnosc i shuffle
export const getPasswords = (
  rawPasswordList: Password[],
  seed: number = 42
): Password[] => {
  // Dodaj tymczasowe ID (przydatne np. do debugowania lub identyfikacji oryginału)
  const passwordsWithIds = rawPasswordList.map((p, i) => ({
    ...p,
    id: i,
  }));

  // Znajdź i usuń element z hasłem "3"
  const fixedPasswordIndex = passwordsWithIds.findIndex(p => p.password === "3");
  if (fixedPasswordIndex === -1) {
    throw new Error('Brakuje elementu z password === "3"');
  }

  const fixedPassword = passwordsWithIds[fixedPasswordIndex];
  const remaining = [
    ...passwordsWithIds.slice(0, fixedPasswordIndex),
    ...passwordsWithIds.slice(fixedPasswordIndex + 1),
  ];

  // Potasuj pozostałe
  const rand = mulberry32(seed);
  const shuffledArray = shuffleArray(remaining, rand);

  // Wstaw "3" na indeks 8
  shuffledArray.splice(8, 0, fixedPassword);

  return shuffledArray;
};

export const passwords = getPasswords(rawPasswords,13);