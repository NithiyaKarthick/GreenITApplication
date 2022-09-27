<?php

include "./Controller/ControllerFactory.php";

 
class RequestHandler {
  
  const CONTROLLER_PATH = "./Controller/%sController.php";

  private function objectExists(String $object): bool {
      sprintf(self::CONTROLLER_PATH, $object);
      if(file_exists(sprintf(self::CONTROLLER_PATH, $object))){
        return true;
      }else{
        return false;
      }
  }

  //Method to resolve the url path 
  protected function resolvePath(): array {
   
      $parser = parse_url($_SERVER['REQUEST_URI']);
      $path = $parser['path'];
      $path = trim($path, '/');
      $arr_path = explode('/',$path);
    
      return array(
        'object' => $arr_path[0],
        'action' => $arr_path[1]
      );
  }

  //Method which sends the response back to the client
  private function sendResponse($code,$data) {
      http_response_code($code);
      echo json_encode($data);
  }

  //Method which will resolve the url and validate the action specified in the url 
  // route to the appropriate action of add/edit/delete/list
  public function render() {
      $arrPath = $this->resolvePath();
      $object = ucfirst($arrPath['object']);
      $action = $arrPath['action'];
      if ($this->objectExists($object)){
        $obj = ControllerFactory::getController($object);
        if(method_exists($obj, $action)){
          $response = $obj->$action();
          $this->sendResponse($response['code'], $response['data']);
        }else{
            $this->sendResponse(404,'Action not found');
        }
      }else{
        $this->sendResponse(404,'Resource not found');
      }
  } 
}
$csv = new RequestHandler();
$csv->render();

?>
