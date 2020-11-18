import * as React from "react";
import styles from "./RecurringMeeting.module.scss";
import { IRecurringMeetingProps } from "./IRecurringMeetingProps";
import { escape } from "@microsoft/sp-lodash-subset";
import { IRecurringMeetingWebPartProps } from "../RecurringMeetingWebPart";


interface IRecurringMeetingState {
  disabled: boolean;
  disabledCalculated: boolean;
}

export default class RecurringMeeting extends React.Component<
  IRecurringMeetingProps,
  IRecurringMeetingState
> {
  constructor(props: IRecurringMeetingWebPartProps) {
    super(props);

   // let date = new Date().toString();

    this.state = {
      disabled: true,
      disabledCalculated: false,
      // currentTime: date
    };

  }

  public days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  public componentDidMount() {
    if (!this.state.disabledCalculated) {
      this.setState({ disabled: this.isDisabled(), disabledCalculated: true });
    }

    setInterval(() => {    
      this.setState({ disabled: this.isDisabled() });
    }, 60 * 1000);

  }

  public componentDidUpdate(prevProps) {
    if (prevProps != this.props) {
      this.setState({ disabled: this.isDisabled(), disabledCalculated: true });
    }
  }

  public getHour(hour: number, meridian: number) {
    if (!meridian && !hour) {
      return 0;
    }

    if (!meridian) {
      return hour;
    }

    if (meridian == 0 && hour == 12) {
      return hour;
    }

    if (meridian == 1 && hour != 12) {
      return hour + 12;
    }
  }

  public isDisabled() {
    console.log(`calculating disabled`);
    const d = new Date();
    const y = d.getDay();
    const h = d.getHours();
    const m = d.getMinutes();
    const days = this.getActiveDays();

    let startTimeHour = this.getHour(
      this.props.startTimeHour,
      this.props.startTimeMeridian
    );
    let endTimeHour = this.getHour(
      this.props.endTimeHour,
      this.props.endTimeMeridian
    );

    const startTimeMinutes = this.props.startTimeMinutes;
    const endTimeMinutes = this.props.endTimeMinutes;

    if (h < startTimeHour || h > endTimeHour) {
      console.log("Wrong hour");

      return true;
    }

    if (h == startTimeHour && m < startTimeMinutes) {
      console.log("Right start hour, wrong minutes");
      return true;
    }

    if (h == endTimeHour && m > endTimeMinutes) {
      console.log("Right end hour, wrong minutes");
      return true;
    }

    if (days.indexOf(y) == -1) {
      console.log("Not one of our days");
      return true;
    }

    return false;
  }

  public getActiveDays() {
    const week = [
      this.props.sunday,
      this.props.monday,
      this.props.tuesday,
      this.props.wednesday,
      this.props.thursday,
      this.props.friday,
      this.props.saturday,
    ];

    const days = [];

    week.forEach((day, index) => {
      if (day) {
        days.push(index);
      }
    });

    return days;
  }

  public getRowStyle() {
    if (this.state.disabled) {
      return styles.disabledRow;
    }

    return this.props.platform == 0 ? styles.teamsRow : styles.zoomRow;
  }

  public getMeridian(meridian: number) {
    if (meridian == 0) {
      return "AM";
    }

    if (meridian == 1) {
      return "PM";
    }

    return ``;
  }

  public getFormattedMinutes(minutes: number) {
    if (minutes < 10) {
      return `0${minutes}`;
    }

    return minutes;
  }

  public render(): React.ReactElement<IRecurringMeetingProps> {
    /** calculate background color */
    let rowStyle = this.getRowStyle();

    return (     
      
      <div className={styles.recurringMeeting}>
   
            <div className={styles.container}>
              <div className={rowStyle}>
                <div>
                  <span
                    className={
                      this.props.platform == 0 ? styles.teamsLogo : styles.zoomLogo
                    }
                  ></span>
                  {!this.state.disabled ? (
                    <React.Fragment>
                      <span className={styles.title}>{this.props.title}</span>
                      <a
                        href={this.props.url}
                        className={styles.button}
                        target="_blank"
                      >
                        <span className={styles.label}>Join Now</span>
                      </a>
                    </React.Fragment>
                  ) : (
                      <span className={styles.smTitle}>
                        {this.props.inactive}
                        <br />
                        {this.getActiveDays().map((day) => {
                          return (
                            <span key={day}>
                              {this.days[day]}
                              {"  "}
                            </span>
                          );
                        })}
                        <br />
                  from {this.props.startTimeHour}:
                        {this.getFormattedMinutes(this.props.startTimeMinutes)}{" "}
                        {this.getMeridian(this.props.startTimeMeridian)}
                        {"  "}
                  till {this.props.endTimeHour}:
                        {this.getFormattedMinutes(this.props.endTimeMinutes)}{" "}
                        {this.getMeridian(this.props.endTimeMeridian)}
                      </span>
                    )}
                </div>
              </div>
            </div>
          </div>
     
    );
  }
}
