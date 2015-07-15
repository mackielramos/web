// dom manipulation
function s(data, name){
	localStorage[name] = JSON.stringify(data);
}
function p(name){
	if(localStorage.getItem(name) !== null){
		if(localStorage[name] == 'undefined'){
			return false;
		}
		return JSON.parse(localStorage[name]);
	}
}
function whatvariable(tempvar, str){
	pause = 1;
	if(str == ">"){
		pause = 0;
		$('#temp').html('');
		insertdiv(tempvar);
		insert.find('input').focus();
		variable = '';
	}if(str == "$"){
		$('#temp').html('');
		blink.addClass("hide");
		pause = 0;
		variable = '';
	}
	return pause;
}
function typing(str, callback){
	for (var i = 0, len = str.length; i < len; i++){
		setTimeout(function(i){
		  	if(str[i] == "<" || str[i] == "$"){
		  		pause = 1;
		  	}else if(str[i] == '#'){
		  		insert.html(insert.html().trim().slice(0,-1));
		  		return;
		  	}
		  	if(pause){
		  		variable = variable + str[i];
		  		$('#temp').append(str[i]); 
		  		pause = whatvariable(variable, str[i]);
		  		return;
		  	}
		  	insertdiv(str[i]);
		  	// console.log(i)
		  	if((i+1) == str.length){
				callback();
			}
		}, i * 10, i);
	}
}
function insertdiv(str){
	insert.append(str);
}
function clear(){
	insert.html('');
}
function insertinput(type, placeholder){
	placeholder = placeholder || '';
	blink.addClass('hide');
	insertdiv('<input type=text id='+type+' placeholder="'+placeholder+'">');
	insert.find('input').focus();
}
function creation(){
	clear();
	str2 = "<br>I kinda like front end develoment cause you can do this";
	typing(str2, function(){
		clear();
		$('#insert').attr('style','');
		$('body').attr('style','');
		str3 = 'body { height: 20% }';
		typing(str3, function(){
			$('#typing').attr('class','h20');
			creationdiv.removeClass('hide').css('background-color','black');
			str4 = 'lets start with body <br> body { background: white }';
			typing(str4, function(){
				creationdiv.addClass('blinkwhite');
				setTimeout(function(){
					creationdiv.removeClass('blinkwhite');
					creationdiv.addClass('bg-white');
				}, 10);
			})
		})
	});
}
function changecolor(val){
	$('body, a').css('color',val);
	$("<style type='text/css'> input{ color:"+val+";} </style>").appendTo("head");
	s(val, 'universalcolor');
}
function IsValidImageUrl(url) {
	$("<img>", {
	    src: url,
		error: function() { console.log('error'); },
		load: function() {
			$('.hero').css('background', 'url('+url+') no-repeat scroll center center / cover  rgba(0, 0, 0, 0)');
			str = "Cool! This is amazing, right?"
			typing(str, function(){
				insertinput('herook');
			})
		}
	});
}

// handle answer
function done(){
	clear();
	$.get( server+'/bye', function( data ) {
		str = 'Thanks, '+p('name')+'.'+data.msg
		typing(str, function(){
			clear();
			$('.parent-center').addClass('hide');
		});
	});
}
function herobackground(status){
	clear();
	if(status == 1){
		str = "Okay, I just need a link of an image from the web.";
		typing(str, function(){
			insertinput('herobackground');
		});
	}else if(status == 2){
		// str = "Okay, I just need a link of an image from the web.";
		// typing(str, function(){
		// 	insertinput('herobackground');
		// });
	}else if(status == 3){
		str = "Almost done! I think it needs a bit of a kick, you know what I mean?. I'd like to put an image header under the welcome message, that would seperate me from the other web geeks out there. Right?";
		typing(str, function(){
			insertinput('herook');
		});
	}
}
function welcome(status){
	clear();
	if(status == 1){
		str = "Okay, what would you like to change it to?";
		typing(str, function(){
			blink.addClass('hide');
			insertdiv('<textarea id="welcome"></textarea>');
			insert.find('textarea').focus();
		});
	}
}
function reveal(){
	clear();
	$('.to').removeClass('hide');
	$('.parent-center,#typing').removeClass('h100').addClass('h50');
	$('.parent-center').addClass('modal');
	$('.parent-center').removeClass('fs5').addClass('fs7');
	$('.transform').css('transform','none');
	$('#insert').css('color', '#000');
	$("<style type='text/css'> input{ color:#000;} </style>").appendTo("head");
	str = "It's almost done, I have three sections: About, Portfolio, and Contact.<br>Did you see my welcome message? It's awesome, but I think we can improve it right?";
	typing(str, function(){
		insertinput('welcomeok');
	});
}
function makemodal(){
	clear();
	str = "Now, I'm going to create menu links and sections to my portfolio, while I'm doing that would you like to hear a knock knock joke?";
	typing(str, function(){
		insertinput('knockok')
	});
}
function knockknock(){
	clear();
	$.get( server+'/knockknock', function( data ) {
		s(data,'knockknock');
		str = 'Knock! Knock!';
		typing(str, function(){
			insertinput('knock1');
		})
	});
}
function insertbackground(status){
	clear();
	if(status == 1){
		str = "How about the background. What color will match "+p('universalcolor')+"?";
	}else if(status == 2){
		str = " Hmmmmm. Okay Let's try something else.";
	}else if(status == 3){
		str = " Nope, It didn't work. What's your next favorite color?";
	}
	typing(str, function(){
		insertinput('background');
	});
}
function insertcolor(status){
	clear();
	if(status == 1){
		str = "Next thing that I need to decide is the font color. What color would you want to use?";
	}else if(status == 2){
		str = " Hmmmmm. Okay, let's try something else.";
	}else if(status == 3){
		str = " Nope, It didn't work. What's the next color?";
	}
	typing(str, function(){
		insertinput('color');
	});
}
function insertfont(status){
	if(status == 1){
		str = " I'm thinking about changing the font style, I like Comic Sans. What font would look great?";
	}else if(status == 2){
		clear();
		str = "Ok. What font is better than the last one?";
	}else if(status == 3){
		str = " It didn't work, my coding skills are not that good enough. I really like Comic Sans. What font would look great?";
	}
	typing(str, function(){
		insertinput('font');
	});
}
function stuckanswer(status){
	if(status == 0){
		creation();
	}else if(status == 1){
		clear();
		str = "Thanks! By the way, my name is Mackiel. What's yours?";
		typing(str, function(){
			insertinput('name');
		});
	}
}
function fontanswer(status,val){
	if(status){
		$('body').css('font-family',val);
		universalfont = val;
		str2 = " Awesome! It worked. Do you also think it's awesome?";
		typing(str2, function(){
			insertinput('fontok');
		});
	}
}
function fontcoloranswer(status, val){
	if(status){
		str2 = " Perfect! Right?";
		universalcolor = val;
		typing(str2, function(){
			insertinput('fontcolorok');
		});
	}
}

// ajax call
function yesorno(val,callback){
	val = val.replace(/[^a-zA-Z ]/g, '').toLowerCase();
	$.post( server+'/answer', {answer:val})
	.done(function(data){
		return callback(data.status);
	});
}
function whatfont(val, callback){
	$.ajax({
		type: 'HEAD',
		url: 'http://fonts.googleapis.com/css?family='+val,
	success: function() {
		return callback(1);
	},
	error: function() {
		return callback(0);
	}
	});
}