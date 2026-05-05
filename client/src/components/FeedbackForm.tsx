import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import api from "@/lib/api";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  email: z.string().email({ message: "Email tidak valid." }).min(2).max(50),
  content: z
    .string()
    .min(1, { message: "Pesan tidak boleh kosong." })
    .max(500, { message: "Pesan tidak boleh lebih dari 500 karakter." }),
});

interface FeedbackFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  submitLabel?: string;
  submittingLabel?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ 
  onSuccess, 
  onCancel, 
  submitLabel = "Send it!", 
  submittingLabel = "Sending..." 
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", content: "" },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api.post("/messages", values);
      form.reset();
      toast.success("Pesan Berhasil Terkirim", { 
        duration: 4000, 
        position: "bottom-right",
        icon: "✅" 
      });
      onSuccess?.();
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Pesan Gagal Terkirim", { position: "bottom-right" });
      } else {
        toast.error("Pesan Gagal Terkirim", { position: "bottom-right" });
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
        aria-busy={isSubmitting}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Email"
                  {...field}
                  disabled={isSubmitting}
                  className="border-2 border-[var(--nb-black)] rounded-xl p-6 font-bold"
                />
              </FormControl>
              <FormMessage className="font-bold text-[var(--nb-red)]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="How can we improve?"
                  {...field}
                  rows={4}
                  disabled={isSubmitting}
                  className="border-2 border-[var(--nb-black)] rounded-xl p-4 font-bold"
                />
              </FormControl>
              <FormMessage className="font-bold text-[var(--nb-red)]" />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
              className="border-2 border-[var(--nb-black)] font-black uppercase rounded-xl"
            >
              Cancel
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-[var(--nb-black)] text-[var(--nb-white)] border-2 border-[var(--nb-black)] shadow-[3px_3px_0px_var(--nb-black)] font-black uppercase rounded-xl px-8 hover:bg-[var(--nb-teal)] hover:text-[var(--nb-black)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--nb-white)] border-t-transparent" />
                {submittingLabel}
              </span>
            ) : (
              submitLabel
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default FeedbackForm;
