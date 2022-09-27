<?php

require( '../Server/Controller/ControllerFactory.php');
 
class OrderTest extends \Codeception\Test\Unit
{
    private $csvFilePath = 'tests/data/data.csv';
    protected function _before()
    {
    }

     /**
     * testFileExists
     * Check the whether the data.csv file is available 
     * @return void
     */
    public function testFileExists(): void
    {
               $this->assertFileExists($this->csvFilePath);
        
    }

    /**
     * Test Method  - testFileReadable
     * Check the whether the data.csv file is readable 
     * @return void
     */
    public function testFileReadable(){

        $this->assertFileIsReadable($this->csvFilePath);
     }
     
     /**
      * Test Method  - testFileWritable
      * Check the whether the data.csv file is writable 
      * @return void
      */
     public function testFileWritable(): void
     {
                $this->assertFileIsWritable($this->csvFilePath);
         
     }

    /**
     * Test Method - CALL GetOrderDetails API with GET Request
     */
    public function testGetOrderDetails_1()
    {
        $obj = ControllerFactory::getController('Order');

        $_SERVER['REQUEST_METHOD'] = 'GET';

        $result = $obj->getOrderDetails();


        $this->assertEquals($result['code'],"200","Order fetched successfully");
    }

    /**
     * Test Method - CALL GetOrderDetails API with POST Request
     */
    public function testGetOrderDetails_2()
    {
        $obj = ControllerFactory::getController('Order');

        $_SERVER['REQUEST_METHOD'] = 'POST';

        $response1 = $obj->getOrderDetails();

         $this->assertEquals($response1['code'],"405","Order fetched successfully");
    }

     /**
     * Test Method - CALL AddOrderDetails API with GET Request
     */
    public function testAddOrderDetails()
    {
        $obj = ControllerFactory::getController('Order');

        $_SERVER['REQUEST_METHOD'] = 'GET';

        $result = $obj->AddOrderDetails();


        $this->assertEquals($result['code'],"405","Method GET Not supported");
    }

    /**
     * Test Method -  testValidateInput_1 
     * Method to validate Order data
     */
    public function testValidateInput_1()
    {
        $obj = ControllerFactory::getController('Order');

        $data = array();
        $data['id']="";
        $data['name']="";
        $data['state']="";
        $data['zip']="";
        $data['amount']="";
        $data['qty']="";
        $data['item']="";

        $arr_error = $obj->validateInputData($data);
        
        $this->assertEmpty($arr_error);
    }

     /**
     * Test Method -  testValidateInput_2
     * Method to validate Name in Order data
     */
    public function testValidateInput_2()
    {
        $obj = ControllerFactory::getController('Order');

        $data = array();
        $data['id']="1";
        $data['name']="dfs4534";
        $data['state']="NJ";
        $data['zip']="42344";
        $data['amount']="343.90";
        $data['qty']="2";
        $data['item']="aa001";

        $arr_error = $obj->validateInputData($data);
        $this->assertEquals($arr_error['name'],"Name must contain only Alphabets","Name must contain only Alphabets");
    }



}

?>