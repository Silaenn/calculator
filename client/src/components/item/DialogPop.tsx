import { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";

const DialogPop = () => {
  return (
    <AlertDialog>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Kirimkan Masukan / Saran Anda kepada Kami
          </AlertDialogTitle>
          <AlertDialogDescription>
            <Input
              className="h-32 mt-4"
              placeholder="Umpan Balik / Saran tentang Kalkulator kami"
            />
            <Input
              className="h-12 mt-3"
              placeholder="Masukan Email untuk mendapatkan Respon"
            />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction className="mt-2">Kirim Masukan</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogPop;
