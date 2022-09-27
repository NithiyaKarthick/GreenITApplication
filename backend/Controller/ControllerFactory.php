<?PHP
include "./Controller/Controller.php";
include "./Controller/OrderController.php";

/**
 * Controller factory to create object of the Controller class
 */

class ControllerFactory {
    static function getController($object): Controller {
        $class = $object . "Controller";
        return new $class();    
    }
}
?>