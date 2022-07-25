/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * RRule schedule, based on the iCalendar standard
 * ([RFC 5545](https://datatracker.ietf.org/doc/html/rfc5545)) as
 * implemented in `dateutils.rrule`.
 *
 * RRules are appropriate for any kind of calendar-date manipulation, including
 * irregular intervals, repetition, exclusions, week day or day-of-month
 * adjustments, and more.
 *
 * Note that as a calendar-oriented standard, `RRuleSchedules` are sensitive to
 * to the initial timezone provided. A 9am daily schedule with a daylight saving
 * time-aware start date will maintain a local 9am time through DST boundaries;
 * a 9am daily schedule with a UTC start date will maintain a 9am UTC time.
 */
export type RRuleSchedule = {
    rrule: string;
    timezone?: string;
};

