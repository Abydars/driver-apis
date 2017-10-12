(function(window, document, $, undefined) {

    $(function() {
        $('#mailbox-inbox, #mailbox-starred, #mailbox-sent, #mailbox-draft, #mailbox-trash').on('click', '.pagination a', function(event) {
            var $this = $(this);
            var url = $this.attr('href');
            // NProgress.start();
            $.ajax({
                url: url,
                success: function(data) {
                    $this.closest('section').html(data);
                    // NProgress.done();
                }
            });
            event.preventDefault();
        });

        var pages = ['mailbox-inbox', 'mailbox-starred', 'mailbox-sent', 'mailbox-draft', 'mailbox-trash'];
        for (var i = 0, ni = pages.length; i < ni; i++) {
            var page = pages[i]
            window.app.page(page, function() {
                var $this = $(this);
                var url = $this.attr('src');
                if ($this.data('loaded')) {
                    $.ajax({
                        url: url,
                        success: function(data) {
                            $this.html(data);
                        }
                    });
                }
                $this.data('loaded', true);
            });
        }

        $(document).on('change', '#mailbox-select-all', function() {
            var $this = $(this);
            var checked = $this.prop('checked');

        });
    });
})(window, document, window.jQuery);
