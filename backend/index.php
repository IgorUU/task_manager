<?php

require 'vendor/autoload.php';
include './src/MyDB.php';
include './src/Router.php';

header('Access-Control-Allow-Origin: http://localhost:3000');
$request = $_SERVER['REQUEST_URI'];
$task = $_POST['task'] ?? '';

$router = new Router();
$db = new MyDB();

if (!$db) {
    echo $db->lastErrorMsg();
    return;
}

$router->addRoute('POST', '/insert', function () use ($db, $task) {
    $db->insert($task);
    die;
});

$router->addRoute('GET', '/delete', function () use ($db) {
    $db->dropTable();
    die;
});

$router->matchRoute();
