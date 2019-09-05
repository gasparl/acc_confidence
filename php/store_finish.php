<?php

// get IP
if (!empty($_SERVER['HTTP_CLIENT_IP'])) // check ip from share internet
    {
    $subj_ip = $_SERVER['HTTP_CLIENT_IP'];
} elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) // check ip is pass from proxy
    {
    $subj_ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
} else {
    $subj_ip = $_SERVER['REMOTE_ADDR'];
}

$file_name = ('../results/' . $_POST['filename_post']);
$subject_results = ($_POST['results_post'] . "/" . $subj_ip . $_POST['date_post']);

file_put_contents($file_name, $subject_results, FILE_APPEND);
if (strlen($_POST['wid_post']) < 4) {
    echo '(No valid MTurk ID)';
} else if (strlen($subject_results) > 400) {
    echo 'demoValidPassword';
} else {
    echo '(No valid data)';
}

?>
