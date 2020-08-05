<?php
$url = 'https://docs.google.com/forms/d/e/1FAIpQLSef5y6OE-e0sa-vnNW3R5yStRFFgYQuAMtkUwuy4bZwYE_tGg/formResponse';
$data = array();
$data["entry.1624654718"] = $_REQUEST["name"];
$data["entry.1009354776"] = $_REQUEST["phone"];
$data["entry.700342896"] = $_REQUEST["email"];
$data["entry.1973638758"] = $_REQUEST["offer_name"];
$data["entry.115715108"] = $_REQUEST["subacc4"];
$data = http_build_query($data);
$options = array(
'http' => array(
'header' => "Content-type: application/x-www-form-urlencoded\r\n",
'method' => 'POST',
'content' => $data,
),
);
$context = stream_context_create($options);
$resultgd = file_get_contents($url, false, $context);
?>

<!DOCTYPE html>
<html lang="">

<head>
	<meta charset="UTF-8">
	<title>Pesanan telah diterima</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=2.0">
	<link href="thanks/subscribe.css" rel="stylesheet" type="text/css">
</head>

<body>
	<section>
		<div class="content">
			<h1 class="title">Terima kasih</h1>
			
		</div>
	</section>
	<footer>
		<div class="center">
			<p> © Kesihatan dan Kecantikan, <?php echo date('Y'); ?></p>
		</div>
	</footer>
</body>

</html>
