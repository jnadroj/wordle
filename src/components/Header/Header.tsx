import helpIcon from "@/assets/icons/help.svg";
import chartIcon from "@/assets/icons/chart.svg";
import switchLightIcon from "@/assets/icons/switchLight.svg";
import switchDarkIcon from "@/assets/icons/switchDark.svg";
import { useEffect, useState } from "react";
import { useWordle } from "@/hooks";

const Header: React.FC = () => {
  const { setShowInstructions } = useWordle();
  const html = document.documentElement;
  const [isDark, setIsDark] = useState(false);

  const themHandler = () => {
    setIsDark(!isDark);
    if (html.classList.contains("theme-dark")) {
      html.classList.remove("theme-dark");
      localStorage.removeItem("theme");
      return;
    }
    html.classList.add("theme-dark");
    localStorage.setItem("theme", "dark");
  };

  const selectIcon = () => {
    if (localStorage.getItem("theme")) {
      setIsDark(true);
      return;
    }
    setIsDark(false);
  };

  useEffect(() => {
    selectIcon();
  }, []);

  return (
    <div className="flex justify-between items-center py-4 px-5 bg-secondary rounded-hard w-full">
      <img
        src={helpIcon}
        alt="help icon"
        onClick={() => setShowInstructions(true)}
      />
      <h1 className="text-4xl font-semibold text-primary">Worlde</h1>
      <div className="flex items-center ">
        <img src={chartIcon} alt="help icon" />
        <img
          onClick={themHandler}
          src={isDark ? switchDarkIcon : switchLightIcon}
          alt="help icon"
          id="theme-btn"
        />
      </div>
    </div>
  );
};

export default Header;
