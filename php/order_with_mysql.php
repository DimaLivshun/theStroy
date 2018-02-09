<?php
class mysql {
	###
	#	Подключение к бд
	function connect($db_host, $db_login, $db_passwd, $db_name) {
		mysql_connect($db_host, $db_login, $db_passwd) or die ("MySQL Error: " . mysql_error()); //~ устанавливаем подключение с бд
		mysql_query("set names utf8") or die ("<br>Invalid query: " . mysql_error()); //~ указываем что передаем данные в utf8
		mysql_select_db($db_name) or die ("<br>Invalid query: " . mysql_error()); //~ выбираем базу данных
	}

	###
	#	Запрос к базе и его производные
	function query($query, $type, $num) {
		if ($q=mysql_query($query)) {
			switch ($type) {
				case 'num_row' : return mysql_num_rows($q); break;
				case 'result' : return mysql_result($q, $num); break;
				case 'accos' : return mysql_fetch_assoc($q); break;
				case 'none' : return $q;
				default: return $q;
			}
		} else {
			print 'Mysql error: '.mysql_error();
			return false;
		}
		//~ !!! DANGER !!!
		//~ при переносе в паблик убрать print 'Mysql error: '.mysql_error();
		//~ эта строчка стоит только для отладки и используя ее в паблике можно засветить запросы
	}

	###
	#	экранирование данных 
	function screening($data) {
		$data = trim($data); //~ удаление пробелов из начала и конца строки
		return mysql_real_escape_string($data); //~ экранирование символов
	}
}

//~ Параметры поключения к бд
$db_host = 'localhost';
$db_login = 'root';
$db_passwd = '12345';
$db_name = 'lion';

// подключаемся к бд
$db = new mysql(); //~ Создаем новый объект класса
$db -> connect($db_host, $db_login, $db_passwd, $db_name);

header('Content-type: text/html; charset=utf-8');
error_reporting(0);
    
?>

<?php

if(!empty($_POST['send'])) {

	$name = substr(htmlspecialchars(trim($_POST['name'])), 0, 300);
	$tel = substr(htmlspecialchars(trim($_POST['tel'])), 0, 100);
	$email = substr(htmlspecialchars(trim($_POST['email'])), 0, 100);
	$comment = substr(htmlspecialchars(trim($_POST['comment'])), 0, 2000);
	
	$ip = $_SERVER['REMOTE_ADDR'];

	$Nzakaz = rand(10000, 99999);

	$mess  = "Имя: <b>".$name."</b><br />";
	$mess .= "Телефон: <b>".$tel."</b><br />";
	$mess .= "E-mail: <b>".$email."</b><br />";
	$mess .= "Комментарий: <b>".$comment."</b><br />";
	//$mess .= "IP: <b>".$ip."</b><br />";
	
	$theme = "Заявка Z".$Nzakaz;

	mail("whitelion@mail.ua", $theme, $mess, "From: whitelion.dn.ua <info@whitelion.dn.ua>\nContent-Type: text/html;\n charset=utf-8\nX-Priority: 0");
	

	echo "<h3>Заявка удачно оформлена.</h3>";
	echo "<p>Заявке присвоен номер Z".$Nzakaz.". Наш менеджер свяжется с вами в ближайшее время.</p>";
    //Добавляем данные в БД
    $query = "INSERT INTO `order` VALUES ('', '$Nzakaz', '$name', '$tel', '$email', '$comment')";
        mysql_query($query) or die (mysql_error());
        
    }
else {
	
	echo "<h2>Ошибка! Попробуйте еще раз.</h2>";
	
}	
?>