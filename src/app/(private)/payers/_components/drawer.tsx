"use client";

/* React imports */
import { useEffect, useState } from "react";

/* Shadcn imports */
import { Button } from "~/app/_components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "~/app/_components/ui/tabs";
import { Input } from "~/app/_components/ui/input";
import { Label } from "~/app/_components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/app/_components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "~/app/_components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/app/_components/ui/dialog";
import { Switch } from "~/app/_components/ui/switch";
import { Separator } from "~/app/_components/ui/separator";
import { Spinner } from "~/app/_components/ui/spinner";

/* Sonner imports */
import { toast } from "sonner";

/* Icons Imports */
import { IconX } from "@tabler/icons-react";

/* Store imports */
import { useDrawerStore } from "~/store/useTableStore";

/* API imports */
import { api } from "~/trpc/react";

/* Default Payer Data */
const defaultPayerData = {
  id: "",
  public_id: "",
  name: "",
  email: "",
  additional_email: "",
  phone_number: "",
  additional_phone_number: "",
  label_color: "",
  signature_at_pu: false,
  signature_at_do: false,
};

/* Color Options */
const colorOptions = [
  { label: "Default", value: "oklch(98.5% 0 0)" },
  { label: "Purple", value: "oklch(71.4% 0.203 305.504)" },
  { label: "Red", value: "oklch(70.4% 0.191 22.216)" },
  { label: "Orange", value: "oklch(75% 0.183 55.934)" },
  { label: "Yellow", value: "oklch(85.2% 0.199 91.936)" },
  { label: "Green", value: "oklch(79.2% 0.209 151.711)" },
  { label: "Blue", value: "oklch(70.7% 0.165 254.624)" },
];

