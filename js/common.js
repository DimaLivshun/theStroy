$(document).ready(function() {

	//Таймер обратного отсчета
	//Документация: http://keith-wood.name/countdown.html
	//<div class="countdown" date-time="2015-01-07"></div>
	var austDay = new Date($(".countdown").attr("date-time"));
	$(".countdown").countdown({until: austDay, format: 'yowdHMS'});

	//Попап менеджер FancyBox
	//Документация: http://fancybox.net/howto
	//<a class="fancybox"><img src="image.jpg" /></a>
	//<a class="fancybox" data-fancybox-group="group"><img src="image.jpg" /></a>
	$(".fancybox").fancybox();


		





	//Навигация по Landing Page
	//$(".top_mnu") - это верхняя панель со ссылками.
	//Ссылки вида <a href="#contacts">Контакты</a>
	$(".top_mnu").navigation();

	//Добавляет классы дочерним блокам .block для анимации
	//Документация: http://imakewebthings.com/jquery-waypoints/
	$(".block").waypoint(function(direction) {
		if (direction === "down") {
			$(".class").addClass("active");
		} else if (direction === "up") {
			$(".class").removeClass("deactive");
		};
	}, {offset: 100});

	//Каруселька
	//Документация: http://owlgraphic.com/owlcarousel/
	var owl = $(".carousel");
	owl.owlCarousel({
		items : 1,
		responsive : true,
		responsiveRefreshRate : 200,
		itemsCustom : [
        [0, 1],
        [450, 1],
        [600, 1],
        [700, 1],
        [1000, 1],
        [1200, 1],
        [1400, 1],
        [1600, 1]
      ],
	});
	/*owl.on("mousewheel", ".owl-wrapper", function (e) {
		if (e.deltaY > 0) {
			owl.trigger("owl.prev");
		} else {
			owl.trigger("owl.next");
		}
		e.preventDefault();
	});*/
	/*$(".next_button").click(function(){
		owl.trigger("owl.next");
	});
	$(".prev_button").click(function(){
		owl.trigger("owl.prev");
	});*/

	//Кнопка "Наверх"
	//Документация:
	//http://api.jquery.com/scrolltop/
	//http://api.jquery.com/animate/
	$("#top").click(function () {
		$("body, html").animate({
			scrollTop: 0
		}, 800);
		return false;
	});
	
	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		$.ajax({
			type: "GET",
			url: "mail.php",
			data: $("form").serialize()
		}).done(function() {
			alert("Спасибо за заявку!");
			setTimeout(function() {
				$.fancybox.close();
			}, 1000);
		});
		return false;
	});

	//Плавный скролл до блока
	$(".scroll-button").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
 
        //забираем идентификатор блока с атрибута href
        var id  = $(this).attr('href'),
 
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
         
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });
    $(".nav-bar").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
 
        //забираем идентификатор блока с атрибута href
        var id  = $(this).attr('href'),
 
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
         
        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({scrollTop: top}, 1500);
    });

	//popup
    $(function() {
	//Функция проверяет заполнено ли поле с телефоном
	function formValide() {			
		var str = $('#contact_form input[name=tel]').val();
		str = jQuery.trim(str);                
		if(str.length < 5){                
			alert ('Введите телефон');			
			return false;
		}	
		return true;
	}

		//при нажатии на кнопку button нужной формы запускаем функцию обработки данных
		$('#contact_form .button').live('click', function() {
			if (formValide()) {
				//если форма прошла проверку, выводим блок с текстом ожидания
				$('#contact_form').before('<h3 id="contact_form_info">Оформление заявки. Подождите...</h3>');
				$('#contact_form').hide();
				//берем путь php обработчика
				order_url = $('#contact_form').attr('action');			
				//посылаем асинхронный запрос на сервер и передаем все данные формы
				$.post(order_url,{
						name: $('#contact_form input[name=name]').val(),
						tel: $('#contact_form input[name=tel]').val(),
	                    email: $('#contact_form input[name=email]').val(),
	                    message: $('#contact_form textarea[name=message]').val(),
						send: "1"
					}, function(data) {
						//выводим возврашаемый сервером код html вместо содержимого формы
					$('#contact_form').html(data);
					$('#contact_form').show();
					$('#contact_form_info').remove();
				}, "html");			
			}
			return false;
		});
	});

	// =========================================================================  go_order
	$(function() {
		//фкнкция вызова формы обратной связи
		$('a#callback').click(function(){
			//появление окна обратной связи
			$('#popup').fadeIn();
			//расчитываем высоту и ширину всплывающего окна что бы вывести окно прямо по центру экрана
	        q_width = $('#popup').outerWidth()/-2;
	        q_height = $('#popup').outerHeight()/-2;
	        $('#popup').css({
	            'margin-left': q_width,
	            'margin-top': q_height
	        });
			//выводим затемение страницы и делаем полупрозрачным
	        $('.all-page-wrap').append('<div id="fade"></div>');
	        $('#fade').css({'filter' : 'alpha(opacity=40)'}).fadeIn();
			return false;
		});
		
		//функция закрытия окна
		$('#popup_close, #fade').live('click', function() {
			$('#fade').fadeOut(function() {
				$('#fade').remove();
	            $('#popup_close').remove();
				$('#popup').fadeOut();
			});
		});

	});

    //Увеличение SVG по скроллу на блок
    /*function come(elem) {
	  	var docViewTop = $(window).scrollTop(),
		    docViewBottom = docViewTop + $(window).height(),
		    elemTop = $(elem).offset().top,
		    elemBottom = elemTop + $(elem).height();

			return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
	if(come('#benefits')){
		$('.icon1')css.('width','17%').delay(500);
		$('.icon2')css.('width','17%').delay(1000);
		$('.icon3')css.('width','17%').delay(1500);
		$('.icon4')css.('width','17%').delay(2000);
		$('.icon5')css.('width','17%').delay(2500);
		$('.icon6')css.('width','17%').delay(3000);
		$('.icon7')css.('width','17%').delay(3500);
	}*/

