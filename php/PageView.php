<?php
  $con=mysql_connect(ServerIP,Username,Password);
  mysql_query("set names 'utf8'");
  if (!$con)
  {
    die("could not connect to the database:".mysql_error());
  }
  $strsql="select Count from Counter"; 
  mysql_select_db("heniping_mysql_ta52uy11",$con);
  $result=mysql_query($strsql);
  mysql_data_seek($result, 0); 
  $row=mysql_fetch_array($result);
  $visits=$row['Count']+1;
  //echo "<p>感谢您的光临，当前访问量：".$visits."</p>";
  echo "document.write(\"<p>感谢您的光临，当前访问量：\".$visits.\"</p>\");";
  mysql_query("UPDATE Counter SET Count="."'".$visits."'");
  mysql_close($con);
?>
