declare interface IRecurringMeetingWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  TimeGroupName: string;
  TitleFieldLabel: string;
  InactiveFieldLabel: string;
  UrlFieldLabel: string;
  PlatformFieldLabel: string;
  StartTimeHoursFieldLabel: string;
  StartTimeMinutesFieldLabel: string;
  StartTimeMeridianFieldLabel: string;
  EndTimeHoursFieldLabel: string;
  EndTimeMinutesFieldLabel: string;
  EndTimeMeridianFieldLabel: string;
  MondayFieldLabel: string;
  TuesdayFieldLabel: string;
  WednesdayFieldLabel: string;
  ThursdayFieldLabel: string;
  FridayFieldLabel: string;
  SaturdayFieldLabel: string;
  SundayFieldLabel: string;
}

declare module "RecurringMeetingWebPartStrings" {
  const strings: IRecurringMeetingWebPartStrings;
  export = strings;
}
