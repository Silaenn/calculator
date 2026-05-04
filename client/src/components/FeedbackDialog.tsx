import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import FeedbackForm from "@/components/FeedbackForm";

interface FeedbackDialogProps {
  triggerLabel: string;
  triggerClassName?: string;
  title?: string;
  submitLabel?: string;
  submittingLabel?: string;
}

const FeedbackDialog: React.FC<FeedbackDialogProps> = ({
  triggerLabel,
  triggerClassName,
  title = "Feedback",
  submitLabel,
  submittingLabel,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button className={triggerClassName}>{triggerLabel}</button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-[var(--nb-bg)] border-[4px] border-[var(--nb-black)] shadow-[10px_10px_0px_var(--nb-black)] rounded-2xl w-[95vw] max-w-[95vw] md:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-black text-2xl uppercase flex items-center">
            <FontAwesomeIcon icon={faMessage} className="mr-3" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="pt-4 text-left">
            <FeedbackForm
              onSuccess={() => setIsOpen(false)}
              onCancel={() => setIsOpen(false)}
              submitLabel={submitLabel}
              submittingLabel={submittingLabel}
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FeedbackDialog;
