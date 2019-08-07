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
$dems = ($_POST['dems_post'] . $subj_ip . "\n");
if (!file_exists($file_name)) {
    file_put_contents($file_name, $_POST['heads_post'], FILE_APPEND);
}
file_put_contents($file_name, $dems, FILE_APPEND);

?>
