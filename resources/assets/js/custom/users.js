// User Settings
// -----------------------------------


(function(window, document, $, undefined) {

    $(function() {

        // User Settings
        $("#app-settings input[name='theme']").on('change', function() {
            var $this = $(this);
            $.ajax({
                url: window.custom.url + 'dashboard/user_setting',
                type: 'POST',
                data: {
                    'theme': $this.val()
                }
            });
        });

        $("#app-settings input[type='checkbox']").on('change', function() {
            var $this = $(this);
            var data = {};
            data[$this.attr('name')] = $this.prop('checked') ? 1 : 0;
            $.ajax({
                url: window.custom.url + 'profile/setting',
                type: 'POST',
                data: data
            });
        });

        setTimeout(function() {
            adjustEqualRows();
        }, 1000);
        $(window).resize(adjustEqualRows);
        function adjustEqualRows() {
            $(".row-equal-height").each(function() {
                $row = $(this);
                $row.children("div").children("div").css("min-height", "0");
                if($row.children("div").length > 0) {
                    var height = $row.children("div").first().height();
                    $row.children("div").each(function() {
                        if($(this).height() > height) {
                            height = $(this).height();
                        }
                    });
                    $row.children("div").children("div").css("min-height", height);
                }
            });
        }

    });
})(window, document, window.jQuery);
