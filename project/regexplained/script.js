$(function(){
	var regex='';
	var result=null;
	$('#sourceText').css('width',$('#sourceText')[0].value.length*40+'px')
	$('#patternText').css('width',$('#patternText')[0].value.length*40+'px')
	$('#sourceText').bind('keypress',function(){
		setSouLength();
	})
	$('#patternText').bind('keypress',function(){
		regex=buildRegex();
		result=$('#sourceText')[0].value.match(regex);
		if(result==null || result.length==0){
			console.log('no way');
		}else{
			console.log(result[0]);	
		}
		setPatLength();
		
	})

	function buildRegex(){
		return new RegExp(document.getElementById('patternText').value,'g')
	}
	function setPatLength(){
		$('#patternText').css('width',$('#patternText')[0].value.length*40+'px');
		$('#patternText').css('width')=='0px' && ($('#patternText').css('width','15px'));
	}
	function setSouLength(){
		$('#sourceText').css('width',$('#sourceText')[0].value.length*40+'px')
		$('#sourceText').css('width')=='0px' && ($('#sourceText').css('width','15px'));
	}
})

function onMatch() {
	if (!isValidFields())
	return false;
	document.getElementById("textMatchResult").value = "";
	var regex = buildRegex();
	var result = document.getElementById("textSour").value.match(regex);
	if (null==result || 0==result.length) {
		document.getElementById("textMatchResult").value = "（没有匹配）";
		return false;
	}
	if (document.getElementById("optionGlobal").checked) {
		var strResult = "共找到 " + result.length + " 处匹配：\r\n";
		for (var i=0;i < result.length;++i)strResult = strResult + result[i] + "\r\n";
		document.getElementById("textMatchResult").value = strResult;
	}
	else {
		document.getElementById("textMatchResult").value= "匹配位置：" + regex.lastIndex + "\r\n匹配结果：" + result[0];
	}
	return true;
}
