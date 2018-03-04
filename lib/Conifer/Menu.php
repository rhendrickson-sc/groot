<?php
/**
 * Custom Menu class extending TimberMenu.
 */

// TODO move to Conifer\Menu
namespace Conifer;

use Timber\Menu as TimberMenu;

/**
 * Custom Menu class to add special nav behavior on top of
 * TimberMenu instances.
 *
 * @package Conifer
 */
class Menu extends TimberMenu {
	/**
	 * When instantiating MenuItems that belong to this Menu, create instances of this class.
	 * @var string
	 */
	public $MenuItemClass = '\Conifer\MenuItem';

	/**
	 * When instantiating posts associated with MenuItems, create instances of this class.
	 * @var string
	 */
	public $PostClass = '\Conifer\Post\Post';

	/**
	 * Get the top-level nav item that points, or whose ancestor points,
	 * to the current post
	 * @return Conifer\MenuItem the current top-level MenuItem
	 */
	public function get_current_top_level_item() {
		foreach( $this->get_items as $item ) {
			if( $item->points_to_current_post_or_ancestor() ) {
				return $item;
			}
		}
	}
}

?>

