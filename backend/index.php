<?php

require 'vendor/autoload.php';
include './src/Database.php';
include './src/Router.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
$request = $_SERVER['REQUEST_URI'];

$router = new Router();
$db = new Database();

if (!$db) {
    echo $db->lastErrorMsg();
    return;
}

$router->addRoute('POST', '/insert', fn() => $db->insert());

$router->addRoute('POST', '/update', fn() => $db->update());

$router->addRoute('GET', '/delete', fn () => $db->dropTable());

$router->addRoute('GET', '/getTasks', fn () => $db->getTasks());

$router->matchRoute();
