var exec  = require('child_process').exec;
var fs = require('fs');
var cuid = require('cuid');
var colors = require('colors');
var process1 = require('process')

exports.stats = false ;



exports.compileCPPWithInput = function ( envData , code , input , file ,  fn ) 
{
		var filename = file
	path = './temp/';

	fs.writeFile( path  +  filename +'.cpp' , code  , function(err ){			
		if(exports.stats)
		{
			if(err)
			console.log('ERROR: '.red + err);
		    else
		    console.log('INFO: '.green + filename +'.cpp created');	
		}
		if(!err)
		{

			fs.writeFile(path + filename + 'input.txt' , input , function(err){
				if(exports.stats)
				{
					if(err)
					console.log('ERROR: '.red + err);
				    else
				    console.log('INFO: '.green + filename +'input.txt created');	
				}
				if(!err)
				{
					/*    compilation    */
					var command = 'g++ -o '+path + filename+' '+ path + filename +'.cpp' ;
					exec( command , function ( error , stdout , stderr )
					{
						if(error)
						{
							if(error.toString().indexOf('Error: stdout maxBuffer exceeded.') != -1)
							{
								var out = { error : 'Error: stdout maxBuffer exceeded. You might have initialized an infinite loop.' };
								fn(out);								
							}
							else
							{
								if(exports.stats)
								{
									console.log('INFO: '.green + filename + '.cpp contained an error while executing');
								}
								var out = { error : stderr };
								fn(out);								
							}													
						}
						else
						{
							if(exports.stats)
							{
								process1.chdir("temp")
								command = filename+' < '+filename+'input.txt'
								console.log('INFO: '.green + filename + '.cpp successfully executed !');
								exec(command,function(error1,stdout1,stderr1){
									if(error1)
									{
										console.log("error"+error1 + "\n")
									}
									else
									{
										var out = { output : stdout1 };
										console.log("out\n"+stdout1 + "\n")
										fn(out);		
									}
									process1.chdir("../")
								})
							}
							//var out = { output : stdout};
							//fn(out);
						}
				    });	

				   	
				}
			});
		}
	});

} //end of compileCPPWithInput
