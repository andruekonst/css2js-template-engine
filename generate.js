function generateDom(text_template){
	var stack = []; // Â ñòåêå áóäóò õðàíèòüñÿ îáúåêòû {type, value}
	var collect = "";
	var type = "";
	var value = "";
	var blocks = [];
	var text = "" + text_template;
	var code = "";
	var count = 0;
	var jsCode = "var elems = [];"; // var jsCode = "";
	var quote = "";
	for(var i = 0; i < text.length; i++){
		if((text[i] != "{") && (text[i] != "}") && (text[i] != ";") && (text[i] != ":") || ((quote != "") && ((text[i] == "{") || (text[i] == "}")))){
			collect += text[i];
		}else if(text[i] == "{"){
			stack.push({type: "start", value: collect});
			blocks.push(collect);
			blockId = "";
			blockClass = "";
			blockEqual = "";
			count += 1;
			try{
				if(collect.search("#" + collect.split(/[#.=]/)[1]) != -1){
					blockId = collect.split(/[#.=]/)[1];
				}
			}catch(e){
				console.log(e);
			}
			try{
				if(collect.search("#" + collect.split(/[#.=]/)[2]) != -1){
					blockId = collect.split(/[#.=]/)[2];
				}
			}catch(e){
				console.log(e);
			}
			try{
				if(collect.search("\\." + collect.split(/[#.=]/)[1]) != -1){
					blockClass = collect.split(/[#.=]/)[1];
				}
			}catch(e){
				console.log(e);
			}
			try{
				if(collect.search("\\." + collect.split(/[#.=]/)[2]) != -1){
					blockClass = collect.split(/[#.=]/)[2];
				}
			}catch(e){
				console.log(e);
			}
			try{
				if(collect.search("=" + collect.split(/[#.=]/)[1]) != -1){
					blockEqual = collect.split(/[#.=]/)[1];
				}
			}catch(e){
				console.log(e);
			}
			try{
				if(collect.search("=" + collect.split(/[#.=]/)[2]) != -1){
					blockEqual = collect.split(/[#.=]/)[2];
				}
			}catch(e){
				console.log(e);
			}
			if(blockId == ""){
				blockId = "" + count;
			}
			var __tag = collect.split(/[#.=]/)[0].split(/\s/).join("");
			if((__tag == "div") | (__tag == "span") | (__tag == "ul") | (__tag == "input") | (__tag == "a")){
				code += '<' + __tag + ' id="' + blockId + '"' + ' class="' + blockClass + '"' + '>';
			}
			/* else if(__tag == "a"){
				if(blockEqual == ""){
					blockEqual = "#" + collect.split(/[#.=]/)[2].split(/\s/).join("");
				}
				code += '<' + __tag + ' id="' + blockId + '"' + ' href="' + blockEqual + '"' + ' class="' + blockClass + '"' + '>';
			} */
			else{
				code += '<' + __tag + '>';
			}
			// jsCode += 'var elem = document.getElementById("' + blockId + '");';
			jsCode += 'elems.push(document.getElementById("' + blockId + '"));';
			collect = "";
		}else if(text[i] == "}"){
			stack.push({type: "end", value: "}"});
			code += "</" + blocks[blocks.length - 1].split(/[#.=]/)[0].split(/\s/).join("") + ">";
			// blocks.splice(1, blocks.length);
			blocks.length -= 1;
		}else if(text[i] == ";"){
			if(quote == ""){
				value = collect;
				if(value[0] == " "){
					// value = value.split(/\s/).join("");
					value = value.substr(1);
				}
				if(((value[0] == '"') & (value[value.length - 1] == '"')) | ((value[0] == "'") & (value[value.length - 1] == "'"))){
					value = value.substr(1);
					value = value.substring(0, value.length - 1);
				}
				value = value.replace(/\\n/, "\n");
				value = value.replace(/\\br/, "\n<br />");
				stack.push({type: type, value: value});
				stack.push({type: "end", value: ";"});
				if(type.split(/\s/).join("") == "content"){
					// code += value.split(/[']/).split(/["]/).join("");
					code += value;
				}else{
					// jsCode += 'elem.' + type.split(/\s/).join("") + ' = "' + value + '";';
					// jsCode += 'elems[elems.length - 1].' + type.split(/\s/).join("") + ' = "' + value + '";';
					jsCode += 'if(typeof(elems[elems.length - 1].' + type.split(/\s/).join("") + ') != "undefined"){ elems[elems.length - 1].' + type.split(/\s/).join("") + ' = "' + value + '";}else{ elems[elems.length - 1].style.' + type.split(/\s/).join("") + ' = "' + value + '";}';
				}
				type = "";
				value = "";
				collect = "";
			}else{
				collect += ";";
			}
		}else if(text[i] == ":"){
			if(quote == ""){
				type = collect;
				collect = "";
			}else{
				collect += ":";
			}
		}
		if((text[i] == "'") || (text[i] == '"')){
			if(quote == ""){
				quote = text[i];
			}else if(quote == "'"){
				if(text[i] == "'"){
					quote = "";
				}else{
					quote += '"';
				}
			}else if(quote == '"'){
				if(text[i] == '"'){
					quote = "";
				}else{
					quote += "'";
				}			
			}else if(quote == "'" + '"'){
				if(text[i] == '"'){
					quote = "'";
				}
			}else if(quote == '"' + "'"){
				if(text[i] == "'"){
					quote = '"';
				}			
			}
		}
	}
	return {code: code, jsCode: jsCode, stack: stack};
}