export default function Drawer() {
  /* Global states */
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);
  const drawerData = useDrawerStore((state) => state.drawerData);

  /* Local states */
  const [payerState, setPayerState] = useState(defaultPayerData);
  const [dialogOpen, setDialogOpen] = useState(false);

  /* API Request */
  const request = api.payer.savePayer.useMutation({
    onSuccess: () => {
      useDrawerStore.setState({
        isDrawerOpen: false,
        drawerData: defaultPayerData,
        refreshData: !useDrawerStore.getState().refreshData,
      });

      toast.success("Payer created successfully", {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    },

    onError: () => {
      toast.error("Error creating payer");
    },
  });

  /* Handle Close Sheet */
  const handleCloseSheet = () => {
    if (request.isPending) return;

    if (payerState === defaultPayerData || payerState === drawerData) {
      useDrawerStore.setState({
        drawerData: defaultPayerData,
        isDrawerOpen: false,
      });

      return;
    }

    setDialogOpen(true);
  };

  /* Handle Close Dialog */
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  /* Handle Discard */
  const handleDiscard = () => {
    /* If request is pending, do nothing */
    if (request.isPending) return;

    /* Reset global states */
    useDrawerStore.setState({
      drawerData: defaultPayerData,
      isDrawerOpen: false,
    });

    /* Reset local states */
    setPayerState(defaultPayerData);

    /* Reset dialog */
    setDialogOpen(false);
  };

  /* Save Payer */
  const savePayer = () => {
    request.mutateAsync({
      id: payerState.id,
      public_id: payerState.public_id,
      name: payerState.name,
      email: payerState.email,
      additional_email: payerState.additional_email,
      phone_number: payerState.phone_number,
      additional_phone_number: payerState.additional_phone_number,
      label_color: payerState.label_color,
      signature_at_pu: payerState.signature_at_pu,
      signature_at_do: payerState.signature_at_do,
    });
  };

  /* Update payer state */
  useEffect(() => {
    drawerData && setPayerState(drawerData);
  }, [drawerData]);

  return (
    <Sheet open={isDrawerOpen} onOpenChange={handleCloseSheet}>
      {/* Dialog */}
      <Dialog open={dialogOpen}>
        <DialogContent className="sm:max-w-sm" showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>You are leaving without saving.</DialogTitle>

            <DialogDescription>Continue and discard changes?</DialogDescription>
          </DialogHeader>

          <DialogFooter className="justify-end">
            <Button variant="destructive" onClick={handleDiscard}>
              Discard
            </Button>

            <DialogClose asChild>
              <Button variant="secondary" onClick={handleCloseDialog}>
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <SheetContent
        className="lg:max-w-[512px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        {/* Sheet Header */}
        <SheetHeader className="flex flex-row items-center justify-between pb-0">
          <SheetTitle>
            {payerState.id ? payerState.name : "Add Payer"}
          </SheetTitle>

          <SheetClose>
            <Button variant="ghost" className="size-6 p-0" asChild>
              <IconX />
            </Button>
          </SheetClose>
        </SheetHeader>

        {/* Tabs */}
        <Tabs defaultValue="information" className="overflow-y-auto px-4">
          <TabsList className="bg-transparent p-0">
            <TabsTrigger
              value="information"
              className="rounded-none dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-purple-400 dark:data-[state=active]:border-x-transparent dark:data-[state=active]:border-t-transparent"
            >
              Information
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="rounded-none dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-purple-400 dark:data-[state=active]:border-x-transparent dark:data-[state=active]:border-t-transparent"
            >
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Information */}
          <TabsContent value="information" className="pt-2">
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="payer_public_id">Payer ID</Label>
                  <Input
                    id="payer_public_id"
                    defaultValue={payerState.public_id}
                    onChange={(e) =>
                      setPayerState({
                        ...payerState,
                        public_id: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="payer_name">Payer Name</Label>
                  <Input
                    id="payer_name"
                    defaultValue={payerState.name}
                    onChange={(e) =>
                      setPayerState({ ...payerState, name: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    defaultValue={payerState.email}
                    onChange={(e) =>
                      setPayerState({ ...payerState, email: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="additional_email">Additional Email</Label>
                  <Input
                    id="additional_email"
                    defaultValue={payerState.additional_email}
                    onChange={(e) =>
                      setPayerState({
                        ...payerState,
                        additional_email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    defaultValue={payerState.phone_number}
                    onChange={(e) =>
                      setPayerState({
                        ...payerState,
                        phone_number: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="additional_phone_number">
                    Additional Phone Number
                  </Label>
                  <Input
                    id="additional_phone_number"
                    defaultValue={payerState.additional_phone_number}
                    onChange={(e) =>
                      setPayerState({
                        ...payerState,
                        additional_phone_number: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="label_color">Label Color</Label>

                  <Select
                    defaultValue={payerState.label_color ?? "oklch(98.5% 0 0)"}
                    onValueChange={(value) =>
                      setPayerState({
                        ...payerState,
                        label_color: value,
                      })
                    }
                  >
                    <SelectTrigger id="label_color" className="w-full">
                      <SelectValue placeholder="Select a color" />
                    </SelectTrigger>

                    <SelectContent>
                      {colorOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div
                            className="size-4 rounded-full"
                            style={{
                              backgroundColor: option.value,
                            }}
                          />

                          <span>{option.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="col-span-2" />

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="signature_at_pu">Signature at PU</Label>
                  <Switch
                    id="signature_at_pu"
                    checked={payerState.signature_at_pu}
                    onCheckedChange={(value) => {
                      setPayerState({
                        ...payerState,
                        signature_at_pu: value,
                      });
                    }}
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="signature_at_do">Signature at DO</Label>
                  <Switch
                    id="signature_at_do"
                    checked={payerState.signature_at_do}
                    onCheckedChange={(value) => {
                      setPayerState({
                        ...payerState,
                        signature_at_do: value,
                      });
                    }}
                  />
                </div>
              </div>
            </form>
          </TabsContent>

          {/* Billing */}
          <TabsContent value="billing">Billing</TabsContent>
        </Tabs>

        {/* Footer */}
        <SheetFooter>
          <Button onClick={() => savePayer()}>
            {request.isPending ? (
              <Spinner />
            ) : payerState.id ? (
              "Update"
            ) : (
              "Save"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
