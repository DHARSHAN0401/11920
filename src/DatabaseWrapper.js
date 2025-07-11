/**
 * DatabaseWrapper - A simple database wrapper with centralized logging
 */
const { Log } = require('./logging');

class DatabaseWrapper {
  /**
   * @param {object} dbClient - The database client/connection
   */
  constructor(dbClient) {
    this.dbClient = dbClient;
    Log('backend', 'info', 'db', 'Database connection initialized');
  }

  
  async connect() {
    try {
      await Log('backend', 'debug', 'db', 'Connecting to database...');
      await this.dbClient.connect();
      await Log('backend', 'info', 'db', 'Database connection established');
    } catch (err) {
      await Log('backend', 'error', 'db', `Database connection failed: ${err.message}`);
      throw err;
    }
  }

  
  async disconnect() {
    try {
      await Log('backend', 'debug', 'db', 'Disconnecting from database...');
      await this.dbClient.end();
      await Log('backend', 'info', 'db', 'Database connection closed');
    } catch (err) {
      await Log('backend', 'error', 'db', `Database disconnect failed: ${err.message}`);
      throw err;
    }
  }

  /**
   * Execute a query with logging
   * @param {string} query - SQL query string
   * @param {Array} params - Query parameters
   * @returns {object} Query result
   */
  async execute(query, params = []) {
    await Log('backend', 'debug', 'db', `Executing query: ${query}`);
    try {
      const result = await this.dbClient.query(query, params);
      const rowCount = result.rowCount || (result.rows ? result.rows.length : 0);
      await Log('backend', 'info', 'db', `Query succeeded: ${rowCount} rows returned`);
      return result;
    } catch (err) {
      await Log('backend', 'error', 'db', `Query failed: ${err.message}`);
      throw err;
    }
  }
}

module.exports = DatabaseWrapper;
