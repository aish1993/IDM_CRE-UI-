var sql = require('mssql');
//var express = require('express');
var PropertiesReader = require('properties-reader');
var flow = browser.controlFlow();

//******Sql Database method**********
/*class DataBaseConnection  {
	 async execute_sql_query(query)  {
		try  {
			var dbConfig={
					server:SERVER,
					user:USER,
					password:PASSWORD,
					port:PORT,
					database:DATABASE
			};
			const connectionPool = new sql.ConnectionPool(dbConfig);
			if(!connectionPool.close())
			{
				connectionPool.close();
			}
			await connectionPool.connect();
			const result =await  connectionPool.request().query(query);
//			console.log(result.recordset);
			return result.recordset;
		}
		catch(err)  {
			console.log('There is an error'+err);
			connectionPool.close();
		}
	}
}*/

//******PostGress Database method**********
var PropertiesReader = require('properties-reader');
var flow = browser.controlFlow();
var pg = require('pg');
var dbArray = []
var result
var steps_util = requireUtilityPage('Steps_Utility');
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

class DataBaseConnection {
	async execute_sql_query(query) {
		var dbArray = []
		var connectionString = "postgres://azureadmin@devnedbpgsql001ps:cdhQRi2dIbSFaOcP@10.221.90.5:5432/postgres?sslmode=require?rejectUnauthorized:false";
		const Client = new pg.Client(connectionString);
		try {
			await Client.connect(async function (error) {
				if (error) {
					steps_util.fail_step(error);
				} else {
					steps_util.info_step('Postgress Database Connected Successfully!!)');
				}
			})
			result = await Client.query(query)
			result.rows.forEach(row => {
				dbArray.push(row)
			}, function (err) {
				steps_util.fail_step(err);
			})
		} catch (err) {
			steps_util.fail_step(err);
		}
		finally {
			Client.end(async function (error) {
				if (error) {
					steps_util.fail_step(error);
				} else {
					steps_util.info_step('Connection Closed Successfully!!)');
				}
			})
		}
		return dbArray
	}
}

module.exports = new DataBaseConnection();


