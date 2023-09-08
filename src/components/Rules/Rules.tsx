import { useWordle } from "@/hooks";
import { Key } from "..";
import { GAME } from "@/constants";

const EXAMPLES = {
  1: ["G", "A", "T", "O", "S"],
  2: ["V", "O", "C", "A", "L"],
  3: ["C", "A", "N", "T", "O"],
};

const Rules: React.FC = () => {
  const { closeModalInstructions } = useWordle();

  const exampleClass = "flex gap-[11px] justify-center my-[24px]";

  return (
    <div className="w-[546px] max-h-[90vh] overflow-auto border border-black rounded-hard py-[54px] px-[42px] bg-secondary">
      <h2 className="text-center text-primary text-4xl font-extrabold">
        Cómo Jugar
      </h2>
      <p className="text-[19px] font-normal mt-[32px] mb-[32px]">
        Adivina la palabra oculta en cinco intentos. <br />
        <br /> Cada intento debe ser una palabra válida de
        {GAME.MAX_LENGTH_WORD} letras. <br />
        <br /> Después de cada intento el color de las letras cambia para
        mostrar qué tan cerca estás de acertar la palabra.
      </p>
      <h4 className="text-left text-[19px] font-bold">Ejemplos</h4>
      <div className={exampleClass}>
        {EXAMPLES[1].map((letter, index) => (
          <Key className="w-[76px] h-[76px]" key={index}>
            {letter}
          </Key>
        ))}
      </div>
      <p>
        La letra <strong>G</strong> está en la palabra y en la posición
        correcta.
      </p>
      <div className={exampleClass}>
        {EXAMPLES[2].map((letter, index) => (
          <Key className="w-[76px] h-[76px]" key={index}>
            {letter}
          </Key>
        ))}
      </div>
      <p>
        La letra <strong>C</strong> está en la palabra pero en la posición
        incorrecta.
      </p>
      <div className={exampleClass}>
        {EXAMPLES[3].map((letter, index) => (
          <Key className="w-[76px] h-[76px]" key={index}>
            {letter}
          </Key>
        ))}
      </div>
      <p>
        La letra <strong>O</strong> no está en la palabra.
      </p>
      <p className="my-[32px]">
        Puede haber letras repetidas. Las pistas son independientes para cada
        letra.
      </p>
      <p className="text-center">
        ¡Una palabra nueva cada {GAME.MAX_TIME_GAME} minutos!
      </p>
      <p className="text-center mt-[32px]">
        <button
          onClick={closeModalInstructions}
          className="px-[3rem] py-[0.5rem] bg-btn text-[28px] font-bold rounded-soft"
        >
          <span className="text-inverse">!JUGAR¡</span>
        </button>
      </p>
    </div>
  );
};

export default Rules;
