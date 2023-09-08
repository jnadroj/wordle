import {
  Board,
  Header,
  Keyboard,
  Modal,
  Rules,
  Statistics,
} from "./components";
import { useWordle } from "./hooks";

const App: React.FC = () => {
  const { showInstructions, showWinModal, showLostModal } = useWordle();
  return (
    <>
      <Modal isOpen={showInstructions}>
        <Rules />
      </Modal>
      <Modal isOpen={showWinModal || showLostModal}>
        <Statistics lost={showLostModal} />
      </Modal>
      <div className="container mx-auto max-h-[calc(100vh-32px)] flex flex-col items-center px-[193px] pt-8 max-w-[1024px]">
        <Header />
        <Board />
        <Keyboard />
      </div>
    </>
  );
};

export default App;
