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
}

export const CipherComponent = ({ password, photoURL, className }: CipherComponentProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    setIsCorrect(inputValue === password);
  }, [inputValue, password]);

  const closeModal = () =>{
    setShowModal(false);
  }
  return (
    <>
    <div className={cn(["flex gap-3", className])}>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={cn(isCorrect && "ring-2 ring-green-500")}
      />
      <Button variant="outline" disabled={!isCorrect} onClick={() => setShowModal(!showModal)}>
        <Eye className="h-4 w-4" />
      </Button>
    </div>
    <PhotoModal photoURL={photoURL} showModal={showModal} closeModal={closeModal}/>
    </>
  );
};
