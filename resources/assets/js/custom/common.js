// Custom jQuery
// -----------------------------------
(function(window, document, $, undefined) {

    $(function() {
        $.ajaxPrefilter(function(options, originalOptions, xhr) { // this will run before each request
            NProgress.start();
            var token = window.custom.csrfToken;
            if (window.custom && window.custom.csrfToken) {
                return xhr.setRequestHeader('X-CSRF-TOKEN', window.custom.csrfToken); // adds directly to the XmlHttpRequest Object
            }
        });

        $(document).ajaxComplete(function(event, xhr, settings) {
            NProgress.done();
        });

        $('a[ajaxify]').on('click', function() {
            var element = this;
            var $element = $(element);
            var href = $this.attr('href');
            var target = $this.attr('target');
        });

        NProgress.start();
        window.setTimeout(function() {
            NProgress.done();
        }, 400);

        $(document).on("submit", "form", function() {
            $(this).find("input[type=submit]").attr("disabled", "disabled");
            $(this).find("button[type=submit]").attr("disabled", "disabled");

            return true;
        });

    });

})(window, document, window.jQuery);