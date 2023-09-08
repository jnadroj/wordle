import { GAME } from "@/constants";
import axios from "axios";

export const getRandomWord = async (): Promise<string> => {
  try {
    const response = await axios.get("/words.txt");
    const text = response.data;
    const wordsArray = text
      .split("\n")
      .map((word: string) => word.trim())
      .filter((word: string) => word.length === GAME.MAX_LENGTH_WORD);

    const randomIndex = Math.floor(Math.random() * wordsArray.length);
    const randomWord = wordsArray[randomIndex];

    return removeAccents(randomWord);
  } catch (error) {
    throw new Error("No se pudo obtener una palabra aleatoria");
  }
};

export const removeAccents = (word: string) => {
  return word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};
