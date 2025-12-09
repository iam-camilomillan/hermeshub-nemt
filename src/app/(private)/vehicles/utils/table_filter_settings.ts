export const tableFilterSettings = {
  defaultColumnsHidden: [],
  searchBy: {
    placeholder: "Filter vehicles...",
    defaultValue: "public_id",
    selectItems: [
      { label: "Id", value: "public_id" },
      { label: "Make", value: "make" },
      { label: "Model", value: "model" },
      { label: "Year", value: "year" },
      { label: "VIN", value: "vin" },
      { label: "License Plate", value: "license_plate" },
      { label: "Color", value: "color" },
    ],
  },
};
