export const tableFilterSettings = {
  defaultColumnsHidden: [],
  searchBy: {
    placeholder: "Filter members...",
    defaultValue: "first_name",
    selectItems: [
      { label: "Id", value: "public_id" },
      { label: "Name", value: "first_name" },
      { label: "Phone Number", value: "phone_number" },
      { label: "Address", value: "address" },
    ],
  },
};
