<?PHP 
 
interface OrderInterface {

    /**
     * getOrderDetails
     * Method to read the order details from csv file into an array
     */
    public function getOrderDetails();

     /**
     * addOrderDetails
     * Method to perform 
     * 1. Reading order details from csv file into an array
     * 2. Push the new order details into the existing array
     * 3. Write the array to the csv file
     */
    public function addOrderDetails();

     /**
     * editOrderDetails
     * Method to perform 
     * 1. Reading order details from csv file into an array
     * 2. Push the updated order details into the array
     * 3. Write the array to the csv file
     */
    public function editOrderDetails();

    /**
     * deleteOrderDetails
     * Method to perform 
     * 1. Reading order details from csv file into an array
     * 2. Delete the order details from the array
     * 3. Write the array to the csv file
     */
    public function deleteOrderDetails();

}
?>