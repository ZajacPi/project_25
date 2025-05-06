import barcelonaPhoto from "../assets/barcelona.jpg"

export interface Password{
  password: string,
  photoURL: string,
}

export const passwords: Password[] = [
  {
    password: "piotr_ma_male_jajca",
    photoURL: "potezny/szymon.png",
  },
  {
    password: "123",
    photoURL: barcelonaPhoto,
  }
]