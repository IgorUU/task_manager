<?php

require 'vendor/autoload.php';
include './src/MyDB.php';
include './src/Router.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
$request = $_SERVER['REQUEST_URI'];

$router = new Router();
$db = new MyDB();

if (!$db) {
    echo $db->lastErrorMsg();
    return;
}

$router->addRoute('POST', '/insert', function () use ($db) {
    $db->insert();
});

$router->addRoute('GET', '/delete', function () use ($db) {
    $db->dropTable();
});

$router->matchRoute();
