import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useNewAccount } from "@/features/accounts/hooks/useNewAccount";
import { AccountForm } from "./AccountForm";

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();


  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New account</SheetTitle>
          <SheetDescription>
            Create a new account to track your transaction.
          </SheetDescription>
        </SheetHeader>

        <AccountForm onSubmit={() => {}} disabled={false} />
      </SheetContent>
    </Sheet>
  );
};
