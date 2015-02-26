 //Work page isotope plugin

var isotopeMyStuff = function() {
        
      var $container = $('#container');

      $container.isotope({
        itemSelector : '.element'
      });
      

      var $optionSets = $('#options .option-set'),
          $optionLinks = $optionSets.find('a');

      $optionLinks.click(function(){
        var $this = $(this);
        // don't proceed if already selected
        if ( $this.hasClass('selected') ) {
          return false;
        }
        var $optionSet = $this.parents('.option-set');
        $optionSet.find('.selected').removeClass('selected');
        $this.addClass('selected');
  
        // make option object dynamically, i.e. { filter: '.my-filter-class' }
        var options = {},
            key = $optionSet.attr('data-option-key'),
            value = $this.attr('data-option-value');
        // parse 'false' as false boolean
        value = value === 'false' ? false : value;
        options[ key ] = value;
        if ( key === 'layoutMode' && typeof changeLayoutMode === 'function' ) {
          // changes in layout modes need extra logic
          changeLayoutMode( $this, options )
        } else {
          // otherwise, apply new options
          $container.isotope( options );
        }
        
        return false;
      });
 };


 //smartAjax page fancy loads

    var refreshNav = function() {

	var str=location.href.toLowerCase();

 	$('#nav li a').stop().each(function() {
 		if (str.indexOf(this.href.toLowerCase()) > -1) {
			$("#nav li.selected").removeClass("selected");
                        	$(this).parent().addClass("selected"); 
                      }
		}); 
    
     $('#mobileNav li a').stop().each(function() {
 		if (str.indexOf(this.href.toLowerCase()) > -1) {
			$("#mobileNav li.selected").removeClass("selected");
                        	$(this).parent().addClass("selected"); 
                      }
		}); 




     };


		SmartAjax_load('js/smartajax/', function(){
			SmartAjax.isDebug = false;
			SmartAjax.setOptions({
				cache: false,
				reload: false,
				containers:
				[
					{selector: '#ajaxLoad'}
				],
				
				before: function()
				{


					if ($("body").hasClass("workPage") && $('#filters li').css("left") === '0px'){
						$('#filters li').each(function(i) {	 	
							 $(this).delay(i*20).animate({
								left: '-40px',
								opacity: '0'
							}, 200, function() {
							  $('#ajax-loader').stop().animate({ opacity: '1', bottom: '0'}, 400, "easeOutBack");
							  SmartAjax.proceed();				
							  navMoveUp();
							});
						});
					 							
						} else {
								$('#ajax-loader').stop().animate({ opacity: '1', bottom: '0'}, 400, "easeOutBack");
								SmartAjax.proceed();
					}

				

				},
				success: function()
				{
					     if($("body").hasClass('homePage')); {
					     	$("#nav li.selected").removeClass("selected");
					     	$("#mobileNav li.selected").removeClass("selected");

					     };

					$('#ajaxLoad').animate({
					    opacity: 0,
					   }, 500, function() {
					    // Animation complete.
					    SmartAjax.proceed();

						preloadIsotope();
					    refreshNav();
					    filterNavMove();
					    siteAnimationsGeneral();
					    validateBlogPost();
					    validateContact();
				    

						$('body,html').animate({
						  scrollTop: 0
						}, 600, "swing");
    					
    					

    				});
					
				},
				done: function()
				{
					loadSocial();
					$('#ajaxLoad').animate({
					    opacity: 1,
					   }, 800, function() {
					    // Animation complete.
					    $('#ajax-loader').stop().animate({ bottom: '-67', opacity: '0'}, 400, "easeOutBack");
					  });
				}
				
			});
			
			SmartAjax.bind('.smartAjaxNav a, .isotope a, #postNav a, .smartAjaxLink, .blogNav a, .errorPage404 li a');
			//SmartAjax.bindForms('form');
		}, true);


