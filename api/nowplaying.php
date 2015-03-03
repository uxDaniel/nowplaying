<?php
require_once('vendor/twitter-api-php/TwitterAPIExchange.php');
require_once('settings.php');

$url = 'https://api.twitter.com/1.1/search/tweets.json';
$requestMethod = 'GET';
$getfield = '?q=#nowplaying+youtube.com/watch'
//			.'&geocode=37.783333,-122.416667,50km'
			.'&result_type=recent'
			.'&count=5'
			.'&lang=en';


$twitter = new TwitterAPIExchange($settings);
$response = $twitter->setGetField($getfield)
			->buildOauth($url, $requestMethod)
			->performRequest();

echo $response;
