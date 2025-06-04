<?php
$host = $_SERVER['HTTP_HOST'] ?? $_SERVER['SERVER_NAME'] ?? 'Unknown';
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Current Host</title>
</head>
<body>
    <h1>Current Host:</h1>
    <p><?php echo htmlspecialchars($host, ENT_QUOTES, 'UTF-8'); ?></p>
</body>
</html>
