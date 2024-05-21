export type ProjectImages = {
  id: number;
  medium_type: string;
  url: string[];
  user_id: string;
  title: string;
  description: string;
  publish_date: Date;
};



export const options = [
  { label: "Traditional", value: "traditional" },
  { label: "Digital", value: "digital" },
];
export const WorkModelOptions = [
  { label: "Hybrid", value: "Hybrid" },
  { label: "Remote", value: "Remote" },
  { label: "In office", value: "In office" },
];
export const ContracTypeOptions = [
  { label: "Permanent", value: "Permanent" },
  { label: "Fixed term", value: "Fixed term" },
  { label: "Temporary", value: "Temporary" },
  { label: "Internship", value: "Internship" },
];
export const WorkingHoursOptions = [
  { label: "Full time", value: "Full time" },
  { label: "Part time", value: "Part time" },
];
export const participantsOptions = [
  { label: "Spain", value: "Spain" },
  { label: "International", value: "International" },
];
export const scheduleOptions = [
  { label: "Full year", value: "Full year" },
  { label: "Short duration", value: "Short duration" },
];

