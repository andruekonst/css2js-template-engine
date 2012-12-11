function generateDom(text_template){
  var stack = [];
	var collect = "";
	var type = "";
	var value = "";
	var blocks = [];
	var text = "" + text_template;
	var code = "";
	var count = 0;
	var jsCode = "var elems = [];"; // var jsCode = "";
	var htmlProperties = ["href", "width", "height", "type", "value", "name", "onclick"];
	var cssProperties = ["position", "left", "top", "width", "height", "background", "color"];
	var closen = 0;
	var quote = "";
	for(var i = 0; i < text.length; i++){
		if((text[i] != "{") && (text[i] != "}") && (text[i] != ";") && (text[i] != ":") || ((quote != "") && ((text[i] == "{") || (text[i] == "}")))){
			collect += text[i];
		}else if(text[i] == "{"){
			stack.push({type: "start", value: collect});
			if(typeof(blocks[blocks.length - 1]) != "undefined"){
				if(blocks[blocks.length - 1].child == 0){
					code += blocks[blocks.length - 1].cP + ' style="' + blocks[blocks.length - 1].cS + '">';
					code += blocks[blocks.length - 1].cC;
					blocks[blocks.length - 1].cC = "";
					blocks[blocks.length - 1].child = 1;
				}
				closen = blocks.length - 1;
			}
			blocks.push({tag: collect, cS: "", cP: "", cC: "", child: 0});
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
				// code += '<' + __tag + ' id="' + blockId + '"' + ' class="' + blockClass + '"' + '>';
				code += '<' + __tag + ' id="' + blockId + '"' + ' class="' + blockClass + '"';
			}
			/* else if(__tag == "a"){
				if(blockEqual == ""){
					blockEqual = "#" + collect.split(/[#.=]/)[2].split(/\s/).join("");
				}
				code += '<' + __tag + ' id="' + blockId + '"' + ' href="' + blockEqual + '"' + ' class="' + blockClass + '"' + '>';
			} */
			else{
				// code += '<' + __tag + '>';
				code += '<' + __tag;
			}
			// jsCode += 'var elem = document.getElementById("' + blockId + '");';
			// jsCode += 'elems.push(document.getElementById("' + blockId + '"));';
			collect = "";
		}else if(text[i] == "}"){
			stack.push({type: "end", value: "}"});
			/*if(blocks.length - 1 != closen){
				__cP = blocks[blocks.length - 1].cP;
				if(__cP != ""){
					code += __cP;
				}
				__cS = blocks[blocks.length - 1].cS;
				if(__cS != ""){
					code += ' style="' + __cS + '"';
				}
				if((__cP != "") | (__cS != "")){
					code += '>';
				}
			}*/
			if(blocks[blocks.length - 1].child == 0){
				__cP = blocks[blocks.length - 1].cP;
				if(__cP != ""){
					code += __cP;
				}
				__cS = blocks[blocks.length - 1].cS;
				if(__cS != ""){
					code += ' style="' + __cS + '"';
				}
				if((__cP != "") | (__cS != "")){
					code += '>';
				}
			}
			code += blocks[blocks.length - 1].cC;
			code += "</" + blocks[blocks.length - 1].tag.split(/[#.=]/)[0].split(/\s/).join("") + ">";
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
					// code += value;
					blocks[blocks.length - 1].cC += value;
				}else{
					// jsCode += 'elem.' + type.split(/\s/).join("") + ' = "' + value + '";';
					// jsCode += 'elems[elems.length - 1].' + type.split(/\s/).join("") + ' = "' + value + '";';
					// jsCode += 'if(typeof(elems[elems.length - 1].' + type.split(/\s/).join("") + ') != "undefined"){ elems[elems.length - 1].' + type.split(/\s/).join("") + ' = "' + value + '";}else{ elems[elems.length - 1].style.' + type.split(/\s/).join("") + ' = "' + value + '";}';
					if(cssProperties.indexOf(type.split(/\s/).join("")) == -1){
						if(htmlProperties.indexOf(type.split(/\s/).join("")) != -1){
							blocks[blocks.length - 1].cP += type.split(/\s/).join("") + '="' + value + '" ';
							// blocks[blocks.length - 1].cS += " ";
						}
					}else{
						blocks[blocks.length - 1].cS += type.split(/\s/).join("") + ": " + "'" + value + "'; ";
					}
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