// check what page we are on. Relies on testing for class of body tag
var filterNavMove = function() {

			if ($("body").hasClass("workPage")) {

					navMoveDown();

					$('#filters li').css({
						'opacity' : 0,
						'left' : -40
					});


			 		$('#filters li').each(function(i) {	 	
						 $(this).delay(i*200).animate({
							left: '0px',
							opacity: '1'
						})
					});

				 } else if ($("body").hasClass("workSinglePage")){
				 	$('.workLink').removeClass('selected')

			}

};


//ANIMATING TOP-LEVEL MENU - what to do if we are on workPage
var navMoveDown = function() {
	$('#navMove').animate({
		marginTop: '10em'

	})
};

//ANIMATING TOP-LEVEL MENU - what to do if we are NOT of work page
var navMoveUp = function() {
	$('#navMove').animate({
		marginTop: '0px'
	})
};


// Animated logo on hover
var animateLogo

 $(document).ready(function(){

        $('#logo').hover(function () {
        	frame = 1;
            animateLogo = setInterval('next()',100);
            $('#aniLogo').stop(true, true).fadeIn(500);
            }, 
         function () {
           	var numRand = Math.floor(Math.random()*16)*205
            clearInterval(animateLogo);
            $('#aniLogo').css('backgroundPosition', numRand +'px 0px').stop(true, true).fadeOut(800);
           }
        );

	$('.homeLink').click(function() {
	$('#linkWrap li').removeClass('selected');
	});

});

function next(){
        var left = 205 * frame;
        var top = 0;

		$('#aniLogo').css('backgroundPosition','-'+left+'px -'+top+'px');
		
		frame++;
}





  $(document).ready(function(){

        //isotope check resize for a re-fire - otherwise thumbnals are screwwie on manual resize by user
		$(window).resize(function() {
			if ($("body").hasClass("workPage")){
			      isotopeMyStuff();
			      console.log("isotope fired");
			}
		});

		//call for work post pages to load click event on social link, incase person lands directly on that page without going through ajax loop
		loadSocial();


  }); //close Doc Ready


var preloadIsotope = function() {

	if ($("body").hasClass("workPage")) {


		$('#container').css({'opacity' : '0'});

	    var $images = $('#container img');
	    var count = $images.length;
	    console.log('initial images count : ', count);
	    var decrement = function() {
	        if (--count==0) {
	            console.log('All images loaded');
	            // do something   
	            isotopeMyStuff();   
	            
	            $('#container').delay(500).animate({
					opacity: '1'
				})          
	        }
	    };

	    $images.each(function(){
	       if (this.complete) {
	           decrement();
	       } else {
	           this.onload = function(){
	                decrement();
	           };
	       }
	    });
	}

};

var siteAnimationsGeneral = function() {

//Work Page thumbnail hover
	$('.element').hover(function () {
		$(this).find('h2').stop().animate({ right: '0',	opacity: '1' }, 100, 'easeOutQuint');
	        }, function(){
	    $(this).find('h2').stop().animate({ right: '-200',	opacity: '0' }, 100, 'easeInQuint');
	        });

		$(document).keyup(function(e) {
		// esc key
			if (e.keyCode == 27) {	
			$('#lightbox').stop().fadeOut(50,0);
			$('#hero').stop().removeClass('activeLightboxImg');
		}   
		});


};



		// click action for social links reveal box
		var loadSocial = function() {
				
					//set initial state to hidden and 80 paddingTop (original is 20px)
					$('div#socialBoxes').css({'marginTop':'-150px','opacity':'0'});

					//set on hover of div btnsocial to animate the box below
					$('div#btnSocial').click(function(){
						if ($('#socialBoxes').css('marginTop') === '-150px') {
						    $('#btnSocial').addClass('socialSelected');
							$('#socialBoxes').stop().animate({ marginTop: '-20', opacity: '1' }, 400, 'easeOutBack');
							Socialite.load($(this)[1]);
						}else {
							$('#btnSocial').removeClass('socialSelected');
						    $('#socialBoxes').stop().animate({ marginTop: '-150', opacity: '0' }, 400, 'easeOutBack');
						}
			        });
		};


var homeTakeover = function() {

	$('.hpClose').click(function(){ 
		$('#oldSite_lightbox').fadeOut(0);
	});

}


 