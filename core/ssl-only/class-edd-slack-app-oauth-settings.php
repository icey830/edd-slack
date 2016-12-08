<?php
/**
 * Adds SSL-Only Admin Settings
 *
 * @since 1.0.0
 *
 * @package EDD_Slack
 * @subpackage EDD_Slack/core/ssl-only
 */

defined( 'ABSPATH' ) || die();

class EDD_Slack_OAUTH_Settings {
    
    /**
     * @var         EDD_Slack_OAUTH_Settings $admin_notices Allows Admin Notices to be ran when possible despite our Hook
     * @since       1.0.0
     */
    private $admin_notices = array();

    /**
	 * EDD_Slack_OAUTH_Settings constructor.
	 *
	 * @since 1.0.0
	 */
    function __construct() {
        
        // Add SSL-only settings for OAUTH
        add_filter( 'edd_slack_settings', array( $this, 'add_oauth_settings' ) );
        
        // Add the OAUTH Registration Button
        add_action( 'edd_slack_oauth_register', array( $this, 'add_oauth_registration_button' ) );
        
        // Grab the OAUTH Key as part of the handshake process
        add_action( 'admin_init', array( $this, 'store_oauth_token' ) );
        
        // Delete the OAUTH Key
        add_action( 'init', array( $this, 'delete_oauth_token' ) );
        
        // Display Admin Notices
        add_action( 'admin_init', array( $this, 'display_admin_notices' ) );
        
        //add_action( 'admin_init', array( $this, 'test' ) );
        
    }
    
    public function test() {
        
        $message_url = add_query_arg(
            array(
                'as_user' => 'false',
                'channel'     => urlencode_deep( '#slack-testing' ),
                'username'    => urlencode_deep( 'Web API' ),
                'icon_emoji'  => urlencode_deep( ':spaaaaace:' ),
                'icon_url'    => '',
                'attachments' => urlencode_deep( json_encode( array(
                    array(
                        'text'    => 'text',
                        'title'   => 'title',
                        'pretext' => 'pretext',
                        'callback_id' => 'test_callback',
                        "actions" => array(
                            array(
                                "name" => "chess",
                                "text" => "Chess",
                                "type" => "button",
                                "value" => "chess"
                            ),
                            array(
                                "name" => "maze",
                                "text" => "Falken's Maze",
                                "type" => "button",
                                "value" => "maze"
                            )
                        ),
                    ),
                ) ) ),
            ),
            'chat.postMessage'
        );
        
        if ( is_user_logged_in() ) {
        
        var_dump( $message_url );
        
        $test = EDDSLACK()->slack_api->post(
            $message_url
        );
        
        var_dump( $test );
            
        }
        
    }
    
    /**
     * Add our OAUTH Settings Fields only if we have SSL
     * 
     * @param       array $settings EDD Slack Settings Fields
     *                                                 
     * @access      public
     * @since       1.0.0
     * @return      array Modified Settings Fields
     */
    public function add_oauth_settings( $settings ) {
        
        $oauth_settings = array(
            array(
                'type' => 'header',
                'name' => '<h3>' . _x( 'Enable Interactive Buttons and Slash Commands', 'SSL-Only Settings Header', EDD_Slack_ID ),
                'id' => 'edd-slack-ssl-only-header',
            ),
            array(
                'type' => 'text',
                'name' => _x( 'Client ID', 'Client ID Label', EDD_Slack_ID ),
                'id' => 'slack_app_client_id',
                'desc' => sprintf(
                    _x( 'Enter the Client ID found after %screating your Slack App%s.', 'Client ID Help Text', EDD_Slack_ID ),
                    '<a href="//api.slack.com/apps" target="_blank">',
                    '</a>'
                )
            ),
            array(
                'type' => 'text',
                'name' => _x( 'Client Secret', 'Client Secret Label', EDD_Slack_ID ),
                'id' => 'slack_app_client_secret',
                'desc' => sprintf(
                    _x( 'Enter the Client Secret found after %screating your Slack App%s.', 'Client Secret Help Text', EDD_Slack_ID ),
                    '<a href="//api.slack.com/apps" target="_blank">',
                    '</a>'
                )
            ),
            array(
                'type' => 'text',
                'name' => _x( 'Verification Token', 'Verification Token Label', EDD_Slack_ID ),
                'id' => 'slack_app_verification_token',
                'desc' => sprintf(
                    _x( 'Enter the Verification Token found after %screating your Slack App%s.', 'Verification Token Help Text', EDD_Slack_ID ),
                    '<a href="//api.slack.com/apps" target="_blank">',
                    '</a>'
                )
            ),
            array(
                'type' => 'hook',
                'id' => 'slack_oauth_register',
            ),
            array(
                'type' => 'text',
                'name' => _x( 'Default Channel for Notifications with Interactive Buttons', 'Default Channel for Notifications with Interactive Buttons Label', EDD_Slack_ID ),
                'id' => 'slack_app_channel_default',
                'desc' => _x( "Notifications with Interactive Buttons don't use the Default Webhook URL, so they need to know which Channel they should default to if one for the Notification isn't defined. If this is left blank, it will default to <code>#general</code>.", 'Default Channel for Notifications with Interactive Buttons Help Text', EDD_Slack_ID ),
                'placeholder' => '#general',
            ),
            array(
                'type' => 'text',
                'name' => _x( 'Default Icon Emoji or Image URL for Notifications with Interactive Buttons', 'Default Icon Emoji or Image URL for Notifications with Interactive Buttons Label', EDD_Slack_ID ),
                'id' => 'slack_app_icon_default',
                'desc' => _x( "Notifications with Interactive Buttons don't use the Default Webhook URL, so it can't utilize the Default Icon Emoji or Image URL you set for the Webhook URL if one for the Notification isn't defined. If this is left blank, it will use the Icon added to your Slack App if one exists.", 'Default Icon Emoji or Image URL for Notifications with Interactive Buttons Help Text', EDD_Slack_ID ),
            ),
        );
        
        $settings = array_merge( $settings, $oauth_settings );
        
        return $settings;
        
    }
    
