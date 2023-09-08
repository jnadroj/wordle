import { useWordle } from "@/hooks";
import { secondsToMin } from "@/utilities";

interface StatisticsProps {
  lost?: boolean;
}

const Statistics: React.FC<StatisticsProps> = ({ lost }) => {
  const { closeWinModal, closeLostModal, targetWord, won, played, timer } =
    useWordle();
  return (
    <div className="w-[546px] border border-black rounded-hard py-[54px] px-[42px] bg-secondary">
      <h2 className="text-center text-primary text-4xl font-extrabold">
        Estadísticas
      </h2>
      <div className="flex justify-around py-[44px]">
        <div className="flex flex-col items-center">
          <span className="text-[35px] font-bold">{played}</span>
          <span className="text-[21px]">Jugadas</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[35px] font-bold">{won}</span>
          <span className="text-[21px]">Victorias</span>
        </div>
      </div>
      {lost && (
        <p className="text-center text-[19px]">
          La palabra era <strong>{targetWord}</strong>
        </p>
      )}
      <p className="text-center text-[19px]">SIGUIENTE PALABRA</p>
      <p className="text-center text-[24px] font-semibold">
        {secondsToMin(timer)}
      </p>
      <p className="text-center mt-[32px]">
        <button
          className="px-[3rem] py-[0.5rem] bg-btn text-[28px] font-bold rounded-soft"
          onClick={lost ? closeLostModal : closeWinModal}
        >
          <span className="text-inverse">!JUGAR¡</span>
        </button>
      </p>
    </div>
  );
};

export default Statistics;
