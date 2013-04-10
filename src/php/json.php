<?php

	//include the core file
	require_once('libs/phpFlickr.php');

	// include the config file
	require_once('config.php');

	// Fire up the phpFlickr class
	$f = new phpFlickr($key);

	// phpFlickr needs a cache folder
	// in this case we have a writable folder on the root of our site, with permissions set to 777
	$f->enableCache("fs", "../cache");

	//returns an array
	$result = $f->people_findByUsername($username);

	// grab our unique user id from the $result array
	$nsid = $result["id"];

	$photos = $f->people_getPublicPhotos($nsid, NULL, NULL, 20);

	$total = $photos[photos][total]; // returns how many photos there are in total

	$list = array();

	foreach ($photos['photos']['photo'] as $photo) {

		array_push($list, array(
				'photoid' => $photo[id],
				'phototitle' => $photo[title],
				'thumb' => $f->buildPhotoURL($photo, "largesquare"),
				'original' => $f->buildPhotoURL($photo, "large")
			)
		);

	} 

	echo json_encode($list, JSON_FORCE_OBJECT);
?>