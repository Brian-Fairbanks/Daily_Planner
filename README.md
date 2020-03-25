# Work Day Scheduler
[Hosted on Github](https://brian-fairbanks.github.io/Daily_Planner/)

Create a simple calendar application that allows the user to save events for each hour of the day.  It will also display the ablity to work with 3rd pary API's/Libraries, such as jQuery and Moments to dynamically update the CSS and HTML

[Moment.js](https://momentjs.com/) library works with date and time.

## User Story

```
AS AN employee with a busy schedule
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

```
GIVEN I am using a daily planner to create a schedule

WHEN I open the planner
THEN the current day is displayed at the top of the calendar using moments.

WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

The following animation demonstrates the application functionality:

![day planner demo](./Assets/05-third-party-apis-homework-demo.gif)
