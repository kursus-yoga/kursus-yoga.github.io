<?php
$url = 'https://docs.google.com/forms/d/e/1FAIpQLSfXwcsoAbHz7kc3m_4N_O480K6qetd2CPMeQinUDeXAjlSVVg/formResponse';
$data = array();
$data["entry.1102089951"] = $_REQUEST["offer_name"];
$data["entry.1163908712"] = $_REQUEST["name"];
$data["entry.956515346"] = $_REQUEST["phone"];
$data["entry.656299866"] = $_REQUEST["subacc"];
$data["entry.1784881458"] = $_REQUEST["subacc4"];
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

<?php

$pixel = $_POST['px'];



?>

<!DOCTYPE html>
<html lang="">

<head>
	    <!-- Start Facebook Pixel Code -->
      <img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=<?php echo $pixel ;?>&ev=Lead&noscript=1"/>
		<!-- End Facebook Pixel Code -->
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
	<title>Pesanan telah diterima</title>
	<link rel="stylesheet" href="thanks/success.css">
	<link href="https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&subset=cyrillic,cyrillic-ext" rel="stylesheet">
</head>

<body data-invalid-email-text="ไม่ถูกต้อง E-mail">
	<header>
		<div class="shadow-wraper">
			<div class="wraper-header wraper">
				<div class="left-header">
                    <p class="thanks"><img src="thanks/yes.png" alt="" class="yes"><span class="user-name">Kejayaan!</span> </p>
					<p class="after-thanks">
						<span class="line">Pesanan dicipta.</span>
						<span class="line">Kami akan menghubungi anda untuk menjadualkan penghantaran</span>
					</p>
				</div>
				<div class="right-header info-order-container" style="display: none;">
					<p class="info-order">
					</p>
					
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</header>
	<div class="main-content">
		<div class="main-content-wraper wraper">
			<p class="main-title">ADAKAH ANDA INGIN MENDAPATKAN LEBIH BANYAK?
			</p>

			<form method="post" action="subscribe.php" class="x_subscribe_form">
      <p class="form-title">- Jadilah orang pertama yang mempelajari tentang inovasi revolusi</p>
      <p class="form-title">- Menerima bonus yang tidak dijangka dan hadiah mahal</p>
        
        <input type="email" placeholder="e-meil" name="email" class="x_client_email" required>
        
				<button type="submit">MENDAPAT</button>
				<div class="clear"></div>


        <input type='hidden' name="offer_name" value="<? echo $_POST['offer_name']; ?>">
        <input type='hidden' name="phone" value="<? echo $_POST['phone']; ?>">
        <input type='hidden' name="name" value="<? echo $_POST['name']; ?>">
        <input type='hidden' name="subacc4" value="<? echo $_POST['subacc4']; ?>">
       
		</form>

			<p class="after-form-text">Tiada spam dan boleh membatalkan berita pada bila-bila masa</p>
		</div>
	</div>
	<div class="footer">
		<div class="wraper-footer">
			<p> © Kesihatan dan Kecantikan, <?php echo date('Y'); ?></p>
		</div>
	</div>

</body>

</html>
