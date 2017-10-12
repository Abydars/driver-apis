// Custom jQuery
// ----------------------------------- 


(function(window, document, $, undefined){

  $(function(){

    $(document).on('change', '[data-check-all]', function() {
      var $this = $(this),
          index= $this.index() + 1,
          checkbox = $this.find('input[type="checkbox"]'),
          table = $this.parents('table');
      // Make sure to affect only the correct checkbox column
      table.find('tbody > tr > td:nth-child('+index+') input[type="checkbox"]')
        .prop('checked', checkbox[0].checked)
        .trigger('change');

    });

  });

})(window, document, window.jQuery);

