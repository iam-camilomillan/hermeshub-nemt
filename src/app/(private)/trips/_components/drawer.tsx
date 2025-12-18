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
import { Separator } from "~/app/_components/ui/separator";
import { Spinner } from "~/app/_components/ui/spinner";

/* Sonner imports */
import { toast } from "sonner";

/* Icons Imports */
import { IconX } from "@tabler/icons-react";

/* Store imports */
import { useDrawerStore } from "~/store/use-drawer-store";

/* API imports */
import { api } from "~/trpc/react";

/* Default Item Data */
const defaultItemData = {
  id: "",
  public_id: "",
  first_name: "",
  last_name: "",
  phone_number: "",
  additional_phone_number: "",
  address: "",
  address_location_type: "",
  additional_address: "",
  additional_address_location_type: "",
};

const Drawer = () => {
  /* Global states */
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);
  const drawerData = useDrawerStore((state) => state.drawerData);

  /* Local states */
  const [itemState, setItemState] = useState(defaultItemData);
  const [dialogOpen, setDialogOpen] = useState(false);

  /* API request */
  const request = api.member.saveMember.useMutation({
    onSuccess: () => {
      useDrawerStore.setState({
        isDrawerOpen: false,
        drawerData: defaultItemData,
        refreshData: !useDrawerStore.getState().refreshData,
      });

      toast.success(
        itemState.id
          ? "Member updated successfully"
          : "Member created successfully",
        {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        },
      );
    },

    onError: () => {
      toast.error(
        itemState.id ? "Error updating member" : "Error creating member",
      );
    },
  });

  /* Handle close sheet */
  const handleCloseSheet = () => {
    if (request.isPending) return;

    if (itemState === defaultItemData || itemState === drawerData) {
      useDrawerStore.setState({
        drawerData: null,
        isDrawerOpen: false,
      });

      return;
    }

    setDialogOpen(true);
  };

  /* Handle close dialog */
  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  /* Handle discard */
  const handleDiscard = () => {
    /* If request is pending, do nothing */
    if (request.isPending) return;

    /* Reset global states */
    useDrawerStore.setState({
      drawerData: null,
      isDrawerOpen: false,
    });

    /* Reset local states */
    setItemState(defaultItemData);

    /* Reset dialog */
    setDialogOpen(false);
  };

  /* Save item */
  const saveItem = () => {
    /* If request is pending, do nothing */
    if (request.isPending) return;

    /* If item state is default, do nothing */
    if (itemState === defaultItemData) return;

    /* If item state is drawer data, do nothing */
    if (itemState === drawerData) return;

    /* Make request */
    request.mutateAsync({
      id: itemState.id,
      public_id: itemState.public_id,
      first_name: itemState.first_name,
      last_name: itemState.last_name,
      phone_number: itemState.phone_number,
      additional_phone_number: itemState.additional_phone_number,
      address: itemState.address,
      address_location_type: itemState.address_location_type,
      additional_address: itemState.additional_address,
      additional_address_location_type:
        itemState.additional_address_location_type,
    });
  };

  /* Update item state */
  useEffect(() => {
    drawerData ? setItemState(drawerData) : setItemState(defaultItemData);
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
            {itemState.id
              ? `Edit ${itemState.first_name} ${itemState.last_name}`
              : "Add Member"}
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
          </TabsList>

          {/* Information */}
          <TabsContent value="information" className="pt-2">
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="member_public_id">Member ID</Label>
                  <Input
                    id="member_public_id"
                    defaultValue={itemState.public_id}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
                        public_id: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-2 grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      defaultValue={itemState.first_name}
                      onChange={(e) =>
                        setItemState({
                          ...itemState,
                          first_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col gap-y-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      defaultValue={itemState.last_name}
                      onChange={(e) =>
                        setItemState({
                          ...itemState,
                          last_name: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="phone_number">Phone Number</Label>
                  <Input
                    id="phone_number"
                    defaultValue={itemState.phone_number}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
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
                    defaultValue={itemState.additional_phone_number}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
                        additional_phone_number: e.target.value,
                      })
                    }
                  />
                </div>

                <Separator className="col-span-2" />

                <div className="col-span-2 flex flex-col gap-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    defaultValue={itemState.address}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
                        address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-2 flex flex-col gap-y-2">
                  <Label htmlFor="address_location_type">Location Type</Label>
                  <Select
                    defaultValue={itemState.address_location_type}
                    onValueChange={(value) =>
                      setItemState({
                        ...itemState,
                        address_location_type: value,
                      })
                    }
                  >
                    <SelectTrigger
                      id="address_location_type"
                      className="w-full"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="facility">Facility</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="col-span-2" />

                <div className="col-span-2 flex flex-col gap-y-2">
                  <Label htmlFor="additional_address">Additional Address</Label>
                  <Input
                    id="additional_address"
                    defaultValue={itemState.additional_address}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
                        additional_address: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="col-span-2 flex flex-col gap-y-2">
                  <Label htmlFor="additional_address_location_type">
                    Location Type
                  </Label>
                  <Select
                    defaultValue={itemState.additional_address_location_type}
                    onValueChange={(value) =>
                      setItemState({
                        ...itemState,
                        additional_address_location_type: value,
                      })
                    }
                  >
                    <SelectTrigger
                      id="additional_address_location_type"
                      className="w-full"
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="facility">Facility</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </form>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <SheetFooter>
          <Button onClick={() => saveItem()}>
            {request.isPending ? <Spinner /> : itemState.id ? "Update" : "Save"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default Drawer;
