/**
 * Created by bliberini on 4/10/16.
 */
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/sharedserver';

module.exports = {
    connectionString: connectionString
};