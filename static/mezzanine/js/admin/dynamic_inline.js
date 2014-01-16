
var selectFieldDirty = function(select, unselectedIndex) {
    return jQuery.grep(select.options, function(option) {
        return option.selected && !option.defaultSelected;
    }).length > 0 && select.selectedIndex != unselectedIndex;
};

var anyFieldsDirty = function(fields) {
    // Return true if any of the fields have been given a value
    // that isn't the default.
    return jQuery.grep(fields, function(field) {
        switch (field.type) {
            case 'select-one':
                return selectFieldDirty(field, 0);
            case 'select-multiple':
                return selectFieldDirty(field, -1);
            case 'text':
            case 'textarea':
            case 'file':
                return field.value && field.value != field.defaultValue;
            case 'checkbox':
                return field.checked != field.defaultChecked;
            case 'hidden':
                return false;
            default:
                alert('Unhandled field in dynamic_inline.js:' +
                      field.name + ':' + field.type);
                return false;
        }
    }).length > 0;
};

jQuery(function() {

    var itemSelector = window.__grappelli_installed ? '.items' : 'tbody';
    var parentSelector = '.dynamic-inline ' + itemSelector;
    var orderSelector = window.__grappelli_installed ? '._order input' : '.field-_order input';

    // Apply drag and drop to orderable inlines.
    jQuery(parentSelector).sortable({handle: '.ordering', axis: 'y', opacity: '.7',
                                placeholder: 'placeholder'});
    jQuery(parentSelector + ' .order').disableSelection();
    jQuery('.ordering').css({cursor: 'move'});

    // Set the value of the _order fields on submit.
    jQuery('input[type=submit]').click(function() {
        if (typeof tinyMCE != 'undefined') {
            tinyMCE.triggerSave();
        }
        jQuery.each(jQuery(parentSelector), function(i, parent) {
            var order = 0;
            jQuery.each(jQuery(parent).find(orderSelector), function(i, field) {
                var parent = jQuery(field).parent().parent();
                if (window.__grappelli_installed) {
                    parent = parent.parent();
                }
                if (field.value.length > 0 || anyFieldsDirty(parent.find('input, select, textarea'))) {
                    field.value = order;
                    order += 1;
                } else {
                    field.value = '';
                }
            });
        });
    });

    // Hide the exta inlines.
    jQuery(parentSelector + ' > *:not(.has_original)').hide();
    // Re-show inlines with errors, poetentially hidden by previous line.
    var errors = jQuery(parentSelector + ' ul[class=errorlist]').parent().parent();
    if (window.__grappelli_installed) {
        errors = errors.parent();
    }
    errors.show();

    // Show a new inline when the 'Add another' link is clicked.
    var addAnother = jQuery('.dynamic-inline .add-another a');
    jQuery(addAnother).click(function() {
        var button = jQuery(this);
        var getRows = function() {
            return button.parent().parent().find(itemSelector +' > *:hidden');
        };
        var rows = getRows();
        jQuery(rows[0]).show();
        // Grappelli's inline header for tabular inlines is
        // actually part of the selector, so for it we run this twice.
        if (window.__grappelli_installed && jQuery(rows[0]).hasClass('legend')) {
            jQuery(rows[1]).show();
        }
        if (getRows().length === 0) {
            jQuery(this).hide();
        }
        return false;
    });

    // Show the first hidden inline
    addAnother.click();

});
