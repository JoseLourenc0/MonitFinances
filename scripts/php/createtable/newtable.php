<?php

    require_once '../conn.php';

    require_once 'getlasttable.php';

    if(isset($idTable)){

        $idTable++;

        $idTable = 'tbf_'.$idTable;
        
        try{

            $stm= $pdo->prepare('
                CREATE TABLE '.$idTable.' (
                    id_tbf INT(11) AUTO_INCREMENT PRIMARY KEY, 
                    expense_tbf VARCHAR(100) NOT NULL, 
                    description_tbf VARCHAR(300) NOT NULL,
                    regby_tbf VARCHAR(100) NOT NULL, 
                    datereg_tbf DATETIME NOT NULL);');
            $stm->execute();

            $stm= $pdo->prepare('INSERT INTO '.$idTable.' (expense_tbf,description_tbf,regby_tbf,datereg_tbf) VALUES (0,"first reg","user",NOW())');
            $stm->execute();

            $stm= $pdo->prepare('SELECT * FROM '.$idTable);
            $stm->execute();

            if($stm->rowCount()>=1){

                $stm= $pdo->prepare('INSERT INTO tb_tables (name_table,createdby_table,regday_table) VALUES (:nm,"user",NOW())');
                $stm->bindValue(':nm', $idTable);
                $stm->execute();
                
                echo 1;

            }else{

                echo 0;

            }

        }catch(PDOException $e){

            echo $e->getMessage();

        }
    }

