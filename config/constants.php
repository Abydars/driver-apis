<?php

return [
	"notification"   => [
		"host"    => "hcbox://",
		"actions" => [
			"single_passenger"     => "passenger",
			"single_job"           => "job",
			"single_passenger_job" => "passenger_job",
			"single_thread"        => "message"
		]
	],
	"timezone"       => "Australia/Melbourne",
	"HTTP_CODES"     => [
		"UNAUTHORIZED"   => 401,
		"NOT_FOUND"      => 404,
		"INTERNAL_ERROR" => 500,
		"SUCCESS"        => 200,
		"FAILED"         => 403
	],
	'google_api_key' => 'AIzaSyCYTnHv1sYw3ikSbhgU7BPccKZAT_Ook64',
	'navigations'    => [
		'administrator' => [
			[ 'label' => 'Main', 'item_type' => 'heading' ],
			[ 'label' => 'Dashboard', 'action' => 'admin/dashboard', 'item_type' => 'item' ],
			[ 'label' => 'Users', 'action' => 'admin/users', 'item_type' => 'item' ],
			[ 'label' => 'Advertisements', 'action' => 'admin/ads', 'item_type' => 'item' ],
		],
		'subscriber' => [
			[ 'label' => 'Main', 'item_type' => 'heading' ],
			[ 'label' => 'Dashboard', 'action' => 'user/dashboard', 'item_type' => 'item' ],
		]
	]
];