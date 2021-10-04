<?php 
    
    require_once 'dbsettings.php'; //! HERE THE FILE dbsettings.php brings dbhost, dbname, dbusrname and dbusrpass variables to use on PDO Connection

    try{
        $pdo = new PDO('mysql:host='.$dbhost.'; dbname='.$dbname.';',$dbusrname,$dbusrpass);

    }catch(PDOException $e){
        echo $e->getMessage();
        exit;
    }