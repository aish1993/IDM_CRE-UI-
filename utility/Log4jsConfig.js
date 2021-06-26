class log4jsConfig{
	
	Log(){
		
			var log4js=require('log4js');
			log4js.configure('./Log4js.json');
			let log=log4js.getLogger('file');
			return log;
	}
	
}

module.exports= new log4jsConfig();