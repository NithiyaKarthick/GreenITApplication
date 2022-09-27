<?PHP
/**  
* Base Controller class which will be extended by other controllers
*/

class Controller {

     public $logger;


    public function __construct()  {
        header('Access-Control-Allow-Origin: *');
        header("Content-type: application/json; charset=utf-8");
 
    }
}
?>