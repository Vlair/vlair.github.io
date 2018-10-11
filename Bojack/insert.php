<?php  
 //insert.php  
 $connect = mysqli_connect("localhost", "root", "root", "bojack");  
 $data = json_decode(file_get_contents("php://input"));  
 if(count($data) > 0)  
 {  
      $nome = mysqli_real_escape_string($connect, $data->nome);       
      $email = mysqli_real_escape_string($connect, $data->email);  
      $mensagem = mysqli_real_escape_string($connect, $data->mensagem);
      if($nome == null || $email == null || $mensagem == null){
            echo "Preencha todos os campos!";
      }else{
      $data = date("F j, Y, g:i a");
      $query = "INSERT INTO comentarios(nome, email, mensagem, data) VALUES ('$nome', '$email', '$mensagem', '$data')";  
      if(mysqli_query($connect, $query))  
      {  
           echo "Mensagem enviada com sucesso.";  
      }  
      else  
      {  
           echo 'Erro desconhecido';  
      }  
      }
 }  
 ?>  
