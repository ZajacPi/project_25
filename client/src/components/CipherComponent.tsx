import {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Eye } from "lucide-react";
import { PhotoModal } from "./PhotoModal";

interface CipherComponentProps {
  password: string;
  photoURL: string;
  className?: string;
  enableButton: () => void;
  isEnabled: boolean;
  index: number;
  animate?: boolean;
  translateSizePx?: number;
  rotate?: boolean;
  /** focusInput(startIndex, direction) z rodzica */
  focusInput: (i: number, dir: 1 | -1) => void;
}

export const CipherComponent = forwardRef<HTMLInputElement, CipherComponentProps>(
  (
    {
      password,
      photoURL,
      className,
      enableButton,
      isEnabled,
      index,
      animate,
      focusInput,
      rotate,
      translateSizePx
    },
    ref,
  ) => {
    const [value, setValue] = useState("");
    const [isCorrect, setIsCorrect] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const localRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => localRef.current as HTMLInputElement);

    useEffect(() => {
      const correct = value.toLowerCase() === password.toLowerCase();
      setIsCorrect(correct);

      if (correct && !isLocked) {
        setIsLocked(true);
        enableButton();
        localRef.current?.blur();
        focusInput(index + 1, 1); // ➡️ do pierwszego nie-zablokowanego
      }
      if (!correct && isLocked) {
        setIsLocked(false);
      }

      // po wpisaniu dowolnego znaku (niezależnie od poprawności) przejdź dalej
      if (value.length === 1) {
        focusInput(index + 1, 1);
      }
    }, [value, password, isLocked, enableButton, index, focusInput]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && value === "") {
        e.preventDefault();
        focusInput(index - 1, -1); // ⬅️ skip zablokowane
      }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isLocked) {
        setValue(e.target.value.slice(0, 1));
      }
    };

    const translateProperty = `translateX(${translateSizePx}px)`;
    
    return (
      <>
        <div className={cn("flex flex-col gap-3 items-center", className)}>
          <Input
            ref={localRef}
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            maxLength={1}
            disabled={isLocked}
            readOnly={isLocked}
            className={cn(
              isCorrect && "ring-2 ring-green-500",
              isLocked && "pointer-events-none opacity-80",
              "text-center w-16 h-16 transition-transform duration-[5000ms] ease-in-out",
              rotate && "rotate-180"
            )}
            style={{ transform: animate ? translateProperty : "translateX(0px)" }}
            autoComplete="one-time-code"
          />

          <Button
            variant="outline"
            disabled={!isEnabled}
            onClick={() => setShowModal(true)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>

        <PhotoModal
          photoURL={photoURL}
          showModal={showModal}
          closeModal={() => setShowModal(false)}
        />
      </>
    );
  },
);
