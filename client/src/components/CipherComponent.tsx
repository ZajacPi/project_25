import { useState, useEffect } from "react";
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
}

export const CipherComponent = ({ password, photoURL, className, enableButton, isEnabled }: CipherComponentProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const correct = inputValue === password;
    setIsCorrect(correct);
    if (correct) {
      enableButton();
    }
  }, [inputValue, password, enableButton]);
  

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className={cn(["flex flex-col gap-3 items-center", className])}>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className={cn(isCorrect && "ring-2 ring-green-500", "text-center w-16 h-16")}
        />
        <Button
          variant="outline"
          disabled={!isEnabled}
          onClick={() => setShowModal(!showModal)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      </div>
      <PhotoModal photoURL={photoURL} showModal={showModal} closeModal={closeModal} />
    </>
  );
};
