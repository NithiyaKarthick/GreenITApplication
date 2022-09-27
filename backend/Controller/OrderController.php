<?PHP

require_once("./Interfaces/OrderInterface.php");
require_once("Controller.php");
require_once("./lib/CsvHandler.php");

/**
 *  load Mongolog logger framework
 *  
 */
use Monolog\Level;
use Monolog\Logger;
use Monolog\Handler\StreamHandler;


class OrderController extends Controller implements OrderInterface {

       
    const DATA_FILE = "./data/data.csv";
    private  $response = array('code'=>'', 'data'=>''); 
     
    /**
     * Method to set the resonse code
     */
    private function setCode(int $code){
        $this->response['code'] = $code;
    }

    //Method to set the response Data
    private function setData($data){
        $this->response['data'] = $data;
    }

    //Method to validate the data passed from the client before adding or editing order details 
    public function ValidateInputData($data){

        $arr_error = array();

        //validate Name
        $name = (string) trim($data['name']);
        if(empty($name)){
            $arr_error['name'] = "Name is required";
        }
        else{
            $name_regex = "/^[a-zA-Z ]+$/i";
            if (!preg_match ($name_regex, $name) ) { 
                $arr_error['name'] = "Name must contain only Alphabets";
             }
        }
                
        //validate State
        $state = $data['state'];
        if(empty(trim($state))){
            $arr_error['state'] = "State is required";
        }
        else{
            $state_regex = "/^[a-zA-Z ]+$/i";
            if (!preg_match ($state_regex, $state) ) { 
                $arr_error['state'] = "State must be in Letters";
            }
        }
                
        //validate Zip
        $zip = $data['zip'];
        if(empty(trim($zip))){
            $arr_error['zip'] = "Zip is required";
        }
        else {
            $zip_regex = "/^(?:\d{5,9})$/i"; 
            if (!preg_match($zip_regex, $zip)) {
                $arr_error['zip'] = "Zip must contain only numbers with maximum length as 5 or 9";
            }
        }
        
        //validate Amount
        $amount = trim($data['amount']);
        if(empty($amount)){
            $arr_error['amount'] = "Amount is required";
        }else {
            if (filter_var($amount, FILTER_VALIDATE_FLOAT) === false) {
                $arr_error['amount'] = "Amount must be in decimal format e.g - 10.00";
            }
        }
        
        //validate Quantity
        $qty=trim($data['qty']);
        if(empty($qty)){
            $arr_error['qty'] = "Quantity is required";
        }else if (!preg_match("/^[0-9]+$/", $qty)) {
            $arr_error['qty'] = "Quantity must contain only numbers";
        }
        
        //validate Item        
        $item = trim($data['item']);
        if(empty($item)){
            $arr_error['item'] = "Item cannot be empty";
        }
        if(empty($arr_error)){
            return true;
        }else{
            return $arr_error;
        }
    }

     /**
     * addOrderDetails
     * Method to perform 
     * 1. Reading order details from csv file into an array
     * 2. Push the new order details into the existing array
     * 3. Write the array to the csv file
     */
    public function addOrderDetails(){

        //Allow only POST  request Method for add
        if($_SERVER['REQUEST_METHOD'] != 'POST'){
            $this->setCode(405);
            $this->setData('Method not supported');
        }
            
        //add the order details
        else{
           
            try{
                $json = file_get_contents('php://input');
                $data = json_decode($json, true);
    
                // checkif the data is empty and throw error
                if(empty($data)) 
                {
                throw new Exception("Order is empty"); 
                }
                   
                $validate = $this->ValidateInputData($data);
                if(is_array($validate)){
                    $this->setCode(400);
                    $this->setData($validate);
                }else{
                    $record = array($data['id'], $data['name'], $data['state'], $data['zip'], $data['amount'], $data['qty'], $data['item']);
                    $csv = new CsvHandler(self::DATA_FILE);
                    $csv->writeSingleLine($record);
                    $this->setCode(201);
                    $this->setData($record);
                }
             }
             catch(Exception $e){
                
                $this->logger->error($response);

                $this->setCode(304);
                $this->setData($e->getMessage());
                
            }
        }
        return $this->response;
    }

    /**
     * editOrderDetails
     * Method to perform 
     * 1. Reading order details from csv file into an array
     * 2. Push the updated order details into the array
     * 3. Write the array to the csv file
     */
    public function editOrderDetails(){
        if($_SERVER['REQUEST_METHOD'] != 'POST'){
            $this->setCode(405);
            $this->setData('Method not supported');
        }else{
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            $validate = $this->validate($data['data']);
            if(is_array($validate)){
                $this->setCode(400);
                $this->setData($validate);
            }else{
                $csv = new CsvHandler(self::DATA_FILE);
                $csvItems = $csv->csvToArray();
                $record = array($data['data']['id'], $data['data']['name'], $data['data']['state'], $data['data']['zip'], $data['data']['amount'], $data['data']['qty'], $data['data']['item']);
                $csvItems[$data['index']] = $record;
                
                $csv = new CsvHandler(self::DATA_FILE);
                $csv->writeMultipleLine($csvItems);
                
                $this->setCode(200);
                $this->setData($csvItems);
        }   }
        return $this->response;
    }

    /**
     * getOrderDetails
     * Method to read the order details from csv file into an array
     */
    public function getOrderDetails(){

       if($_SERVER['REQUEST_METHOD'] != 'GET'){
            $this->setCode(405);
            $this->setData('Method not supported');
        }else{
            $data=array();
            $csv = new CsvHandler(self::DATA_FILE);
            try{
                $csvdata = $csv->csvToArray();
                if(count($csvdata)) {
                    $columns = $csvdata[0];
                    foreach($csvdata as $k => $csv) {
                        if($k===0)
                            continue;
                        if(is_array($csv)){
                            foreach($csv as $kk => $value) {
                                $data[$k-1][$columns[$kk]] = $value;
                               
                            }
                        }
                    }
                }
            }
            catch (Exception $e) {
                $this->setCode(500);
                $this->setData($e->getMessage());
            }
            $this->setCode(200);
            $this->setData($data);
        }
     
        return $this->response;
    }

     /**
     * deleteOrderDetails
     * Method to perform 
     * 1. Reading order details from csv file into an array
     * 2. Delete the order details from the array
     * 3. Write the array to the csv file
     */
    public function deleteOrderDetails(){
        if($_SERVER['REQUEST_METHOD'] != 'POST'){
            $this->setCode(405);
            $this->setData('Method not supported');
        }else
        {
            try {       
            $json = file_get_contents('php://input');
            $data = json_decode($json, true);
            if ($data['index'] === null) throw new Exception("Order Id is null");

            $csv = new CsvHandler(self::DATA_FILE);
            $csvItems = $csv->csvToArray();
            $count = count($csvItems);
            $id = $data['index'];
            // skip the header , iterate from next row
            for($i = 1; $i < $count; $i++){
    
                if ($csvItems[$i][0] === $id) {
                    array_splice($csvItems, $i, 1); // splice current index from array
                }
    
            }
         
            $csv->writeMultipleLine($csvItems);
            $this->setCode(200);
            $this->setData($csvItems) ;
            }
            catch(Exception $e){

            $response = $e->getMessage();
            $this->logger->error($response);

            return $this->errorResponse(
                $response, false
             , 304);   
        }
        
    }
        return $this->response;
    }
}