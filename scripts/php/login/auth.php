<?php 

	session_start();

	$_SESSION['logged'] = false;
	$_SESSION['fa'] = false;
	$_SESSION['CreateAccountSuccessfull'] = false;

	$name = addslashes($_POST['name']);
	$password = addslashes($_POST['password']);

	if(isset($name) && isset($password)){

		require_once '../conn.php';

		$stm= $pdo->prepare('SELECT * FROM tb_users WHERE name_user = :usrname AND password_user = :usrpass');
		$stm ->bindValue(':usrname',$name);
		$stm ->bindValue(':usrpass',md5(md5($name.$password)));
        $stm->execute();

		if($stm->rowCount()>=1){

			$_SESSION['logged'] = true;
			$_SESSION['user_name'] = $stm->fetch(PDO::FETCH_ASSOC)['name_user'];
			$_SESSION['fa'] = true;
			echo ($_SESSION['logged']);

		}else{

			$_SESSION['logged'] = false;

		}
        header('Location: ../../../index.php');

		$pdo=null;

	}