/*	var iconTransform = function(){
		for(var j = 1;j<10;j++){
			for(var i = 1;i<2;i++){
				$( ".icon1").animate({
			        width: "18%",
			      }, 1000 );
				$( ".icon2").animate({
			        width: "18%",
			      }, 1000 );
				$( ".icon3").animate({
			        width: "18%",
			      }, 1000 );
				$( ".icon4").animate({
			        width: "18%",
			      }, 1000 );
				$( ".icon5").animate({
			        width: "18%",
			      }, 1000 );
				$( ".icon6").animate({
			        width: "18%",
			      }, 1000 );
				$( ".icon7").animate({
			        width: "18%",
			      }, 1000 );
			}
			for(var i = 1;i<8;i++){
				$( ".icon1").animate({
			        width: "17%",
			      }, 1000 );
				$( ".icon2").animate({
			        width: "17%",
			      }, 1000 );
				$( ".icon3").animate({
			        width: "17%",
			      }, 1000 );
				$( ".icon4").animate({
			        width: "17%",
			      }, 1000 );
				$( ".icon5").animate({
			        width: "17%",
			      }, 1000 );
				$( ".icon6").animate({
			        width: "17%",
			      }, 1000 );
				$( ".icon7").animate({
			        width: "17%",
			      }, 1000 );
			}
		}	
	}*/

	$(window).resize(function() {
		if(document.documentElement.clientWidth > 1600) {
			$("#scopes .scopes-icon1").on({
	    mouseenter: function () {
			$("#scopes .text1 p").css("display","block");
			$("#scopes .scopes-icon1").css("top","-20%");
	    },
	    mouseleave: function () {
			$("#scopes .text1 p").css("display","none");
			$("#scopes .scopes-icon1").css("top","-63%");
	    }
		});
		$("#scopes .scopes-icon2").on({
		    mouseenter: function () {
				$("#scopes .text2 p").css("display","block");
				$("#scopes .scopes-icon2").css("top","-20%");
		    },
		    mouseleave: function () {
				$("#scopes .text2 p").css("display","none");
				$("#scopes .scopes-icon2").css("top","-63%");
		    }
		});
		$("#scopes .scopes-icon3").on({
		    mouseenter: function () {
				$("#scopes .text3 p").css("display","block");
				$("#scopes .scopes-icon3").css("top","-20%");
		    },
		    mouseleave: function () {
				$("#scopes .text3 p").css("display","none");
				$("#scopes .scopes-icon3").css("top","-63%");
		    }
		});
		$("#scopes .scopes-icon4").on({
		    mouseenter: function () {
				$("#scopes .text4 p").css("display","block");
				$("#scopes .scopes-icon4").css("top","-20%");
		    },
		    mouseleave: function () {
				$("#scopes .text4 p").css("display","none");
				$("#scopes .scopes-icon4").css("top","-63%");
		    }
		});
		$("#scopes .scopes-icon5").on({
		    mouseenter: function () {
				$("#scopes .text5 p").css("display","block");
				$("#scopes .scopes-icon5").css("top","-20%");
		    },
		    mouseleave: function () {
				$("#scopes .text5 p").css("display","none");
				$("#scopes .scopes-icon5").css("top","-63%");
		    }
		});
		$("#scopes .scopes-icon6").on({
		    mouseenter: function () {
				$("#scopes .text6 p").css("display","block");
				$("#scopes .scopes-icon6").css("top","-20%");
		    },
		    mouseleave: function () {
				$("#scopes .text6 p").css("display","none");
				$("#scopes .scopes-icon6").css("top","-63%");
		    }
		});
		$("#scopes .scopes-icon7").on({
		    mouseenter: function () {
				$("#scopes .text7 p").css("display","block");
				$("#scopes .scopes-icon7").css("top","-20%");
		    },
		    mouseleave: function () {
				$("#scopes .text7 p").css("display","none");
				$("#scopes .scopes-icon7").css("top","-63%");
		    }
		});
		}
	});
	





	function iconTransform(){
		for(var j = 1;j<2;j++){
				setTimeout(function(){
		            $( ".icon1").animate({
			        width: "18%",
			      },500 ); 
		        }, 500);
				setTimeout(function(){
		            $( ".icon2").animate({
			        width: "18%",
			      }, 500 ); 
		        }, 1000);
		        setTimeout(function(){
		            $( ".icon3").animate({
			        width: "18%",
			      }, 500 ); 
		        }, 1500);
		        setTimeout(function(){
		            $( ".icon4").animate({
			        width: "18%",
			      }, 500 ); 
		        }, 2000);
		        setTimeout(function(){
		            $( ".icon5").animate({
			        width: "18%",
			      }, 500 ); 
		        }, 2500);
		        setTimeout(function(){
		            $( ".icon6").animate({
			        width: "18%",
			      }, 500 ); 
		        }, 3000);
		        setTimeout(function(){
		            $( ".icon7").animate({
			        width: "18%",
			      }, 500 ); 
		        }, 3500);

		        setTimeout(function(){
		            $( ".icon1").animate({
			        width: "17%",
			      }, 500 ); 
		        }, 4000);
		        setTimeout(function(){
		            $( ".icon2").animate({
			        width: "17%",
			      }, 500 ); 
		        }, 4000);
		        setTimeout(function(){
		            $( ".icon3").animate({
			        width: "17%",
			      }, 500 ); 
		        }, 4000);
		        setTimeout(function(){
		            $( ".icon4").animate({
			        width: "17%",
			      }, 500 ); 
		        }, 4000);
		        setTimeout(function(){
		            $( ".icon5").animate({
			        width: "17%",
			      }, 500 ); 
		        }, 4000);
		        setTimeout(function(){
		            $( ".icon6").animate({
			        width: "17%",
			      }, 500 ); 
		        }, 4000);
		        setTimeout(function(){
		            $( ".icon7").animate({
			        width: "17%",
			      }, 500 ); 
		        }, 4000);
			}
		}
	window.onload = iconTransform();
});
