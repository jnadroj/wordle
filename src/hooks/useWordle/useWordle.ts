import { useContext } from "react";

import { WordleContext } from "@/context";

const useWordle = () => {
  const context = useContext(WordleContext);
  if (context === undefined) {
    throw new Error("useWordle debe ser utilizado dentro de un WordleProvider");
  }
  return context;
};

export default useWordle;
