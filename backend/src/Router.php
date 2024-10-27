<?php

class Router {

  protected $routes = [];

  public function addRoute(string $method, string $url, closure $target) {
    $this->routes[$method][$url] = $target;
    return $this;
  }

  public function matchRoute() {
    $method = $_SERVER['REQUEST_METHOD'];
    $request_url = $_SERVER['REQUEST_URI'];
    if (isset($this->routes[$method])) {
      foreach ($this->routes[$method] as $url => $function) {
        if ($request_url == $url) {
          call_user_func($function);
          return;
        }
      }
    }

    throw new Exception("Route not found: ", 404);
  }
}
