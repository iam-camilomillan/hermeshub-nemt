export const tableFilterSettings = {
  defaultColumnsHidden: {
    status: false,
    passenger_phone_number: false,
    level_of_service: false,
  },
  searchBy: {
    placeholder: "Filter trips ...",
    defaultValue: "passenger_name",
    selectItems: [
      { label: "Trip ID", value: "public_id" },
      { label: "Name", value: "passenger_name" },
      { label: "Phone", value: "passenger_phone_number" },
      { label: "PU Address", value: "pickup_address" },
      { label: "DO Address", value: "dropoff_address" },
    ],
  },
  rowFilter: [
    {
      title: "Status",
      column: "status",
      options: [
        { label: "Completed", value: "Completed" },
        { label: "Will Call", value: "Will Call" },
        { label: "Canceled", value: "Canceled" },
        { label: "Unassigned", value: "unassigned" },
      ],
    },

    {
      title: "LOS",
      column: "level_of_service",
      options: [
        { label: "Bariatric Wheelchair", value: "Bariatric Wheelchair" },
        { label: "Wheelchair", value: "Wheelchair" },
        { label: "Stretcher", value: "Stretcher" },
        { label: "Ambulatory", value: "Ambulatory" },
        { label: "Curb 2 Curb", value: "Curb 2 Curb" },
        { label: "Door 2 Door", value: "Door 2 Door" },
      ],
    },

    {
      title: "Payer",
      column: "payer_id",
      options: [
        { label: "alivi", value: "ALIVI" },
        { label: "modivcare", value: "MODIVCARE" },
        { label: "saferide", value: "SAFERIDE" },
        { label: "a2c", value: "A2C" },
      ],
    },
  ],
};
