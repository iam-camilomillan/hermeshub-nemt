export const tableFilterSettings = {
  defaultColumnsHidden: [],
  searchBy: {
    placeholder: "Filter payers...",
    defaultValue: "name",
    selectItems: [
      { label: "Id", value: "public_id" },
      { label: "Name", value: "name" },
      { label: "Phone", value: "phone_number" },
      { label: "Email", value: "email" },
    ],
  },
};
