<?php
/**
** A base module for the following types of tags:
** 	[calculator]  # calculator
**/


/* Tag generator */
add_action( 'wpcf7_admin_init', 'CALCULATIONCF7_add_calculator_tag_generator_cf7_form', 18, 0 );
function CALCULATIONCF7_add_calculator_tag_generator_cf7_form() {
	$tag_generator = WPCF7_TagGenerator::get_instance();
	$tag_generator->add( 'calculator', __( 'calculator', 'contact-form-7' ),
		'CALCULATIONCF7_calculator_tag_generator_content',array('version'=>2)  );
}


/* Tag generator inner content */
function CALCULATIONCF7_calculator_tag_generator_content( $contact_form, $args = '' ) {
	$wpcf7_contact_form = WPCF7_ContactForm::get_current();
	$contact_form_tags = $wpcf7_contact_form->scan_form_tags();
	$calculator_args = wp_parse_args( $args, array() );
	$calculator_type = 'calculator';
	?>
	<header class="description-box">
		<h3>calculator  form tag generator</h3>
	</header> 
	<div class="control-box">
		<input type="hidden" data-tag-part="basetype" value="calculator" >
		<fieldset>
			<legend>Name</legend>
			<input type="text" data-tag-part="name" pattern="[A-Za-z][A-Za-z0-9_\-]*">
		</fieldset>
		<fieldset>
			<legend>Id</legend>
			<input type="text" data-tag-part="option" data-tag-option="id:" pattern="[A-Za-z][A-Za-z0-9_\-]*">
		</fieldset>
		<fieldset>
			<legend>Class</legend>
			<input type="text" data-tag-part="option" data-tag-option="class:" pattern="[A-Za-z0-9_\-\s]*" >
		</fieldset>
		<fieldset>
			<legend>Formulas</legend>
			<?php 
				   $calculationcf7_tag = array();
					foreach ($contact_form_tags as $contact_form_tag) {
						if ( $contact_form_tag['type'] == 'number' || $contact_form_tag['type'] == 'number*' || $contact_form_tag['type'] == 'radio' || $contact_form_tag['type'] == 'select' || $contact_form_tag['type'] == 'select*' || $contact_form_tag['type'] == 'text*' || $contact_form_tag['type'] == 'text' || $contact_form_tag['type'] == 'checkbox' || $contact_form_tag['type'] == 'checkbox*' || $contact_form_tag['type'] == 'rangeslider' || $contact_form_tag['type'] == 'rangeslider*' || $contact_form_tag['type'] == 'calculator'){
							$calculationcf7_tag[] = $contact_form_tag['name'];
						}
					} 
				?>
			<p><span><strong><u>Field Name</u></strong></span><br>	
			<?php echo esc_attr(implode(' , ', $calculationcf7_tag)); ?></p>
			<textarea rows="3"  data-tag-part="value" ></textarea> <br>
			<code>
			<?php _e( 'Ex: sqrt(number-12) % number-13', 'contact-form-7' ); ?> <br>
			<?php _e( 'Ex: radio-108 + checkbox-345 + ( number-667 + number-24 ) / 2', 'contact-form-7' ); ?> <br>
			<?php _e( 'Ex: checkbox-77 ** number-24', 'contact-form-7' ); ?>
			</code><br>
			<strong> <?php _e( 'Note:If you Add selectbox and radio button then field value add like this "$20--20" ', 'contact-form-7' ); ?> <?php echo __('This Options Is Only Avaliable In ','star-rating-for-contact-form-7');?><a href="https://www.plugin999.com/plugin/calculation-for-contact-form-7/" target="_blank">Pro Version</a> </strong>
		</fieldset>
		<fieldset>
			<legend>Hide Field</legend>
			<input type="checkbox" data-tag-part="option" data-tag-option="hide_field:" >
		</fieldset>
		<p>
			<strong class="calculationcf7_pro_msg"><?php echo __('Below Options Are Only Avaliable In ','star-rating-for-contact-form-7');?><a href="https://www.plugin999.com/plugin/calculation-for-contact-form-7/" target="_blank">Pro Version</a></strong>
		</p>
		<fieldset>
			<legend>Prefix Left</legend>
			<input type="text" data-tag-part="option" data-tag-option="prefix_left:" disabled>
		</fieldset>
		<fieldset>
			<legend>Prefix Right</legend>
			<input type="text" data-tag-part="option" data-tag-option="prefix_right:" disabled>
		</fieldset>
		<fieldset>
			<legend>Thousand separator</legend>
			<input type="text" data-tag-part="option" data-tag-option="thousand_sep:" disabled>
		</fieldset>
		<fieldset>
			<legend>Number of decimals</legend>
			<input type="number" data-tag-part="option" data-tag-option="decimal_number:" disabled>
		</fieldset>
		<fieldset>
			<legend>Decimals Separator</legend>
			<input type="text" data-tag-part="option" data-tag-option="decimal_sep:" disabled>
		</fieldset>
	</div>
	<div class="insert-box">
		<div class="flex-container">
			<input type="text" class="code" readonly="readonly" onfocus="this.select();" data-tag-part="tag">
			<div class="submitbox">
				<input type="button" class="button button-primary insert-tag" value="Insert Tag" />
			</div>
    	</div/>
		<p class="mail-tag-tip">
			<label for="<?php echo esc_attr( $args['content'] . '-mailtag' ); ?>"><?php echo sprintf( esc_html( __( "To use the value input through this field in a mail field, you need to insert the corresponding mail-tag (%s) into the field on the Mail tab.", 'calculation-for-contact-form-7' ) ), '<strong><span class="mail-tag"></span></strong>' ); ?>
		    </label>
		</p>
	</div>
	<?php
}


