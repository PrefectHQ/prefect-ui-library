/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * A schedule formed by adding `interval` increments to an `anchor_date`. If no
 * `anchor_date` is supplied, January 1, 2020 at midnight UTC is used.
 *
 * NOTE: If the `IntervalSchedule` `anchor_date` or `timezone` is provided in a
 * DST-observing timezone, then the schedule will adjust itself appropriately.
 * Intervals greater than 24 hours will follow DST conventions, while intervals
 * of less than 24 hours will follow UTC intervals. For example, an hourly
 * schedule will fire every UTC hour, even across DST boundaries. When clocks
 * are set back, this will result in two runs that *appear* to both be
 * scheduled for 1am local time, even though they are an hour apart in UTC
 * time. For longer intervals, like a daily schedule, the interval schedule
 * will adjust for DST boundaries so that the clock-hour remains constant. This
 * means that a daily schedule that always fires at 9am will observe DST and
 * continue to fire at 9am in the local time zone.
 */
export type IntervalSchedule = {
    interval: number;
    timezone?: string;
    anchor_date?: string;
};

