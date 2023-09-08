import ReactDOM from "react-dom";
import { PropsWithChildren } from "react";

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen }) => {
  if (!isOpen) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="w-full h-screen absolute top-0 left-0 bg-backdrop flex justify-center items-center">
      {children}
    </div>,
    document.getElementById("modal-root")!
  );
};

export default Modal;
