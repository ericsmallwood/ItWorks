<?php

require('../thirdparty/phpmailer/PHPMailerAutoload.php');

if(is_ajax()){
    $mail = new PHPMailer;

    //server settings
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Port = 587;
    $mail->SMTPSecure = "tls";

    //login info
    $mail->Username = 'example';
    $mail->Password = 'password';

    //disable ssl verification because gmail server configuration is not properly set up to work for
    //php 5.6
    $mail->SMTPOptions = array(
        'ssl' => array(
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true
        )
    );

    //email details
    $subject = $_POST["subject"];
    $mail->SetFrom('example@gmail.com', "Website Reply");
    $mail->addAddress('example@gmail.com', 'Example');
    $mail->isHTML(true);
    $mail->Subject = $subject;

    $name = $_POST["name"];
    $email = $_POST["email"];
    $body = $_POST["body"];
    $mail->Body    = '<strong>Name: </strong>'.$name.'<br /><strong>Email: </strong>'.$email.'<br />'.'<strong>Message: </strong>'.$body;

    if(!$mail->send()) {
        header('HTTP/1.1 500 Internal Server Booboo');
        header('Content-Type: application/json; charset=UTF-8');
        die(json_encode(array('message' => 'ERROR', 'code' => 500)));
    } else {
        echo json_encode('Thank You! Your message has been sent');
    }
}else{
    echo "You do not have permission to access this page.";
}

function is_ajax() {
    return isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest';
}