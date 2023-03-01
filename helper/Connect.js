var sql = require('mssql');
var connectionString = 'Server=43.229.149.77,1443;Database=Q_ONLINE;User Id=sa;Password=satpqi#12.1.2564;Encrypt=false';
sql.connect(connectionString);

module.exports = { sql };
