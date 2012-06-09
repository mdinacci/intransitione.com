<?php
    function check_security_code($sec_code) {
        return $sec_code == "womell";
    }

    $security_code = $_POST['security_code'];
    if(!check_security_code(strtolower(trim($security_code)))) {
        echo "Security code didn't match, <a href='/support.html'>Retry please</a> ";
        exit;
    }

    $name = $_POST['nah83h8dhm'];
    $email = $_POST['emGRJK3ai'];
    $message = $_POST['message'];
    $topic = $_POST['subjects'];

    //Save visitor name and entered message into one variable:
    $formcontent="Visitor Name: $name \n\n$message";
    $recipient = "marco.dinacci@gmail.com";
    $subject = "[intransitione.com][". $topic ."] Feedback";

    $headers = 'From: marco.dinacci@gmail.com' . "\r\n" . 'Reply-To: '. $email . "\r\n";
    mail($recipient, $subject, $formcontent, $headers) or die("Failure!");

    header("Location: http://www.intransitione.com");
    exit;
?>
