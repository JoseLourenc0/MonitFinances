<?php

    session_start();

    require_once '../conn.php';

    $val = addslashes($_POST['val']);
    $description = addslashes($_POST['description']);
    $table = addslashes($_POST['table']);
    $regbytbf = $_SESSION['user_name'] ?? 'user';

    if(isset($val) && isset($description) && isset($table)){

        $table = 'tbf_'.$table;
        
        try{

            $stm= $pdo->prepare('INSERT INTO '.$table.' (expense_tbf,description_tbf,regby_tbf,datereg_tbf) VALUES (:ex,:de,:rb,NOW())');
            $stm->bindValue(':ex', $val);
            $stm->bindValue(':de', $description);
            $stm->bindValue(':rb', $regbytbf);
            $stm->execute();

            if($stm -> rowCount()>=1){
                echo 1;
            }else{
                echo 0;
            }

        }catch(PDOException $e){

            echo $e->getMessage();

        }
    }

