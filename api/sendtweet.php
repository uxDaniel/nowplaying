<?php
require_once('vendor/twitter-api-php/TwitterAPIExchange.php');
require_once('settings.php');


$video_url = $_POST["url"];
$comment = $_POST["comment"];

$url = 'https://api.twitter.com/1.1/statuses/update.json';
$requestMethod = 'POST';
$postfields = array(
	'status' => $comment
				. ' #NowPlaying '
				. $video_url
);

/** Perform a POST request and echo the response **/
$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($postfields)
             ->performRequest();
