$(function(){
	var ch=41;
	var regex='';
	var result=null;
	$('#sourceText').css('width',$('#sourceText').val().length*ch+'px')
	$('#patternText').css('width',$('#patternText').val().length*ch+'px')
	doMatch();
	setInterval(function(){
		$('#sourceText').css('width',$('#sourceText').val().length*ch+'px');
		$('#patternText').css('width',$('#patternText').val().length*ch+'px');
		$('#sourceText').css('width')=='0px' && $('#sourceText').css('width','10px')
		$('#patternText').css('width')=='0px' && $('#patternText').css('width','10px')	
	},100)	
	
	$('#patternText').bind('keyup',function(){
		doMatch();
	})
	$('#sourceText').bind('keyup',function(){
		doMatch();
	})
	function doMatch(){
		regex=buildRegex();
		result=$('#sourceText').val().match(regex);
		if(result==null || result.length==0){
			loseMatch();
		}else{
			getMatch();
		}
	}
	function getMatch(){
		var ad=$('#sourceText').val().indexOf(result[0]);
		$('#match').animate({left : ad*ch+'px', width : result[0].length*ch+'px'},100)
		$('#source').css('color' , '#BDE151');
		$('#sourceText').css('color' , '#BDE151');
		$('.cross').css('display', 'none')
	}
	function loseMatch(){
		$('#match').css({'width' : '0' , 'left' : '0'});
		$('#source').css('color' , '#fbb');
		$('#sourceText').css('color' , '#fbb');
		$('.cross').css('display', 'block')
	}
	function buildRegex(){
		return new RegExp($('#patternText').val(),'g')
	}

	for(var i=0;i<$('#tool a').length;i++){
		$('#tool a').eq(i).click(function(){
			$('#patternText').attr('value',$(this).attr('title'));
			doMatch();
		})
	}
	

})

