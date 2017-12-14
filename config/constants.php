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
		[ 'label' => 'Main', 'item_type' => 'heading' ],
		[ 'label' => 'Dashboard', 'action' => 'admin/dashboard', 'icon' => 'icon-speedometer', 'item_type' => 'item' ],
		[
			'label'     => 'Users',
			'icon'      => 'icon-people',
			'item_type' => 'group',
			'action'    => 'users',
			'children'  => [
				[ 'label' => 'Users', 'action' => 'admin/user', 'item_type' => 'item' ],
			]
		],
		/*
		[ 'label' => 'Content Management', 'item_type' => 'heading' ],
		[ 'label' => 'Posts', 'action' => 'admin/post', 'icon' => 'icon-pin', 'item_type' => 'item' ],
		[ 'label' => 'Circles', 'action' => 'admin/org', 'icon' => 'icon-globe', 'item_type' => 'item' ],
		[
			'label'     => 'Events',
			'icon'      => 'icon-notebook',
			'item_type' => 'group',
			'action'    => 'events',
			'children'  => [
				[ 'label' => 'System Events', 'action' => 'admin/event/system', 'item_type' => 'item' ],
				[ 'label' => 'User Events', 'action' => 'admin/event', 'item_type' => 'item' ],
			]
		]
		*/
	]
];