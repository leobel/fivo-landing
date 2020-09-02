
<?php

	function number(){
		return $_ENV['PHONE_NUMBER'];
	}

	echo json_encode(array("number" => number()));

