<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;

class ElementHelper
{
	public function navbar( $array )
	{
		$navigations       = isset( $array['navigations'] ) ? $array['navigations'] : [];
		$active_navigation = isset( $array['active_navigation'] ) ? $array['active_navigation'] : false;
		$user              = isset( $array['user'] ) ? $array['user'] : false;
		$id                = isset( $array['id'] ) ? $array['id'] : 'navbar';
		echo "\n<ul class='nav' id='{$id}'>";
		foreach ( $navigations as $navigation ) {
			$this->navbar_item( $id, $navigation, $active_navigation );
		}
		echo "\n</ul>";
	}

	private function navbar_item( $id, $navigation, &$active_navigation )
	{
		$html_start;
		$html_content = '';
		$html_end;
		$action    = isset( $navigation['action'] ) ? $navigation['action'] : false;
		$item_type = $navigation['item_type'];

		switch ( $item_type ) {
			case 'heading':
				$html_start = "\n<li class='nav-heading'>";
				$html_end   = '';
				break;
			case 'group':
				$html_start = "\n<li><a href='#{$id}_{$action}' data-toggle='collapse'>";
				$html_end   = '</a>';
				break;
			default:
				$url        = url( $action );
				$html_start = ( $active_navigation && $active_navigation['action'] == $action ) ? "<li class='active'><a href='{$url}'>" : "<li><a href='{$url}'>";
				$html_end   = '</a>';
				break;
		}

		if ( isset( $navigation['icon'] ) ) {
			$html_content .= "\n<em class='{$navigation['icon']}'></em>";
		}
		$html_content .= "\n<span>{$navigation['label']}</span>";
		echo "{$html_start}{$html_content}{$html_end}";

		if ( isset( $navigation['children'] ) ) {
			echo "\n<ul id='{$id}_{$action}' class='nav sidebar-subnav collapse'>";
			$child_navigations = $navigation['children'];
			foreach ( $child_navigations as $child_navigation ) {
				$this->navbar_item( $id, $child_navigation, $active_navigation );
			}
			echo "\n</ul>";
		}
		echo "\n</li>";
	}
}