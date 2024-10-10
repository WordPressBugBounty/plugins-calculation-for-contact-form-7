<?php
/**
* Plugin Name: Calculation for contact form 7
* Description: This plugin allows calculation for contact form 7.
* Version: 1.0
* Copyright: 2023
* Text Domain: calculation-for-contact-form-7
* Domain Path: /languages 
*/


/* define absolutepath*/
if (!defined('ABSPATH')) {
   	die('-1');
}

/* define plugin base name */
define('CALCULATIONCF7_BASE_NAME', plugin_basename(__FILE__));

/* define  plugin file name   */
define('CALCULATIONCF7_PLUGIN_FILE', __FILE__);

 /* define  plugin diretorypath  name   */
define('CALCULATIONCF7_PLUGIN_DIR',plugins_url('', __FILE__));


/* all Included file  */
include_once('main/backend/calculationcf7-calculator.php');
include_once('main/resources/calculationcf7-installation-require.php');     
include_once('main/resources/calculationcf7-load-js-css.php');     
include_once('main/resources/calculationcf7-language.php');     

function CALCULATIONCF7P_support_and_rating_links( $links_array, $plugin_file_name, $plugin_data, $status ) {
    if ($plugin_file_name !== plugin_basename(__FILE__)) {
      return $links_array;
    }

    $links_array[] = '<a href="https://www.plugin999.com/support/">'. __('Support', 'calculation-for-contact-form-7') .'</a>';
    $links_array[] = '<a href="https://wordpress.org/support/plugin/calculation-for-contact-form-7/reviews/?filter=5">'. __('Rate the plugin ★★★★★', 'calculation-for-contact-form-7') .'</a>';

    return $links_array;

}
add_filter( 'plugin_row_meta', 'CALCULATIONCF7P_support_and_rating_links', 10, 4 );

add_action('init','remove_cf7_enum_rule_functioncallback');
function remove_cf7_enum_rule_functioncallback(){
	/* remove enum validation for contact form 7 select field */
	remove_action( 'wpcf7_swv_create_schema', 'wpcf7_swv_add_select_enum_rules', 20, 2 );
	/* remove enum validation for contact form 7 checkbox-radio field */
	remove_action( 'wpcf7_swv_create_schema', 'wpcf7_swv_add_checkbox_enum_rules', 20, 2 );
}