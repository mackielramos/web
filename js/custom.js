$(document).ready(function () {
  font.setup();
});

$(document).ajaxStart(function(){

});

$(document).ajaxComplete(function(){
	
});

var server = 'https://macram.herokuapp.com'
	,insert = $("#insert")
	,blink = $("#blink")
	,creationdiv = $("#creation")
	,variable = ''
	,pause = 0
	,universalfont = 'Courier New'
	,universalcolor = 'rgb(0, 0, 0)';

$('body').on('keypress','input, textarea',function(e){
	if(e.keyCode === 13 || e.which === 13){
		var id = $(this).attr('id');
		var val = $(this).val();
		if(id == 'name'){
			newval = val.replace(/[^a-zA-Z ]/g, "").toLowerCase();
			s(val,'name')
			$.post( server+'/name', {name:newval})
			.done(function(data){
				clear();
	    		blink.removeClass("hide");
	    		var str2 = val+"? "+data.msg+" I'm a Web Developer############ \
	    									Front End Develo##############\
	    									UX/UI Desig##########\
	    									Technical Support################\
	    									Graphics Desig#################\
	    									Ugh! Well, I'm awesome with the web.\
	    									How about you, what do you do?";
	    		typing(str2, function(){
	    			insertinput('job');
	    		});
			});
		}else if(id == 'stuck'){
			yesorno(val, function(status){
				stuckanswer(status);
			});
		}else if(id == 'fontok'){
			yesorno(val, function(status){
				if(status){
					insertcolor(1)
				}else{
					insertfont(2);
				}
			});
		}else if(id == 'fontcolorok'){
			yesorno(val, function(status){
				if(status){
					insertbackground(1)
				}else{
					insertcolor(2);
				}
			});
		}else if(id == 'backok'){
			yesorno(val, function(status){
				if(status){
					makemodal();
				}else{
					insertbackground(2);
				}
			});
		}else if(id == 'knockok'){
			yesorno(val, function(status){
				if(status){
					knockknock(1);
				}else{
					knockknock(2);
				}
			});
		}else if(id == 'seeok'){
			yesorno(val, function(status){
				if(status){
					reveal();
				}else{
					// i still dont know
				}
			});
		}else if(id == 'welcomeok'){
			yesorno(val, function(status){
				if(status){
					welcome(1);
				}else{
					// doesnt care about the welcome message
				}
			});
		}else if(id == 'welcomeok2'){
			yesorno(val, function(status){
				if(status){
					herobackground(3);
				}else{
					
				}
			});
		}else if(id == 'herook'){
			yesorno(val, function(status){
				if(status){
					herobackground(1);
				}else{
					
				}
			});
		}else if(id == 'herook2'){
			yesorno(val, function(status){
				if(status){
					done();
				}else{
					herobackground(1);
				}
			});
		}else if(id == 'color'){
			clear();
			rgb = 'rgb(0, 0, 0)';
			val = val.replace(/\s/g, '').toLowerCase().replace('#','');
			str = 'Ok. Lets try it out.';
			typing(str, function(){
				insert.html('<span style="color:'+universalcolor+'">'+insert.html()+'</span>');
				changecolor(val);
				if(insert.css('color') == rgb){
					changecolor('#'+val);
					if(insert.css('color') == rgb){
						if(val !== 'black' || val !== '000' || val !== '000000'){
							return insertcolor(3);
						}
					}
				}
				return fontcoloranswer(1);
			});
		}else if(id == 'font'){
			clear();
			str = "Ok. Let's try that one.";
			typing(str, function(){
				insert.html('<font face="'+universalfont+'">'+insert.html()+'</font>');
				if(font.isInstalled(val)){
					fontanswer(1, val);
				}else{
					whatfont(val, function(status){
						if(status){
							$('head').append('<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family='+val+'">')
							fontanswer(1, val);
						}else{
							insertfont(3);
						}
					});
				}
			});
		}else if(id == 'background'){
			clear();
			val = val.replace(/\s/g, '').toLowerCase().replace('#','');
			str = "Nice, I'll try that one.";
			typing(str, function(){
				$('body, .section').css('background-color',val);
				str2 = " Looks great, right?";
				typing(str2, function(){
					insertinput('backok');
				});
			});
		}else if(id == 'job'){
			clear();
			str = "Really? That sounds amazing.";
			typing(str, function(){
				insertfont(1);
			});
		}else if(id == 'knock1'){
			str = p('knockknock').knock;
			typing(str, function(){
				insertinput('knock2');
			});
		}else if(id == 'knock2'){
			str = p('knockknock').joke;
			typing(str, function(){
				str2 = "<br><br>I'm done inserting menu links and sections, do you want to see it?"
				typing(str2, function(){
					insertinput('seeok');
				});
			});
		}else if(id == 'welcome'){
			clear();
			s(val, 'welcome');
			$('.welcome').html(val);
			str = 'Now, it looks great. Right?'
			typing(str, function(){
				insertinput('welcomeok2');
			});
		}else if(id == 'herobackground'){
			clear();
			IsValidImageUrl(val);
		}
		$(this).prop('disabled', true);
    }
});

$('body').on('click','.scroll',function(){
	var id = $(this).attr('id');
    $('html, body').animate({
        scrollTop: $(id).offset().top
    }, 1000);
});

$('body').on('click','#typing',function(){
	var input = $(this).find('input:last');
	if(input.length){
		input.focus();
	}
});

var str1 = "Hi! I'm in the middle of creating my portfolio and I don't know what to do. I'm stuck! Can you help me?";
typing(str1, function(){
	insertinput('stuck', 'Type your answer.');
});