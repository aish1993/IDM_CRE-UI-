var sql = require('MSSQL');
var flow = browser.controlFlow();

class DataBaseConnection  {
	execute_sql_query(strQuery) {
		console.log("--- DB CONNECTION TRY BLOCK --- ")
		console.log("--- DB CONNECTION TRY BLOCK --- ")
//		var connectionString = 'mssql://sa:p@ssw0rd@10.249.121.11/edeposit';
		var connectionString = 'mssql://sit:p%40ssw0rd@10.118.58.6:1521/IDM';
		console.log("DB conenction successfully connected");
//		sql.connect('mssql://sit:p%40ssw0rd@10.118.58.6:1521/IDM');
//		var result= sql.query('select * from  ICPGroups where groupID=7');
		sql.connect(connectionString).then(function(err)  {
			console.log(err);
			sql.query(strQuery).then(function(result, err)  {
				console.log('DB Test');
				if(result)  {
					console.log("--- DB CONNECTION ERROR "+err instanceof sql.RequestError+" Info "+err.message)
				}
				else  {
					console.log("Total Affected Rows are: "+result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
					console.log("SQL Query Executed Successfully")
				}
			})
		})
		sql.close();
//		var conn = new sql.Connection(connectionString);
//		var req = new sql.Request(conn);
//		conn.connect(function (err) {
//		if (err) {
//		console.log(err);
//		return;

//		}
//		req.query(strQuery, function (err, recordset) {
//		if (err) {
//		console.log(err);
//		}
//		else {
//		console.log(recordset);
//		}
//		conn.close();
//		});

//		});
//		sql.connect(connectionString).then(function(){	
//		sql.query(strQuery).then(function(err,result){
//		if(err){

//		console.log("Breakpoint in DB_util.js if block")
////		console.log("--- DB CONNECTION ERROR "+err instanceof sql.RequestError+" Info "+err.message)
//		}
//		else{
//		console.log("Breakpoint in DB_util.js else block")
//		console.log("Total Affected Rows are: "+result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
//		console.log("SQL Query Executed Successfully")
//		console.log(result);
//		}
//		})
//		})
//		sql.close()
//		}
//		catch(err){
//		console.log("--- DB CONNECTION CATCH BLOCK ERROR ")
//		sql.close();

//		}

		//sql.close(); // Code doesn't work with SQL CLOSE() - Need to check
	}

}


/*
var DataBaseConnection = function() {
	var that = this;
	this.execute_sql_query = function(deferred, query) {
		return flow.execute(function() {
			var deferred = protractor.promise.defer();
			try{
				var connectionString = 'mssql://sa:p@ssw0rd@10.249.121.11/edeposit';
				sql.connect(connectionString).then(function(){	
					sql.query(strQuery).then(function(result, err){
						if(err){
							console.log("Err 1 "+strQuery)
						}
						else{
							console.log("1 "+result.recordsets.length) // count of recordsets returned by the procedure
							console.log("2 "+result.recordsets[0].length) // count of rows contained in first recordset
							console.log("3 "+result.recordset) // first recordset from result.recordsets
							console.log("4 "+result.returnValue) // procedure return value
							console.log("5 "+result.output) // key/value collection of output values
							console.log("6 "+result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens
						}
					})

				})
			}
			catch(err){
				console.log("Err "+strQuery)
			}
			finally{
				sql.close();
			}
		})
	}
};


 */

module.exports = new DataBaseConnection();
