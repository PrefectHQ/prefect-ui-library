/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * Contains validated Prefect settings.
 *
 * Settings should be accessed using the relevant `Setting` object. For example:
 * ```python
 * from prefect.settings import PREFECT_HOME
 * PREFECT_HOME.value()
 * ```
 *
 * Accessing a setting attribute directly will ignore any `value_callback` mutations.
 * This is not recommended:
 * ```python
 * from prefect.settings import Settings
 * Settings().PREFECT_PROFILES_PATH  # PosixPath('${PREFECT_HOME}/profiles.toml')
 * ```
 */
export type Settings = {
    /**
     * Prefect's home directory. Defaults to `~/.prefect`. This
     * directory may be created automatically when required.
     */
    PREFECT_HOME?: string;
    /**
     * If `True`, places the API in debug mode. This may modify
     * behavior to facilitate debugging, including extra logs and other verbose
     * assistance. Defaults to `False`.
     */
    PREFECT_DEBUG_MODE?: boolean;
    /**
     * If `True`, use colors in CLI output. If `False`,
     * output will not include colors codes. Defaults to `True`.
     */
    PREFECT_CLI_COLORS?: boolean;
    /**
     * If `True`, wrap text by inserting new lines in long lines
     * in CLI output. If `False`, output will not be wrapped. Defaults to `True`.
     */
    PREFECT_CLI_WRAP_LINES?: boolean;
    /**
     * If `True`, places the API in test mode. This may modify
     * behavior to faciliate testing. Defaults to `False`.
     */
    PREFECT_TEST_MODE?: boolean;
    /**
     * This variable only exists to faciliate testing of settings.
     * If accessed when `PREFECT_TEST_MODE` is not set, `None` is returned.
     */
    PREFECT_TEST_SETTING?: any;
    /**
     * If provided, the url of an externally-hosted Orion API.
     * Defaults to `None`.
     */
    PREFECT_API_URL?: string;
    /**
     * API key used to authenticate against Orion API.
     * Defaults to `None`.
     */
    PREFECT_API_KEY?: string;
    /**
     * API URL for Prefect Cloud
     */
    PREFECT_CLOUD_URL?: string;
    /**
     * The default timeout for requests to the API
     */
    PREFECT_API_REQUEST_TIMEOUT?: number;
    /**
     * The path to a profiles configuration files.
     */
    PREFECT_PROFILES_PATH?: string;
    /**
     * The path to a directory to store things in.
     */
    PREFECT_LOCAL_STORAGE_PATH?: string;
    /**
     * The default logging level for Prefect loggers. Defaults to
     * "INFO" during normal operation. Is forced to "DEBUG" during debug mode.
     */
    PREFECT_LOGGING_LEVEL?: string;
    /**
     * The default logging level for the Orion API.
     */
    PREFECT_LOGGING_SERVER_LEVEL?: string;
    /**
     * The path to a custom YAML logging configuration file. If
     * no file is found, the default `logging.yml` is used. Defaults to a logging.yml in the Prefect home directory.
     */
    PREFECT_LOGGING_SETTINGS_PATH?: string;
    /**
     * Additional loggers to attach to Prefect logging at runtime.
     * Values should be comma separated. The handlers attached to the 'prefect' logger
     * will be added to these loggers. Additionally, if the level is not set, it will
     * be set to the same level as the 'prefect' logger.
     *
     */
    PREFECT_LOGGING_EXTRA_LOGGERS?: string;
    /**
     * Should logs be sent to Orion? If False, logs sent to the
     * OrionHandler will not be sent to the API.
     */
    PREFECT_LOGGING_ORION_ENABLED?: boolean;
    /**
     * The number of seconds between batched writes of logs to Orion.
     */
    PREFECT_LOGGING_ORION_BATCH_INTERVAL?: number;
    /**
     * The maximum size in bytes for a batch of logs.
     */
    PREFECT_LOGGING_ORION_BATCH_SIZE?: number;
    /**
     * The maximum size in bytes for a single log.
     */
    PREFECT_LOGGING_ORION_MAX_LOG_SIZE?: number;
    /**
     * The agent loop interval, in seconds. Agents will check
     * for new runs this often. Defaults to `5`.
     */
    PREFECT_AGENT_QUERY_INTERVAL?: number;
    /**
     * Agents will look for scheduled runs this many seconds in
     * the future and attempt to run them. This accounts for any additional
     * infrastructure spin-up time or latency in preparing a flow run. Note
     * flow runs will not start before their scheduled time, even if they are
     * prefetched. Defaults to `10`.
     */
    PREFECT_AGENT_PREFETCH_SECONDS?: number;
    /**
     * Password to template into the `PREFECT_ORION_DATABASE_CONNECTION_URL`.
     * This is useful if the password must be provided separately from the connection URL.
     * To use this setting, you must include it in your connection URL.
     */
    PREFECT_ORION_DATABASE_PASSWORD?: string;
    /**
     *
     * A database connection URL in a SQLAlchemy-compatible
     * format. Orion currently supports SQLite and Postgres. Note that all
     * Orion engines must use an async driver - for SQLite, use
     * `sqlite+aiosqlite` and for Postgres use `postgresql+asyncpg`.
     *
     * SQLite in-memory databases can be used by providing the url
     * `sqlite+aiosqlite:///file::memory:?cache=shared&uri=true&check_same_thread=false`,
     * which will allow the database to be accessed by multiple threads. Note
     * that in-memory databases can not be accessed from multiple processes and
     * should only be used for simple tests.
     *
     * Defaults to a sqlite database stored in the Prefect home directory.
     *
     * If you need to provide password via a different environment variable, you use
     * the `PREFECT_ORION_DATABASE_PASSWORD` setting. For example:
     *
     * PREFECT_ORION_DATABASE_PASSWORD='mypassword'
     * PREFECT_ORION_DATABASE_CONNECTION_URL='postgresql+asyncpg://postgres:${PREFECT_ORION_DATABASE_PASSWORD}@localhost/orion'
     *
     */
    PREFECT_ORION_DATABASE_CONNECTION_URL?: string;
    /**
     * If `True`, SQLAlchemy will log all SQL issued to the database. Defaults to `False`.
     */
    PREFECT_ORION_DATABASE_ECHO?: boolean;
    /**
     * If `True`, the database will be upgraded on application creation. If `False`, the database will need to be upgraded manually.
     */
    PREFECT_ORION_DATABASE_MIGRATE_ON_START?: boolean;
    /**
     * A statement timeout, in seconds, applied to all database
     * interactions made by the API. Defaults to `1`.
     */
    PREFECT_ORION_DATABASE_TIMEOUT?: number;
    /**
     * A connection timeout, in seconds, applied to database
     * connections. Defaults to `5`.
     */
    PREFECT_ORION_DATABASE_CONNECTION_TIMEOUT?: number;
    /**
     * The scheduler loop interval, in seconds. This determines
     * how often the scheduler will attempt to schedule new flow runs, but has
     * no impact on how quickly either flow runs or task runs are actually
     * executed. Creating new deployments or schedules will always create new
     * flow runs optimistically, without waiting for the scheduler. Defaults to
     * `60`.
     */
    PREFECT_ORION_SERVICES_SCHEDULER_LOOP_SECONDS?: number;
    /**
     * The number of deployments the scheduler will attempt to
     * schedule in a single batch. If there are more deployments than the batch
     * size, the scheduler immediately attempts to schedule the next batch; it
     * does not sleep for `scheduler_loop_seconds` until it has visited every
     * deployment once. Defaults to `100`.
     */
    PREFECT_ORION_SERVICES_SCHEDULER_DEPLOYMENT_BATCH_SIZE?: number;
    /**
     * The scheduler will attempt to schedule up to this many
     * auto-scheduled runs in the future. Note that runs may have fewer than
     * this many scheduled runs, depending on the value of
     * `scheduler_max_scheduled_time`.  Defaults to `100`.
     *
     */
    PREFECT_ORION_SERVICES_SCHEDULER_MAX_RUNS?: number;
    /**
     * The scheduler will create new runs up to this far in the
     * future. Note that this setting will take precedence over
     * `scheduler_max_runs`: if a flow runs once a month and
     * `scheduled_max_scheduled_time` is three months, then only three runs will be
     * scheduled. Defaults to 100 days (`8640000` seconds).
     *
     */
    PREFECT_ORION_SERVICES_SCHEDULER_MAX_SCHEDULED_TIME?: number;
    /**
     * The number of flow runs the scheduler will attempt to insert
     * in one batch across all deployments. If the number of flow runs to
     * schedule exceeds this amount, the runs will be inserted in batches of this size. Defaults to `500`.
     *
     */
    PREFECT_ORION_SERVICES_SCHEDULER_INSERT_BATCH_SIZE?: number;
    /**
     * The late runs service will look for runs to mark as late
     * this often. Defaults to `5`.
     */
    PREFECT_ORION_SERVICES_LATE_RUNS_LOOP_SECONDS?: number;
    /**
     * The late runs service will mark runs as late after they
     * have exceeded their scheduled start time by this many seconds. Defaults
     * to `5` seconds.
     */
    PREFECT_ORION_SERVICES_LATE_RUNS_AFTER_SECONDS?: number;
    /**
     * The default limit applied to queries that can return
     * multiple objects, such as `POST /flow_runs/filter`.
     */
    PREFECT_ORION_API_DEFAULT_LIMIT?: number;
    /**
     * The API's host address (defaults to `127.0.0.1`).
     */
    PREFECT_ORION_API_HOST?: string;
    /**
     * The API's port address (defaults to `4200`).
     */
    PREFECT_ORION_API_PORT?: number;
    /**
     * Whether or not to serve the Orion UI.
     */
    PREFECT_ORION_UI_ENABLED?: boolean;
    /**
     * The connection url for communication from the UI to the API.
     * Defaults to `PREFECT_API_URL` if set. Otherwise, the default URL is generated from
     * `PREFECT_ORION_API_HOST` and `PREFECT_ORION_API_PORT`. If providing a custom value,
     * the aforementioned settings may be templated into the given string.
     */
    PREFECT_ORION_UI_API_URL?: string;
    /**
     * If True, Orion sends anonymous data (e.g. count of flow runs, package version) to Prefect to help us improve.
     */
    PREFECT_ORION_ANALYTICS_ENABLED?: boolean;
    /**
     * Whether or not to start the scheduling service in the Orion application. If disabled, you will need to run this service separately to schedule runs for deployments.
     */
    PREFECT_ORION_SERVICES_SCHEDULER_ENABLED?: boolean;
    /**
     * Whether or not to start the late runs service in the Orion application. If disabled, you will need to run this service separately to have runs past their scheduled start time marked as late.
     */
    PREFECT_ORION_SERVICES_LATE_RUNS_ENABLED?: boolean;
    /**
     * Whether or not to start the flow run notifications service in the Orion application. If disabled, you will need to run this service separately to send flow run notifications.
     */
    PREFECT_ORION_SERVICES_FLOW_RUN_NOTIFICATIONS_ENABLED?: boolean;
};

