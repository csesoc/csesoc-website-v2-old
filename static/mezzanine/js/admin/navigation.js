jQuery(function() {
    // Empty out the breadcrumbs div and add the menu into it.
    jQuery('.breadcrumbs').html('')
                     .append(jQuery('.dropdown-menu').show())
                     .css({display: 'inline-block'});

    // Set the hrefs for the primary menu items to the href of their first
    // child (unless the primary menu item already has an href).
    jQuery('.dropdown-menu a').each(function() {
       if ( jQuery(this).attr('href') == '#' ) {
         jQuery(this).attr('href', jQuery(this).parent().find('.dropdown-menu-menu a:first').attr('href'));
       }
    });

    // Provides link to site.
    jQuery('#user-tools li:last').before('<li>' + window.__home_link + '</li>');

    // Fixes issue #594 but is incomplete, see #677

    // function contentMargin() {
    //     // Set margin on main content area so it clears all the fixed-position elements above it
    //     var clearedHeight = 21;
    //     jQuery('#content').prevAll().each(function() {
    //         clearedHeight += jQuery(this).height();
    //     });

    //     jQuery('#content').css('margin-top', clearedHeight);
    // }

    // // Check that content clears menus on both load and resize
    // contentMargin();
    // jQuery(window).resize(contentMargin);

});

// Remove extraneous ``template`` forms from inline formsets since
// Mezzanine has its own method of dynamic inlines.
jQuery(function() {
    var removeRows = {};
    jQuery.each(jQuery('*[name*=__prefix__]'), function(i, e) {
        var row = jQuery(e).parent();
        if (!row.attr('id')) {
            row.attr('id', 'remove__prefix__' + i);
        }
        removeRows[row.attr('id')] = true;
    });
    for (var rowID in removeRows) {
        jQuery('#' + rowID).remove();
    }
});
