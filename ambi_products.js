/**
 * @param {string} security_nonce
 *        Code of the Nonce. Security Stuff
 */

jQuery( document ).ready(function () {
    jQuery(".delete").hide();
    jQuery("#ambi_add_products").submit(function() {
            event.preventDefault();
            jQuery(".delete").hide();
            jQuery("#ambi_add_products").children('.message').html('');
            jQuery(".find-message").html('');
            jQuery.ajax(
                {
                    url: ajaxurl,
                    type: 'POST',
                    dataType: 'json',
                    data:
                        {
                            //the WP actions that is going to receive this
                            action: 'ajax_action_new',
                            //security stuff
                            security_nonce: security_nonce,
                            // Custom data
                            fields:jQuery("#ambi_add_products").serializeArray()
                        },
                    //timeout: 30000,
                    success: function (response) {
                        if(response.success){
                        //reload this page
                            jQuery("#ambi_add_products").children('.message').html(response.data);
                            jQuery("#ambi_add_products").children('.message').removeClass('error-message');
                            jQuery("#ambi_add_products").children('.message').addClass('success-message');
                            jQuery("#ambi_add_products")[0].reset();
                        }else{
                            jQuery("#ambi_add_products").children('.message').removeClass('success-message');
                            jQuery("#ambi_add_products").children('.message').addClass('error-message');
                            jQuery("#ambi_add_products").children('.message').html(response.data);
                        }
                    },
                    // Conection Error
                    error: function (error) {
                        console.log('Conection error: ', error);
                    }
                });
        });
    jQuery("#ambi_get_products").submit(function() {
            event.preventDefault();
            jQuery(".delete").hide();
            jQuery("#ambi_add_products").children('.message').html('');
            jQuery(".find-message").html('');
            jQuery.ajax(
                {
                    url: ajaxurl,
                    type: 'POST',
                    dataType: 'json',
                    data:
                        {
                            //the WP actions that is going to receive this
                            action: 'ajax_action_find',
                            //security stuff
                            security_nonce: security_nonce,
                            // Custom data
                            fields:jQuery("#ambi_get_products").serializeArray()
                        },
                    //timeout: 30000,
                    success: function (response) {
                       console.log(response);
                       /*SET FEILDS ACCORDINGLY*/
                       if(response.success){
                           console.log(response.data.serial);
                           jQuery("#serial").val(response.data.serial);
                           jQuery("#category").val(response.data.category);
                           jQuery("#location").val(response.data.location);
                           jQuery("#item_name").val(response.data.item_name);
                           jQuery("#long").val(response.data.long);
                           jQuery("#lat").val(response.data.lat);
                           jQuery("#availability").val(response.data.status);
                           jQuery(".delete").show();
                       }else{
                           jQuery(".find-message").html('Record could not be found');
                           jQuery(".find-message").addClass('error-message');
                       }
                    },
                    // Conection Error
                    error: function (error) {
                        console.log('Conection error: ', error);
                    }
                });
        });
});