/* React imports */
import { useState } from "react";

/* Shadcn imports */
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/app/_components/ui/tooltip";
import { Button } from "~/app/_components/ui/button";

/* CopyableItem Props */
interface CopyableItemProps {
  children: React.ReactNode;
  label?: string;
  value: string;
}

const CopyableItem = ({ children, label, value }: CopyableItemProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!value) return;

    try {
      await navigator.clipboard.writeText(value);
      setOpen(true);
      setCopied(true);
    } catch (err) {
      console.log("Failed to copy: ", err);
    }
  };

  return (
    <Tooltip
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        setCopied(false);
      }}
    >
      <TooltipTrigger asChild>
        <Button
          variant={"link"}
          onClick={handleCopy}
          className="has-[>svg]:px-0"
        >
          {children}
        </Button>
      </TooltipTrigger>

      <TooltipContent sideOffset={-12}>
        <span>{copied ? "Copied!" : (label ?? "Copy")}</span>
      </TooltipContent>
    </Tooltip>
  );
};

export default CopyableItem;
