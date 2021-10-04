<?php

    session_start();

    require_once '../conn.php';

    $name = addslashes($_POST['name']);
    $password = addslashes($_POST['password']);

    if(isset($password) && isset($name)){
        
        try{
            $_SESSION['user_name'] = $name;
            
            require_once '../createtable/newtable.php';

            $idTable = preg_replace("/[^0-9]/", "",$idTable);

            $stm= $pdo->prepare('INSERT INTO tb_users (name_user,password_user,tba_user,datereg_user) VALUES (:nu,:pu,:do,NOW())');
            $stm->bindValue(':nu', $name);
            $stm->bindValue(':pu', md5(md5($name.$password)));
            $stm->bindValue(':do', $idTable);
            $stm->execute();

            if($stm -> rowCount()>=1){
                
                $_SESSION['CreateAccountSuccessfull'] = true;
                header('Location: ../../../index.php');

            }else{
                echo 0;
            }

        }catch(PDOException $e){

            echo $e->getMessage();

        }
    }

