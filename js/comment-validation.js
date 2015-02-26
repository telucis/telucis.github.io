var validateBlogPost = function() {	

	$('#submit').click(function (e){  

		var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var email = document.getElementById('email');
		var author = document.getElementById('author');
		var comment = document.getElementById('comment');

				if (!filter.test(email.value)) {
					e.preventDefault();
					$('#email').addClass('error');
					$('#email').removeClass('success');
				} else {
					$('#email').removeClass('error');
					$('#email').addClass('success');
				}


				if (author.value == "") {
					e.preventDefault();
					$('#author').addClass('error');
					$('#author').removeClass('success');
				} else {
					$('#author').removeClass('error');
					$('#author').addClass('success');
				}	


				if (comment.value == "") {
					e.preventDefault();
					$('#comment').addClass('error');
					$('#comment').removeClass('success');
				} else {
					$('#comment').removeClass('error');
					$('#comment').addClass('success');
				}

				if (	(author.value == "") && (!filter.test(email.value)) && (comment.value == "" )	){
					e.preventDefault();
				} 
				else {
				// button is activated
				}
	});   
};


var validateContact = function() {	

	$('#contactSubmit').click(function (e){  

		var filtera = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		var emaila = document.getElementById('contactEmail');
		var authora = document.getElementById('contactAuthor');
		var commenta = document.getElementById('contactComment');

				if (!filtera.test(emaila.value)) {
					e.preventDefault();
					$('#contactEmail').addClass('error');
					$('#contactEmail').removeClass('success');
				} else {
					$('#contactEmail').removeClass('error');
					$('#contactEmail').addClass('success');
				}


				if (authora.value == "") {
					e.preventDefault();
					$('#contactAuthor').addClass('error');
					$('#contactAuthor').removeClass('success');
				} else {
					$('#contactAuthor').removeClass('error');
					$('#contactAuthor').addClass('success');
				}	


				if (commenta.value == "") {
					e.preventDefault();
					$('#contactComment').addClass('error');
					$('#contactComment').removeClass('success');
				} else {
					$('#contactComment').removeClass('error');
					$('#contactComment').addClass('success');
				}

				if (	(authora.value == "") || (!filtera.test(emaila.value)) || (commenta.value == "" )	){
					e.preventDefault();
					console.log("blah");
				} 
				
				else {
				// button is activated
				//hide the form
					$('#contactForm .contactForm').hide();
				
					//show the loading bar
					$('#contactForm .loader').append($('.bar'));
					$('#contactForm .bar').css({display:'block'});
				
					//send the ajax request
					$.post('http://www.marklawrencedesign.com/mail.php',{name:$('#contactAuthor').val(),
					email:$('#contactEmail').val(),
					message:$('#contactComment').val()},
				
					//return the data
					function(data){
					  //hide the graphic
					  $('#contactForm .bar').css({display:'none'});
					  $('.copy p').css({display:'none'});
					  $('.copy h1').html('Cheers');
					  $('#contactForm .loader').append(data);
					  
					});
					
					//stay on the page
					return false;				
				}
					
	});   
};