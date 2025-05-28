import first from '../assets/1.jpg'
import second from '../assets/2.jpg'
import third from '../assets/3.jpg'
import fourth from '../assets/4.jpg'
import fifth from '../assets/5.jpg'
import sixth from '../assets/6.jpg'
import seventh from '../assets/7.jpg'
// import eight from '../assets/8.jpg'
// import nine from '../assets/9.jpg'
import ten from '../assets/10.jpg'
export interface Password{
  password: string,
  photoURL: string,
  id?: number;
}

export const rawPasswords: Password[] = [
  {
    password: "S",
    photoURL: seventh,
  },
  {
    password: "2",
    photoURL: first,
  },
  {
    password: "Y",
    photoURL: "brxnx.png",
  },
  {
    password: "M",
    photoURL: third,
  },
  {
    password: "O",
    photoURL: fourth,
  },
  {
    password: "N",
    photoURL: ten,
  },
  {
    password: "S",
    photoURL:  sixth,
  },
  {
    password: "Z",
    photoURL: second,
  },
  {
    password: "3",
    photoURL: "agh.png",
  },
  {
    password: "F",
    photoURL: fifth,
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