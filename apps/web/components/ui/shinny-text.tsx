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
    <Button className="rounded-full bg-transparent" variant={"outline"} size={"lg"}>
      <div
        className={`shiny-text ${disabled ? "disabled" : ""} ${className}`}
        style={{ animationDuration }}
      >
        {text}
      </div>
    </Button>
  );
};

export default ShinyText;
