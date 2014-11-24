/**
 * New Relic agent configuration.
 *
 * See lib/config.defaults.js in the agent distribution for a more complete
 * description of configuration variables and their potential values.
 */
exports.config = {
  /**
   * Array of application names.
   */
  app_name : ['CatElevator'],
  /**
   * Your New Relic license key.
   */
  license_key : 'e39519a1c99bb0e20dbcab461ba288d4366b23d6',
  logging : {
    /**
     * Level at which to log. 'trace' is most useful to New Relic when diagnosing
     * issues with the agent, 'info' and higher will impose the least overhead on
     * production applications.
     */
    level : 'trace'
  }
  host: 'catelevator.com';
  port: '80';
};
