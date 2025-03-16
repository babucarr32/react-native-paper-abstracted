"use client";
import Link from "next/link";
import { GitHubIcon } from "../icons";
import { ModeToggle } from "../mode-toggle";
import { usePostHog } from "posthog-js/react";

const Logo = () => (
  <svg
    width="419"
    height="167"
    fill="currentColor"
    viewBox="0 0 419 167"
    className="h-8 w-fit"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M95.6646 15.8564L15.9714 61.8673" stroke="currentColor" strokeWidth="30" strokeLinecap="round" />
    <path d="M98.3442 60.4973L18.6511 106.508" stroke="currentColor" strokeWidth="30" strokeLinecap="round" />
    <path d="M101.023 105.138L21.3303 151.149" stroke="currentColor" strokeWidth="30" strokeLinecap="round" />
    <path
      d="M153.995 110V37.2727H182.689C188.181 37.2727 192.868 38.2552 196.751 40.2202C200.657 42.1615 203.628 44.9195 205.664 48.4943C207.724 52.0455 208.754 56.224 208.754 61.0298C208.754 65.8594 207.712 70.0142 205.629 73.4943C203.546 76.9508 200.527 79.6023 196.573 81.4489C192.644 83.2955 187.885 84.2188 182.298 84.2188H163.086V71.8608H179.812C182.748 71.8608 185.186 71.4583 187.127 70.6534C189.069 69.8485 190.513 68.6411 191.46 67.0312C192.43 65.4214 192.916 63.4209 192.916 61.0298C192.916 58.6151 192.43 56.5791 191.46 54.9219C190.513 53.2647 189.057 52.0099 187.092 51.1577C185.151 50.2817 182.7 49.8438 179.741 49.8438H169.372V110H153.995ZM193.271 76.9034L211.346 110H194.372L176.687 76.9034H193.271ZM280.451 37.2727V110H267.17L235.529 64.2259H234.997V110H219.62V37.2727H233.115L264.507 83.0114H265.146V37.2727H280.451ZM293.155 110V37.2727H321.849C327.365 37.2727 332.064 38.3262 335.947 40.4332C339.829 42.5166 342.789 45.4167 344.825 49.1335C346.884 52.8267 347.914 57.0881 347.914 61.9176C347.914 66.7472 346.872 71.0085 344.789 74.7017C342.706 78.3949 339.687 81.2713 335.734 83.331C331.804 85.3906 327.045 86.4205 321.458 86.4205H303.17V74.098H318.972C321.932 74.098 324.37 73.589 326.288 72.571C328.229 71.5294 329.673 70.0971 330.62 68.2741C331.591 66.4276 332.076 64.3087 332.076 61.9176C332.076 59.5028 331.591 57.3958 330.62 55.5966C329.673 53.7737 328.229 52.3651 326.288 51.3707C324.346 50.3527 321.884 49.8438 318.901 49.8438H308.532V110H293.155ZM362.039 110H345.561L370.668 37.2727H390.483L415.554 110H399.077L380.86 53.892H380.292L362.039 110ZM361.009 81.4134H399.929V93.4162H361.009V81.4134Z"
      fill="currentColor"
    />
  </svg>
);

const Header = () => {
  const posthog = usePostHog();
  return (
    <div className="px-4 lg:px-10 2xl:px-0 w-full border-b py-4">
      <div className="w-full flex justify-between max-w-[1700px] mx-auto items-center gap-5">
        <a href="/" className="font-semibold">
          <Logo />
        </a>
        <div onClick={() => posthog.capture("visit_repo")} className="flex justify-end items-center gap-5">
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
