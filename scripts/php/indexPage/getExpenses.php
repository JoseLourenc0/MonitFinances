<?php

    session_start();

    require_once '../conn.php';

    try{
        
        $stm= $pdo->prepare('SELECT name_table AS tb FROM tb_tables WHERE createdby_table = :nu');
        $stm->bindValue(':nu', $_SESSION['user_name']);
        $stm->execute();

        $table = $stm->fetch(PDO::FETCH_ASSOC)['tb'];

        $stm= $pdo->prepare('SELECT expense_tbf AS exp, description_tbf AS description, datereg_tbf AS datereg
                             FROM '.$table.
                             ' WHERE description_tbf <> "first reg"');
        $stm->execute();

        if($stm->rowCount()>=1){

            echo json_encode($stm->fetchAll(PDO::FETCH_ASSOC));

        }else{

            echo 0;

        }

    }catch(PDOException $e){

        echo $e -> getMessage();

    }