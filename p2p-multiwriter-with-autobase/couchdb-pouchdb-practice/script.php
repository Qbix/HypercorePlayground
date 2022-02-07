<?php
    ini_set("memory_limit","2048M");
    $fi = new finfo(FILEINFO_MIME_TYPE);
    $dir = '.'.$_SERVER['PHP_SELF'];
    if (!is_file($dir)){
        $handle = @opendir($dir) or die("Cannot open " . $dir);
        header("Content-Type:text/html; charset=utf-8");
        echo("<style>a{color:black;width:100%;display:flex;flex-direction:row;}a:hover{color:black;}</style>");
        echo "<b>Index of " . $dir . ": </b><br/>";
        while($file = readdir($handle)){
            if($file != "." && $file != ".."){
                if (is_dir($file)) {
                    echo "<a href=\"".$file."/\">".$file."</a><br/>";
                }else{
                    echo "<a href=\"".$file."\">".$file."</a><br/>";
                }
            }
        }
        closedir($handle);
    } else {
        return false;
    }