import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog"

interface PhotoModalProps {
  showModal: boolean
  closeModal: () => void
  photoURL: string
}

export const PhotoModal = ({ showModal, closeModal, photoURL }: PhotoModalProps) => {
  return (
    <Dialog open={showModal} onOpenChange={closeModal}>
      <DialogContent className="max-w-4xl p-0">
        <DialogHeader className="flex items-center justify-between p-4 border-b">
          <DialogTitle>Your Reward</DialogTitle>
          <DialogClose asChild>

          </DialogClose>
        </DialogHeader>

        <div className="flex justify-center items-center p-6">
          <img
            src={photoURL}
            alt="Reward"
            className="max-h-[500px] w-full object-contain rounded shadow"
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
