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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/app/_components/ui/popover";
import { Calendar } from "~/app/_components/ui/calendar";
import { Separator } from "~/app/_components/ui/separator";
import { Spinner } from "~/app/_components/ui/spinner";

/* Sonner imports */
import { toast } from "sonner";

/* Icons Imports */
import { IconCalendarEvent, IconX } from "@tabler/icons-react";

/* Store Imports */
import { useDrawerStore } from "~/store/useTableStore";

/* Utils Imports */
import { format } from "date-fns";

/* API Imports */
import { api } from "~/trpc/react";

/* Default Payer Data */
const defaultItemData = {
  id: "",
  public_id: "",
  status: "active",
  make: "",
  model: "",
  year: "",
  vin: "",
  license_plate: "",
  color: "",
  registration_date: new Date(),
  registration_expiration_date: new Date(),
  mileage: "",
  level_of_service: "",
  base_location: "",
};

/* LOS Options */
const losOptions = [
  { value: "ambulatory", label: "Ambulatory" },
  { value: "wheelchair", label: "Wheelchair" },
  { value: "stretcher", label: "Stretcher" },
];

export default function Drawer() {
  /* Global states */
  const isDrawerOpen = useDrawerStore((state) => state.isDrawerOpen);
  const drawerData = useDrawerStore((state) => state.drawerData);

  /* Local states */
  const [itemState, setItemState] = useState(defaultItemData);
  const [dialogOpen, setDialogOpen] = useState(false);

  /* API Request */
  const request = api.vehicle.saveVehicle.useMutation({
    onSuccess: () => {
      useDrawerStore.setState({
        isDrawerOpen: false,
        drawerData: null,
        refreshData: !useDrawerStore.getState().refreshData,
      });

      toast.success("Vehicle created successfully", {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    },

    onError: () => {
      toast.error("Error creating vehicle.");
    },
  });

  /* Handle Close Sheet */
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
      drawerData: null,
      isDrawerOpen: false,
    });

    /* Reset local states */
    setItemState(defaultItemData);

    /* Reset dialog */
    setDialogOpen(false);
  };

  /* Save Item */
  const saveItem = () => {
    request.mutateAsync({
      id: itemState.id,
      public_id: itemState.public_id,
      make: itemState.make,
      model: itemState.model,
      year: itemState.year,
      vin: itemState.vin,
      license_plate: itemState.license_plate,
      color: itemState.color,
      registration_date: itemState.registration_date.toISOString().slice(0, 10),
      registration_expiration_date: itemState.registration_expiration_date
        .toISOString()
        .slice(0, 10),
      mileage: itemState.mileage,
      level_of_service: itemState.level_of_service,
      base_location: itemState.base_location,
    });
  };

  /* Update item state */
  useEffect(() => {
    drawerData && setItemState(drawerData);
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
            {itemState.id ? "Vehicle - " + itemState.public_id : "Add Vehicle"}
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
              value="capacity"
              className="rounded-none dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-purple-400 dark:data-[state=active]:border-x-transparent dark:data-[state=active]:border-t-transparent"
            >
              Capacity
            </TabsTrigger>
          </TabsList>

          {/* Information */}
          <TabsContent value="information" className="pt-2">
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="level_of_service">Level of Service</Label>

                  <Select
                    defaultValue={itemState.level_of_service ?? "ambulatory"}
                    onValueChange={(value) =>
                      setItemState({
                        ...itemState,
                        level_of_service: value,
                      })
                    }
                  >
                    <SelectTrigger id="level_of_service" className="w-full">
                      <SelectValue placeholder="Select a LOS" />
                    </SelectTrigger>

                    <SelectContent>
                      {losOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <span>{option.label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="vehicle_public_id">Vehicle ID</Label>
                  <Input
                    id="vehicle_public_id"
                    defaultValue={itemState.public_id}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
                        public_id: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="make">Make</Label>
                  <Input
                    id="make"
                    defaultValue={itemState.make}
                    onChange={(e) =>
                      setItemState({ ...itemState, make: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="model">Model</Label>
                  <Input
                    id="model"
                    defaultValue={itemState.model}
                    onChange={(e) =>
                      setItemState({ ...itemState, model: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    defaultValue={itemState.year}
                    onChange={(e) =>
                      setItemState({ ...itemState, year: e.target.value })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="vin">VIN</Label>
                  <Input
                    id="vin"
                    defaultValue={itemState.vin}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
                        vin: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="license_plate">License Plate</Label>
                  <Input
                    id="license_plate"
                    defaultValue={itemState.license_plate}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
                        license_plate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    defaultValue={itemState.color}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
                        color: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="mileage">Mileage</Label>
                  <Input
                    id="mileage"
                    defaultValue={itemState.mileage}
                    onChange={(e) =>
                      setItemState({
                        ...itemState,
                        mileage: e.target.value,
                      })
                    }
                  />
                </div>

                <Separator className="col-span-2" />

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="registration_date">Registration Date</Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!itemState.registration_date}
                        className="justify-start"
                      >
                        <IconCalendarEvent />
                        {itemState.registration_date ? (
                          format(itemState.registration_date, "PPP")
                        ) : (
                          <span>Select a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={itemState.registration_date}
                        onSelect={(date) =>
                          setItemState({
                            ...itemState,
                            registration_date: date || new Date(),
                          })
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="flex flex-col gap-y-2">
                  <Label htmlFor="registration_expiration_date">
                    Registration Expiration Date
                  </Label>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        data-empty={!itemState.registration_expiration_date}
                        className="justify-start"
                      >
                        <IconCalendarEvent />
                        {itemState.registration_expiration_date ? (
                          format(itemState.registration_expiration_date, "PPP")
                        ) : (
                          <span>Select a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>

                    <PopoverContent>
                      <Calendar
                        mode="single"
                        selected={itemState.registration_expiration_date}
                        onSelect={(date) =>
                          setItemState({
                            ...itemState,
                            registration_expiration_date: date || new Date(),
                          })
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </form>
          </TabsContent>

          {/* Capacity */}
          <TabsContent value="capacity">Capacity</TabsContent>
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
}
