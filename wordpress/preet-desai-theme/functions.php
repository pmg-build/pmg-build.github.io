<?php
/**
 * Preet Desai recruiter theme.
 *
 * @package Preet_Desai
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'PREET_DESAI_VERSION', '1.1.0' );

/**
 * Theme setup.
 */
function preet_desai_setup() {
	load_theme_textdomain( 'preet-desai', get_template_directory() . '/languages' );

	add_theme_support( 'wp-block-styles' );
	add_theme_support( 'editor-styles' );
	add_editor_style(
		array(
			'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap',
			'assets/css/theme.css',
			'assets/css/editor.css',
		)
	);

	register_nav_menus(
		array(
			'primary' => __( 'Primary', 'preet-desai' ),
		)
	);

	register_block_style(
		'core/group',
		array(
			'name'  => 'pd-card',
			'label' => __( 'Experience card', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/group',
		array(
			'name'  => 'pd-edu-card',
			'label' => __( 'Education card', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/group',
		array(
			'name'  => 'pd-achievement',
			'label' => __( 'Achievement card', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/group',
		array(
			'name'  => 'pd-project',
			'label' => __( 'Project card', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/group',
		array(
			'name'  => 'pd-connect-card',
			'label' => __( 'Connect card', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/paragraph',
		array(
			'name'  => 'pd-kicker',
			'label' => __( 'Section kicker', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/paragraph',
		array(
			'name'  => 'pd-role-meta',
			'label' => __( 'Role meta', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/paragraph',
		array(
			'name'  => 'pd-headline',
			'label' => __( 'Hero headline', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/paragraph',
		array(
			'name'  => 'pd-skill',
			'label' => __( 'Skill chip', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/button',
		array(
			'name'  => 'pd-primary',
			'label' => __( 'Primary', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/button',
		array(
			'name'  => 'pd-secondary',
			'label' => __( 'Secondary', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/button',
		array(
			'name'  => 'pd-ghost',
			'label' => __( 'Ghost', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/button',
		array(
			'name'  => 'pd-pill',
			'label' => __( 'Pill', 'preet-desai' ),
		)
	);
	register_block_style(
		'core/button',
		array(
			'name'  => 'pd-pill-live',
			'label' => __( 'Live pill', 'preet-desai' ),
		)
	);
}
add_action( 'after_setup_theme', 'preet_desai_setup' );

/**
 * Pattern categories shown in the inserter.
 */
function preet_desai_pattern_categories() {
	register_block_pattern_category(
		'preet-desai',
		array( 'label' => __( 'Preet Desai', 'preet-desai' ) )
	);
	register_block_pattern_category(
		'preet-desai-cards',
		array( 'label' => __( 'Recruiter cards', 'preet-desai' ) )
	);
	register_block_pattern_category(
		'preet-desai-connect',
		array( 'label' => __( 'Connect & modals', 'preet-desai' ) )
	);
}
add_action( 'init', 'preet_desai_pattern_categories' );

/**
 * Front-end assets.
 */
function preet_desai_assets() {
	wp_enqueue_style(
		'preet-desai-fonts',
		'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap',
		array(),
		null
	);

	$theme_css = get_template_directory() . '/assets/css/theme.css';
	wp_enqueue_style(
		'preet-desai-theme',
		get_template_directory_uri() . '/assets/css/theme.css',
		array( 'preet-desai-fonts' ),
		file_exists( $theme_css ) ? (string) filemtime( $theme_css ) : PREET_DESAI_VERSION
	);

	$modal_js = get_template_directory() . '/assets/js/connect-modals.js';
	wp_enqueue_script(
		'preet-desai-connect-modals',
		get_template_directory_uri() . '/assets/js/connect-modals.js',
		array(),
		file_exists( $modal_js ) ? (string) filemtime( $modal_js ) : PREET_DESAI_VERSION,
		true
	);
}
add_action( 'wp_enqueue_scripts', 'preet_desai_assets' );

/**
 * Font preconnect for a faster first paint.
 */
function preet_desai_resource_hints( $urls, $relation_type ) {
	if ( 'preconnect' === $relation_type ) {
		$urls[] = array(
			'href'        => 'https://fonts.googleapis.com',
			'crossorigin' => false,
		);
		$urls[] = array(
			'href'        => 'https://fonts.gstatic.com',
			'crossorigin' => true,
		);
	}
	return $urls;
}
add_filter( 'wp_resource_hints', 'preet_desai_resource_hints', 10, 2 );

/**
 * wp-admin recruiting-ready checklist (editor-only, not shown on the public site).
 */
function preet_desai_recruiting_widget() {
	wp_add_dashboard_widget(
		'preet_desai_recruiting_ready',
		__( 'Recruiting-ready checklist', 'preet-desai' ),
		'preet_desai_recruiting_widget_render'
	);
}
add_action( 'wp_dashboard_setup', 'preet_desai_recruiting_widget' );

/**
 * Render the dashboard checklist.
 */
function preet_desai_recruiting_widget_render() {
	$front_id     = (int) get_option( 'page_on_front' );
	$show_on_front = get_option( 'show_on_front' );
	$front_status = $front_id ? get_post_status( $front_id ) : '';
	$items        = array();

	$items[] = array(
		'ok'   => true,
		'text' => __( 'Edit the public homepage in Appearance → Editor → Templates → Front Page (Save publishes the template; templates are not drafts).', 'preet-desai' ),
	);

	if ( 'page' === $show_on_front && $front_id ) {
		$items[] = array(
			'ok'   => 'publish' === $front_status,
			'text' => 'publish' === $front_status
				? __( 'Settings → Reading homepage page is Published (not Draft).', 'preet-desai' )
				: sprintf(
					/* translators: %s: post status */
					__( 'Settings → Reading homepage page is “%s”. Set it to Published so visitors never see a Draft badge.', 'preet-desai' ),
					$front_status ? $front_status : 'missing'
				),
		);
	} else {
		$items[] = array(
			'ok'   => true,
			'text' => __( 'Homepage is the Front Page template (no separate Draft page assigned).', 'preet-desai' ),
		);
	}

	$items[] = array(
		'ok'   => true,
		'text' => __( 'About stack is name / role / school (CMU Heinz MSISPM) plus Cyber · Risk · GRC.', 'preet-desai' ),
	);
	$items[] = array(
		'ok'   => true,
		'text' => __( 'Replace the Resume button URL with a Media Library PDF when you have one. Applications use https://preet-desai.me only.', 'preet-desai' ),
	);
	$items[] = array(
		'ok'   => true,
		'text' => __( 'Replace headshot, achievement, and project images (Media → Replace).', 'preet-desai' ),
	);
	$items[] = array(
		'ok'   => true,
		'text' => __( 'Check Work featured cards and each Contact modal URL.', 'preet-desai' ),
	);
	$items[] = array(
		'ok'   => true,
		'text' => __( 'What Preet does: wordpress/SOP-EDITING.md (student-portfolio checklist).', 'preet-desai' ),
	);

	echo '<ul style="margin:0;padding-left:1.2rem;">';
	foreach ( $items as $item ) {
		$mark = $item['ok'] ? '✓' : '!';
		echo '<li style="margin:0 0 0.55rem;"><strong>' . esc_html( $mark ) . '</strong> ' . esc_html( $item['text'] ) . '</li>';
	}
	echo '</ul>';
}
