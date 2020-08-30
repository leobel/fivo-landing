<?php

// echo phpinfo();
// If you are using Composer
require 'vendor/autoload.php';

// $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
// $dotenv->load();

// If you are not using Composer (recommended)
// require("path/to/sendgrid-php/sendgrid-php.php");


try {
	$name = $_POST["name"];
	$email = $_POST["email"];
	$message = $_POST["message"];

	// save contact to database
	$server = $_ENV['MONGO_SERVER'];
	$db = $_ENV['MONGO_DB'];
	$client = new MongoDB\Client("mongodb+srv://".$server."/".$db."?retryWrites=true&w=majority");
	$collection = $client->nerox->leads;

	$result = $collection->insertOne( [ 'name' => $name, 'email' => $email, 'message' => $message ] );

	// send an email as a notification method
	$sender = $_ENV['SENDGRID_SENDER'];
	$receiver = $_ENV['SENDGRID_RECEIVER'];
	$from = new SendGrid\Email(null, $sender);
	$subject = "Fivo contact form notification!";
	$to = new SendGrid\Email(null, $receiver);
	$content = new SendGrid\Content("text/plain", "You have a message from\nName: ".$name."\nEmail: ".$email."\nMessage: ".$message."\n");
	$mail = new SendGrid\Mail($from, $subject, $to, $content);

	$apiKey = $_ENV['SENDGRID_API_KEY'];
	$sg = new \SendGrid($apiKey);

	$response = $sg->client->mail()->send()->post($mail);
} catch (Exception $e) {
	error_log('sendgrid exception: '. $e->getMessage() ."\n");
}