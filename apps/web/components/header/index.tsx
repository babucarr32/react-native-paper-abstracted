import Link from "next/link";
import { GitHubIcon } from "../icons";
import { ModeToggle } from "../mode-toggle";

const Header = () => {
  return (
    <div className="px-10 2xl:px-0 w-full border-b py-4">
      <div className="w-full flex justify-between max-w-[1500px] mx-auto items-center gap-5">
        <a href="/" className="font-semibold text-2xl">RNPA</a>
        <div className="flex justify-end items-center gap-5">
          <Link href={"https://github.com/babucarr32/react-native-paper-abstracted"} target="_blank">
            <GitHubIcon />
          </Link>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Header;
