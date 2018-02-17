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
	var owl = $(".carousel-reviews");
	owl.owlCarousel({
		items : 1,
		responsive : true,
		autoHeight : true,
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

	var owl = $(".carousel");
	owl.owlCarousel({
		items : 1,
		responsive : true,
		autoPlay: 5000,
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
    $(".nav-bar").on("click","a.thispage", function (event) {
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
	        $('.all-page-wrap , #all-gallery-wrap , #all-album-wrap').append('<div id="fade"></div>');
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



	//dropdown///////////////////////////////////////////////////
	$(document).ready(function() {
	  //прикрепляем клик по заголовкам acc-head
	    $('.accordeon .acc-head ').on('click', f_acc);
	});

	function f_acc(){
	//скрываем все кроме того, что должны открыть
	  $('.accordeon .acc-body').not($(this).next()).slideUp(1000);
	// открываем или скрываем блок под заголовоком, по которому кликнули
	    $(this).next().slideToggle(1000);
	}

	$(document).ready(function() {
	  //прикрепляем клик по заголовкам acc-head
	    $('.scopes-content .acc-head2 ').on('click', f_acc2);
	});

	function f_acc2(){
	//скрываем все кроме того, что должны открыть
	  $('.scopes-content .acc-body2').not($(this).next()).slideUp(700);
	// открываем или скрываем блок под заголовоком, по которому кликнули
	    $(this).next().slideToggle(700);
	}
	

		$('#scopes .scopes-icon1').toggle(
			function(e){
				$('#scopes .text1 p').css("display","block");
				e.preventDefault();
			},
			function(e){
				$("#scopes .text1 p").css("display","none");
				e.preventDefault();
			}
		);
		$('#scopes .scopes-icon2').toggle(
			function(e){
				$('#scopes .text2 p').css("display","block");
				e.preventDefault();
			},
			function(e){
				$("#scopes .text2 p").css("display","none");
				e.preventDefault();
			}
		);
		$('#scopes .scopes-icon3').toggle(
			function(e){
				$('#scopes .text3 p').css("display","block");
				e.preventDefault();
			},
			function(e){
				$("#scopes .text3 p").css("display","none");
				e.preventDefault();
			}
		);
		$('#scopes .scopes-icon4').toggle(
			function(e){
				$('#scopes .text4 p').css("display","block");
				e.preventDefault();
			},
			function(e){
				$("#scopes .text4 p").css("display","none");
				e.preventDefault();
			}
		);
		$('#scopes .scopes-icon5').toggle(
			function(e){
				$('#scopes .text5 p').css("display","block");
				e.preventDefault();
			},
			function(e){
				$("#scopes .text5 p").css("display","none");
				e.preventDefault();
			}
		);
		$('#scopes .scopes-icon6').toggle(
			function(e){
				$('#scopes .text6 p').css("display","block");
				e.preventDefault();
			},
			function(e){
				$("#scopes .text6 p").css("display","none");
				e.preventDefault();
			}
		);
		$('#scopes .scopes-icon7').toggle(
			function(e){
				$('#scopes .text7 p').css("display","block");
				$('#scopes .scopes-icon7').css("top","-5%");
				e.preventDefault();
			},
			function(e){
				$("#scopes .text7 p").css("display","none");
				$('#scopes .scopes-icon7').css("top","-8%");
				e.preventDefault();
			}
		);
	//Попап галерея для альбома
	$("a.photo-gallery").fancybox({						
         "padding" : 20,
         "imageScale" : false, 
		"zoomOpacity" : false,
		"zoomSpeedIn" : 1000,	
		"zoomSpeedOut" : 1000,	
		"zoomSpeedChange" : 1000, 
		"frameWidth" : 700,	 
		"frameHeight" : 600, 
		"overlayShow" : true, 
		"overlayOpacity" : 0.8,	
		"hideOnContentClick" :false,
		"centerOnScroll" : false			
	});

});
