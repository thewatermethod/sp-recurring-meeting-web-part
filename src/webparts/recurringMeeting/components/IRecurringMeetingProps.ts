export interface IRecurringMeetingProps {
  title: string;
  inactive: string;
  url: string;
  platform: number;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  startTimeHour: number;
  startTimeMinutes: number;
  startTimeMeridian: number;
  endTimeHour: number;
  endTimeMinutes: number;
  endTimeMeridian: number;
}
