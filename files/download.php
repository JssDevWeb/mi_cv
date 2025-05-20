<?php
// Este script sirve para descargar el CV en PDF directamente
$file = 'CV_JesusGarciaMolina.pdf';
$filepath = __DIR__ . '/' . $file;

// Verificar que el archivo existe
if (file_exists($filepath)) {
    // Configurar cabeceras para descarga
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . $file . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filepath));
    
    // Leer y enviar el archivo
    readfile($filepath);
    exit;
} else {
    // Mostrar error si el archivo no existe
    header("HTTP/1.0 404 Not Found");
    echo "El archivo no fue encontrado.";
}
?>
