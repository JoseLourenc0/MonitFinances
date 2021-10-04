<?php

    require_once '../conn.php';

    $idTable;
    
    try{
        
        $stm= $pdo->prepare('SELECT name_table AS tab FROM tb_tables ORDER BY id_table DESC LIMIT 1');
        $stm->execute();

        if($stm->rowCount()>=1){

            $idTable = preg_replace("/[^0-9]/", "",$stm->fetch(PDO::FETCH_ASSOC)['tab']);

        }else{

            $idTable = 0;

        }

    }catch(PDOException $e){

        echo $e -> getMessage();

    }