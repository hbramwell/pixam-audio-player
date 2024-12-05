<?php
/**
 * Plugin Name: Pixam Audio Player
 * Description: A clean, sleek, and minimal audio player block for WordPress.
 * Version: 1.0.0
 * Author: Pixam Studio
 * Author URI: https://pixamstudio.com
 * License: GPL-2.0-or-later
 * Text Domain: pixam-audio-player
 */

if (!defined('ABSPATH')) {
    exit;
}

function pixam_audio_player_block_init() {
    register_block_type(__DIR__ . '/build');
}
add_action('init', 'pixam_audio_player_block_init');

// Enqueue frontend styles
function pixam_audio_player_frontend_assets() {
    wp_enqueue_style(
        'pixam-audio-player-style',
        plugins_url('build/style-index.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'build/style-index.css')
    );
}
add_action('enqueue_block_assets', 'pixam_audio_player_frontend_assets'); 