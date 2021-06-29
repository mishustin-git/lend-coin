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
	window.onload = function (){
		var scene = document.getElementById('parallax-coin');
		var parallaxInstance = new Parallax(scene);
	}
		// }
