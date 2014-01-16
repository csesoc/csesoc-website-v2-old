jQuery(document).ready(function(){
    
    /// FIELDSETS
    jQuery('fieldset[class*="collapse-closed"]').each(function() {
        jQuery(this).addClass("collapsed");
        jQuery(this).find('h2:first').addClass("collapse-toggle");
    });
    jQuery('fieldset[class*="collapse-open"]').each(function() {
        jQuery(this).find('h2:first').addClass("collapse-toggle");
    });
    jQuery('h2.collapse-toggle').bind("click", function(e){
        jQuery(this).parent().toggleClass('collapsed');
        jQuery(this).parent().toggleClass('collapse-closed');
        jQuery(this).parent().toggleClass('collapse-open');
    });
    
    /// OPEN FIELDSETS WITH ERRORS
    jQuery('fieldset[class*="collapse-closed"]').children('div[class*="errors"]').each(function(i) {
        jQuery(this).parent().toggleClass("collapsed");
        jQuery(this).parent().toggleClass('collapse-closed');
        jQuery(this).parent().toggleClass('collapse-open');
    });
    
});
