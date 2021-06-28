// export function header() {
	$(document).ready(function(){
		$('.burger').on('click', function(){
			$(this).toggleClass('active');
			temp = $('.header-navbar-burger').css('display');
			$('.header-navbar-burger').toggleClass('active');
			if (temp == 'none')
			{
			  $('.header-navbar-burger').css('display','flex');
			  $('.banner').css('z-index','0');
			  $('.mobile-back').css('display','block');
			}
			else{
			  $('.header-navbar-burger').css('display','none');
			  $('.banner').css('z-index','1');
			  $('.mobile-back').css('display','none');
			}
		})                  
	});
	
	// if ($(window).width() >= 1200) {
		// 	if ($("#parallax-coin").length){
			// 	  var scene2 = $('#parallax-coin').get(0);
	// 	  var parallaxInstance1 = new Parallax(scene2);
	// 	} else {console.log('#parallax-coin not found on this page');}
	//   } else{}
	
	
	
	window.onload = function (){
		var scene = document.getElementById('parallax-coin');
		var parallaxInstance = new Parallax(scene);
	}
		// }
