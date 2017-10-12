/**=========================================================
 * Module: panel-perform.js
 * Dismiss panels
 * [data-perform="panel-dismiss"]
 *
 * Requires animo.js
 =========================================================*/
(function($, window, document){
  'use strict';
  
  var panelSelector = '[data-perform="panel-dismiss"]',
      removeEvent   = 'panel-remove',
      removedEvent  = 'panel-removed';

  $(document).on('click', panelSelector, function () {
    
    // find the first parent panel
    var parent = $(this).closest('.panel');

    if($.support.animation) {
      parent.animo({animation: 'bounceOut'}, removeElement);
    }
    else removeElement();

    function removeElement() {
      // Trigger the event and finally remove the element
      $.when(parent.trigger(removeEvent, [parent]))
       .done(destroyPanel);
    }

    function destroyPanel() {
      var col = parent.parent();
      parent.remove();
      
      // remove the parent if it is a row and is empty and not a sortable (portlet)
      col
        .addClass('removed')
        .trigger(removedEvent) // An event to catch when the panel has been removed from DOM
        .filter(function() {
        var el = $(this);
        return (el.is('[class*="col-"]:not(.sortable)') && el.children('*').length === 0);
      }).remove();

    }

  });

}(jQuery, window, document));