    /**
     * Adds our Button Link to Authorize/Deauthorize the Slack App
     * 
     * @param       array $args EDD Settings API $args
     *                                           
     * @access      public
     * @since       1.0.0
     * @return      void
     */
    public function add_oauth_registration_button( $args ) {
        
        $client_id = edd_get_option( 'slack_app_client_id' );
        $client_secret = edd_get_option( 'slack_app_client_secret' );
        
        /**
         * In case Scope needs to be changed by 3rd Party Integrations
         *
         * @since 1.0.0
         */
        $scope = apply_filters( 'edd_slack_app_scope', array(
            'chat:write:bot',
            'commands',
        ) );
        
        $scope = implode( ',', $scope );
        
        $redirect_uri = urlencode_deep( admin_url( 'edit.php?post_type=download&page=edd-settings&tab=extensions&section=edd-slack-settings' ) );
        
        $oauth_token = edd_get_option( 'slack_app_oauth_token' );
        
        if ( $client_id && $client_secret ) : 

            if ( ! $oauth_token ) : ?>
            
                <a href="//slack.com/oauth/authorize?client_id=<?php echo $client_id; ?>&scope=<?php echo $scope; ?>&redirect_uri=<?php echo $redirect_uri; ?>" target="_self" class="button button-primary">
                    <?php echo _x( 'Link Slack App', 'OAUTH Register Buton Label', EDD_Slack_ID ); ?>
                </a>

            <?php else : ?>

                <input type="submit" name="edd_slack_app_deauth" class="button" value="<?php echo _x( 'Unlink Slack App', 'OAUTH Deregister Button Label', EDD_Slack_ID ); ?>"/>

            <?php endif; ?>
            
        <?php else : ?>

            <p class="description">
                <?php echo _x( 'Fill out the above fields and Save the Settings to Connect your Slack App to your site.', 'OAUTH Registration Help Text', EDD_Slack_ID ); ?>
            </p>
        
        <?php endif;
        
    }
    
    /**
     * Store the OAUTH Access Token after the Temporary Code is received
     * 
     * @access          public
     * @since           1.0.0
     * @return          void
     */
    public function store_oauth_token() {
        
        // If we need to get an OAUTH Token
        // $_GET['section'] is set properly by our redirect_uri
        if ( isset( $_GET['code'] ) && isset( $_GET['section'] ) && $_GET['section'] == 'edd-slack-settings' && ! edd_get_option( 'slack_app_oauth_token' ) ) {
            
            $client_id = edd_get_option( 'slack_app_client_id' );
            $client_secret = edd_get_option( 'slack_app_client_secret' );
        
            $redirect_uri = urlencode_deep( admin_url( 'edit.php?post_type=download&page=edd-settings&tab=extensions&section=edd-slack-settings' ) );
            
            $oauth_access_url = add_query_arg(
                array(
                    'client_id' => $client_id,
                    'client_secret' => $client_secret,
                    'code' => $_GET['code'],
                    'redirect_uri' => $redirect_uri,
                ),
                'oauth.access'
            );
            
            $oauth_request = EDDSLACK()->slack_api->post( 
                $oauth_access_url
            );
            
            if ( $oauth_request->ok == 'true' ) {
                
                $oauth_token = $oauth_request->access_token;
                EDDSLACK()->slack_api->set_oauth_token( $oauth_token );
                
                $this->admin_notices[] = array(
                    'edd-notices',
                    'edd_slack_app_auth',
                    _x( 'Slack App Linked Successfully.', 'EDD Slack App Auth Successful', EDD_Slack_ID ),
                    'updated'
                );
                
            }
            
        }
        
    }
    
    /**
     * Revoke the OAUTH Token
     * 
     * @access      public
     * @since       1.0.0
     * @return      void
     */
    public function delete_oauth_token() {
        
        // For some reason we can't hook into admin_init within a production environment. Yeah, I have no idea either
        // It only effects DELETING things from wp_options. Storing works just fine.
        if ( is_admin() ) {
        
            // If we're deauth-ing
            if ( isset( $_POST['edd_slack_app_deauth'] ) ) {

                EDDSLACK()->slack_api->revoke_oauth_token();

                $this->admin_notices[] = array(
                    'edd-notices',
                    'edd_slack_app_deauth',
                    _x( 'Slack App Unlinked Successfully.', 'EDD Slack App Deauth Successful', EDD_Slack_ID ),
                    'updated'
                );

            }
            
        }
        
    }
    
    /**
     * Sometimes we need to add Admin Notices when add_settings_error() isn't accessable yet
     * 
     * @access      public
     * @since       1.0.0
     * @return      void
     */
    public function display_admin_notices() {
            
        foreach( $this->admin_notices as $admin_notice ) {
            
            // Pass array as Function Parameters
            call_user_func_array( 'add_settings_error', $admin_notice );
            
        }
        
        // Clear out Notices
        $this->admin_notices = array();
        
    }
    
}