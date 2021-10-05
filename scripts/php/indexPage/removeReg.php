<?php

    session_start();

    require_once '../conn.php';

    $date = addslashes($_POST['d']);
    $table = addslashes($_POST['table']);

    if(isset($date) && isset($table)){

        $table = 'tbf_'.$table;

        try{
        
            $stm= $pdo->prepare('DELETE FROM '.$table.' WHERE datereg_tbf = :date');
            $stm->bindValue(':date', $date);
            $stm->execute();

            if($stm->rowCount()>=1){

                echo 1;

            }else{

                echo 0;

            }

        }catch(PDOException $e){

            echo $e -> getMessage();

        }

    }
    