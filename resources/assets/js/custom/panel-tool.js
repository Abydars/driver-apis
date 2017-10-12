/**=========================================================
 * Module: panel-tools.js
 * Fill panels
 * [data-tool="panel-fill"]
 =========================================================*/
(function($, window, document) {
    'use strict';

    var panelSelector = '[data-tool="panel-fill"]',
        removeEvent = 'panel.remove',
        removedEvent = 'panel.removed';

    $(document).on('click', panelSelector, function() {

        // find the first parent panel
        var $parent = $(this).closest('.panel');
        $parent.find('[data-fill-origin]').each(function() {
            var $fillElement = $(this);
            var fillOriginElement = $fillElement.data('fill-origin');
            var $fillOriginElement = $(fillOriginElement);
            if ($fillOriginElement.is(':radio') || $fillOriginElement.is(':checkbox')) {
                $fillElement.prop('checked', $fillOriginElement.prop('checked'));
            } else {
                $fillElement.val($fillOriginElement.val());
            }
        });
    });
}(jQuery, window, document));
