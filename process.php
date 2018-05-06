<?php
#echo 'hello1';
try{
 if(isset($_POST['submit'])){
	
	#echo 'hello';
    $query = $_POST['message'];
   
   
   
    $postData = array('query' => $query, 'lang' => 'en', 'sessionId' => '123456789');
    
    $jsonData = json_encode($postData);
   
    
    /*
    $ch = curl_init('https://api.dialogflow.com/v1/query?v=20170712');
    echo 'hello';
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', 'Authorization: Bearer 7850106a19344147a97d89af62bfd4b4'));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    echo 'hello';
    $result = curl_exec($ch);
    echo 'hello';
    echo $result;
    curl_close($ch);
    */
    
    
    
    $url = 'https://api.dialogflow.com/v1/query?v=20150910';

$headers = [
    'Accept: */*',
    'Content-Type: application/json',
    'Authorization: Bearer e8c742654ff54aeaae6e555f2042fbb0'
];

// open connection
$ch = curl_init();

// set curl options
$options = [
    CURLOPT_URL => $url,
    CURLOPT_POST => count($jsonData),
    CURLOPT_POSTFIELDS =>$jsonData,# http_build_query($postData),
    CURLOPT_HTTPHEADER => $headers,
    CURLOPT_RETURNTRANSFER => true,
];
curl_setopt_array($ch, $options);

// execute
$result = curl_exec($ch);
echo $result;
// close connection
curl_close($ch);
    }
    

}
catch (Exception $e) {
    	
    	echo 'Message: ' .$e->getMessage();
    }

?>
