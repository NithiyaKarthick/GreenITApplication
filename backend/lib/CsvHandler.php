<?PHP
class CsvHandler{
    public $file;
    public function __construct($file){
        $this->file = $file;
        //check if file exists , if not throws an exception
        $this->checkIfFileExists();
    }

    // Method to convert csv file data to array
    public function csvToArray(){
        $csvArray=array();
        if (($file_to_read = fopen($this->file, "r")) !== FALSE) {
            while (($data = fgetcsv($file_to_read)) !== FALSE) {
                $csvArray[] = $data; // push each row into an array
            }
            // after reading the file, close it
            fclose($file_to_read);
        }else{
            throw new Exception("Failed to open file in write mode");
        }
       
        return $csvArray;
    }

    //Method to write a single record in CSV File
    public function writeSingleLine($data){
        $file = new \SplFileObject($this->file, 'a');
        $file->fputcsv($data);
    }

    //Mthod to write multiple records in CSV File
    public function writeMultipleLine($data){
        try { 

            if(($file = new \SplFileObject($this->file, 'w')) !== FALSE)
                {
                    foreach($data as $line){
                        if(is_array($line)){
                            $file->fputcsv($line);
                        }
                    }
                    
                }
                else{
                    throw new Exception(" Failed to open file in write mode");
                } 
            }
            catch (Exception $e) {

                $response = $e->getMessage();
                $this->logger->error($response);
    
                return $this->errorResponse(
                    $response, false
                 , 304);            
            }
    }

       /**
     * checkIfFileExists
     *
     * @return void
     */
    public function checkIfFileExists()
    {
        try {
            if(!file_exists($this -> file)){
                throw new Exception("File does not exists");
            }
        } catch (Exception $e) {
            $response = $e->getMessage();
            $this->logger->error($response);

            return $this->errorResponse(
                $response, false
             , 304);
        }
    }
}
?>