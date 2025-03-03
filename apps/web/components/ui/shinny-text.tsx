import { Button } from "./button";

type ShinyTextPropType = {
  text: string;
  speed: number;
  disabled: boolean;
  className: string;
};

const ShinyText = ({ text, disabled = false, speed = 5, className = "" }: ShinyTextPropType) => {
  const animationDuration = `${speed}s`;

  return (
    <Button className="cursor-pointer rounded-full bg-zinc-100 h-14 dark:bg-zinc-900" variant={"outline"} size={"lg"}>
      <div
        className={`shiny-text !text-[17px] text-black dark:text-[#b5b5b5a4] ${
          disabled ? "disabled" : ""
        } ${className}`}
        style={{ animationDuration }}
      >
        {text}
      </div>
    </Button>
  );
};

export default ShinyText;