/* TAg calculator */
add_action( 'wpcf7_init', 'CALCULATIONCF7_add_calculator_tag_cf7_form', 10, 0 );
function CALCULATIONCF7_add_calculator_tag_cf7_form() {
	wpcf7_add_form_tag( array( 'calculator', 'calculator*' ),
		'CALCULATIONCF7_calculator_tag_handler_in_cf7_form', array( 'name-attr' => true) );
}


/* tag Handler */
function CALCULATIONCF7_calculator_tag_handler_in_cf7_form( $tag ) {
	if ( empty( $tag->name ) ) {
		return '';
	}

	$calculator_atts = array();
	
	$calculator_validation_error = wpcf7_get_validation_error( $tag->name );
	$calculator_class = wpcf7_form_controls_class( $tag->type );
	$calculator_class .= ' wpcf7-validates-as-calculator';
	$calculator_atts['id'] = $tag->get_id_option();
	$calculator_atts['class'] = $tag->get_class_option( $calculator_class );

	$calculator_atts['readonly'] = 'readonly';
	
	if ( $tag->has_option( 'readonly' ) ) {
		$calculator_atts['readonly'] = 'readonly';
	}

	$calculator_value = (string) reset( $tag->values );

	$calculator_value = $tag->get_default_option( $calculator_value );
	$calculator_value = wpcf7_get_hangover( $tag->name, $calculator_value );
	
	
	$calculator_atts['type'] = 'text';

	$calculator_atts['name'] = $tag->name;

	$calculator_atts['class'] .= " calculationcf7-total";


	$calculator_atts['value'] = 0;
	if($tag->has_option("hide_field")){
		$calculator_atts['class'] .= " calculationcf7-hide";
	}
	
	/*if(!empty($tag->get_option( 'prefix_left' )[0])){
		$calculator_atts['prefix_left'] = $tag->get_option( 'prefix_left' )[0];
	}
	if(!empty($tag->get_option( 'prefix_right' )[0])){
		$calculator_atts['prefix_right'] = $tag->get_option( 'prefix_right' )[0];
	}

	if(!empty($tag->get_option( 'thousand_sep' )[0])){
		$calculator_atts['thousand_sep'] = $tag->get_option( 'thousand_sep' )[0];
	}
	if(!empty($tag->get_option( 'decimal_number' )[0])){
		$calculator_atts['decimal_number'] = $tag->get_option( 'decimal_number' )[0];
	}
	if(!empty($tag->get_option( 'decimal_sep' )[0])){
		$calculator_atts['decimal_sep'] = $tag->get_option( 'decimal_sep' )[0];
	}*/
	

	$calculator_atts = wpcf7_format_atts( $calculator_atts );

	
	$calculator_html = sprintf(
	'<span class="wpcf7-form-control-wrap %1$s"><input %2$s %4$s />%3$s</span>',
	sanitize_html_class( $tag->name ), $calculator_atts, $calculator_validation_error, 'data-formulas="'.$calculator_value.'"' );
	return $calculator_html;
}

