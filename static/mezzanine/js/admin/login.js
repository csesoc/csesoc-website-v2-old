jQuery(function() {
    // Fix the ``Home`` breadcrumb link non logged-in views.
    var home = jQuery('.breadcrumbs a:first');
    if (home.length == 1) {
        home.attr('href', window.__admin_url);
    }
    // Fix the submit margin on the new password form.
    if (jQuery('#id_new_password1').length == 1) {
        jQuery('input:submit').css({marginTop: '20px'});
    }
    document.getElementById('id_username').focus();
});
