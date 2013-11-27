//L.require(mod or url,callBack);

(function(ex){
//	var conf = {
//		'lantern': {'js':'/skin/js/lib/lantern.js'},
//		'juicer'	: {'js':'/skin/js/lib/juicer.js'},
//		'dialog'	: {'js':'/skin/js/lib/dialog.js'},
//		'lofox'	: {'js':'/skin/js/lib/lofox.js'},
//		'codeArea'	: {'js':'/skin/js/lib/codeArea.js'}
//	};
	var conf = null;
	function loadJs(url,fn){
		console.log('require','load JS file [' + url + ']');
		$.get(url,function(){
			fn&&fn();
		});
	}
	function loadCSS(url,callback){
		console.log('require','load CSS file [' + url + ']');
		if($('link[href="' + url + '"]').length == 0){
			$('head').append('<link href="' + url + '" type="text/css" rel="stylesheet">');
			callback&&callback();
		}else{
			console.log('require','[' + url + '] has been loaded, needn\'t to load again £¡');
			callback&&callback();
		}
	}
	var start = function(str,callback){
		str = str || '';
		str = str.split(/\?/)[0]||'';
		var str_spilt = str.split(/\./);
		var callback = callback||function(){};

		if(str_spilt.length == 1){
			//repuire from config
			var modName = str;
			var module = conf[modName];
			if(!module){
				console.log('require','could not find module please check mod spell £¡');
				return
			}
			switch (module['load']){
				case 'done':
					console.log('require','[' + modName + '] has been loaded, needn\'t to load again £¡');
					callback();
				break
				case 'loading':
					var wait = setInterval(function(){
						if(conf[modName]['load'] = 'done'){
							clearInterval(wait);
							callback();
						}
					},100);
				break
				default :
					console.log('require:','loading start !');
					var url = module['js'];
					conf[modName]['load'] = 'loading';
					loadJs(url,function(){
						conf[modName]['load'] = 'done';
						callback()
					});
			}
		}else{
			//repuire from url
			var url = str;
			var ext = str_spilt[1];
			if(ext == 'css'){
				loadCSS(url,callback);
			}else if(ext == 'js'){
				loadJs(url,callback);
			}else{
				console.log('require','could not support this type module £¡');
			}
		}
	};
	var require = function(str,callback){
		console.log('require:','start with [' + str + ']');
		var str = str||'',
			callback = callback || function(){},
			mod_list = str.split(/\,/),
			len = mod_list.length;
		
		if(len == 1){
			start(mod_list[0],callback);
		}else{
			var complete_num = 0;
			for(var i = 0;i<len;i++){
				start(mod_list[i],function(){
					complete_num++;
					if(complete_num == len){
						callback();
					}
				});
			}
		}
	}
	ex.require = require;
}(L));