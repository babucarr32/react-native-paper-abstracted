import { GitHubIcon } from "../icons";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <div className="w-full border-b py-4">
      <div className="w-full flex justify-end max-w-[1500px] mx-auto items-center gap-5">
        <GitHubIcon />
        <ModeToggle />
      </div>
    </div>
  );
};

export default Header;
