<?php
session_start();
require_once '../clases/vendor/autoload.php';
$cliente = new Google_Client();
$cliente->setApplicationName('jj-keep-2016');
$cliente->setClientId('448371803955-qs49nk5011h39sa14rgd9qlkqch6hg2c.apps.googleusercontent.com');
$cliente->setClientSecret('iZZ3z58n0jMSQEFIpQWR6z1c');
$cliente->setRedirectUri('https://keep-keisserdur.c9users.io/Credenciales/SaveCredenciales.php');
$cliente->setScopes('https://www.googleapis.com/auth/gmail.compose');
$cliente->setAccessType('offline');
if (!$cliente->getAccessToken()) {
   $auth = $cliente->createAuthUrl();
   header("Location: $auth");
}