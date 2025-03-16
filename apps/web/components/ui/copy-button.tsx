import { useState } from "react";
import { Button, ButtonProps } from "./button";
import { Check, Files } from "lucide-react";
import { cn } from "../lib/utils";
import { usePostHog } from "posthog-js/react";

interface CopyButtonProps extends ButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className, ...props }: CopyButtonProps) {
  const posthog = usePostHog();
  const [isCopied, setIsCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 700);

    if (text.includes("npm install @react-native-paper-abstracted/cli")) {
      posthog.capture("install_cli");
    }

    if (text.includes("npm i @callstack/react-theme-provider color react-native-safe-area-context")) {
      posthog.capture("manual_installation");
    }
  };

  return (
    <Button
      size="icon"
      className={cn(
        "absolute z-50 hover:bg-zinc-300 top-3 right-3 bg-zinc-100 dark:bg-zinc-900 text-black dark:text-white cursor-pointer",
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
