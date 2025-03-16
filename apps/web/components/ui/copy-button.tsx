import { useState } from "react";
import { Button, ButtonProps } from "./button";
import { Check, Files } from "lucide-react";
import { cn } from "../lib/utils";

interface CopyButtonProps extends ButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 700);
  };

  return (
    <Button
      size="icon"
      className={cn(
        "absolute hover:bg-zinc-300 top-3 right-3 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white cursor-pointer",
        className,
      )}
      disabled={isCopied}
      onClick={copy}
      aria-label="Copy"
      {...props}
    >
      <span className="sr-only">Copy</span>
      {isCopied ? <Check /> : <Files />}
    </Button>
  );
}
