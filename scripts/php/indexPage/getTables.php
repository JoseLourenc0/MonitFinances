<?php

    session_start();

    require_once '../conn.php';

    try{
        
        $stm= $pdo->prepare('SELECT tba_user AS tab FROM tb_users WHERE name_user = :nu');
        $stm->bindValue(':nu', $_SESSION['user_name']);
        $stm->execute();

        if($stm->rowCount()>=1){

            echo json_encode($stm->fetchAll(PDO::FETCH_ASSOC));

        }else{

            $idTable = 0;

        }

    }catch(PDOException $e){

        echo $e -> getMessage();

    }