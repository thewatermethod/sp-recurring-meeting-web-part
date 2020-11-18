import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown,
  PropertyPaneCheckbox,
  PropertyPaneSlider,
} from "@microsoft/sp-property-pane";
import {
  BaseClientSideWebPart,
  PropertyPaneHorizontalRule,
} from "@microsoft/sp-webpart-base";

import * as strings from "RecurringMeetingWebPartStrings";
import RecurringMeeting from "./components/RecurringMeeting";
import { IRecurringMeetingProps } from "./components/IRecurringMeetingProps";

export interface IRecurringMeetingWebPartProps {
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

export default class RecurringMeetingWebPart extends BaseClientSideWebPart<
  IRecurringMeetingWebPartProps
> {
  public render(): void {
    const element: React.ReactElement<IRecurringMeetingProps> = React.createElement(
      RecurringMeeting,
      {
        title: this.properties.title,
        inactive: this.properties.inactive,
        url: this.properties.url,
        platform: this.properties.platform,
        monday: this.properties.monday,
        tuesday: this.properties.tuesday,
        wednesday: this.properties.wednesday,
        thursday: this.properties.thursday,
        friday: this.properties.friday,
        saturday: this.properties.saturday,
        sunday: this.properties.sunday,
        startTimeHour: this.properties.startTimeHour,
        startTimeMinutes: this.properties.startTimeMinutes,
        startTimeMeridian: this.properties.startTimeMeridian,
        endTimeHour: this.properties.endTimeHour,
        endTimeMinutes: this.properties.endTimeMinutes,
        endTimeMeridian: this.properties.endTimeMeridian,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("title", {
                  label: strings.TitleFieldLabel,
                }),
                PropertyPaneTextField("inactive", {
                  label: strings.InactiveFieldLabel,
                  value: "We're not around right now but join us on:",
                  multiline: true,
                }),
                PropertyPaneTextField("url", {
                  label: strings.UrlFieldLabel,
                }),
                PropertyPaneDropdown("platform", {
                  label: strings.PlatformFieldLabel,
                  options: [
                    { key: 0, text: "Teams" },
                    { key: 1, text: "Zoom" },
                  ],
                  selectedKey: 0,
                }),
              ],
            },
            {
              groupName: strings.TimeGroupName,
              groupFields: [
                PropertyPaneSlider("startTimeHour", {
                  label: strings.StartTimeHoursFieldLabel,
                  min: 1,
                  max: 12,
                  value: 12,
                }),
                PropertyPaneSlider("startTimeMinutes", {
                  label: strings.StartTimeMinutesFieldLabel,
                  min: 0,
                  max: 59,
                  value: 0,
                }),
                PropertyPaneDropdown("startTimeMeridian", {
                  label: strings.StartTimeMeridianFieldLabel,
                  options: [
                    { key: 0, text: "AM" },
                    { key: 1, text: "PM" },
                  ],
                }),
                PropertyPaneSlider("endTimeHour", {
                  label: strings.EndTimeHoursFieldLabel,
                  min: 1,
                  max: 12,
                  value: 12,
                }),

                PropertyPaneSlider("endTimeMinutes", {
                  label: strings.EndTimeMinutesFieldLabel,
                  min: 0,
                  max: 59,
                  value: 30,
                }),
                PropertyPaneDropdown("endTimeMeridian", {
                  label: strings.EndTimeMeridianFieldLabel,
                  options: [
                    { key: 0, text: "AM" },
                    { key: 1, text: "PM" },
                  ],
                }),
                PropertyPaneHorizontalRule(),
                PropertyPaneCheckbox("monday", {
                  text: strings.MondayFieldLabel,
                }),
                PropertyPaneCheckbox("tuesday", {
                  text: strings.TuesdayFieldLabel,
                }),
                PropertyPaneCheckbox("wednesday", {
                  text: strings.WednesdayFieldLabel,
                }),
                PropertyPaneCheckbox("thursday", {
                  text: strings.ThursdayFieldLabel,
                }),
                PropertyPaneCheckbox("friday", {
                  text: strings.FridayFieldLabel,
                }),
                PropertyPaneCheckbox("saturday", {
                  text: strings.SaturdayFieldLabel,
                }),
                PropertyPaneCheckbox("sunday", {
                  text: strings.SundayFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
