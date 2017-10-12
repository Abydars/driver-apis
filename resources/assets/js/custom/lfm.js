(function($) {

    $.fn.filemanager = function(type) {
        type = type || 'image';

        if (type === 'image' || type === 'images') {
            type = 'Images';
        } else {
            type = 'Files';
        }

        this.on('click', function(e) {
            localStorage.setItem('target_action', 'preview');
            localStorage.setItem('target_input', $(this).data('input'));
            localStorage.setItem('target_preview', $(this).data('preview'));
            PopupCenter('/laravel-filemanager?type=' + type, 'File Manager', 900, 600);
            return false;
        });
    }

})(jQuery);

function PopupCenter(url, title, w, h) {
    // Fixes dual-screen position                         Most browsers      Firefox
    if (w > window.innerWidth - 30) {
        w = window.innerWidth - 30;
    }

    if (h > window.innerHeight - 30) {
        h = window.innerHeight - 30;
    }

    var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
    var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

    var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    var left = ((width / 2) - (w / 2)) + dualScreenLeft;
    var top = ((height / 2) - (h / 2)) + dualScreenTop;
    var newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

    // Puts focus on the newWindow
    if (window.focus) {
        newWindow.focus();
    }
}

function SetUrl(url) {
    //set the value of the desired input to image url
    var target_action = localStorage.getItem('target_action');
    if (target_action == 'preview') {
        var $target_input = $('#' + localStorage.getItem('target_input'));

        if ($target_input.length > 0) {
            $target_input.val(url).trigger('change');
        }

        var $target_preview = $('#' + localStorage.getItem('target_preview'));
        //set or change the preview image src
        if ($target_preview.length > 0) {
            if ($target_preview.prop('tagName').toLowerCase() == 'img') {
                $target_preview.attr('src', url);
            } else {
                $target_preview.css({
                    'background-image': 'url("' + url + '")'
                });
            }
        }
    } else if (target_action == 'byuGalleryEditor') {
        var target_gallery_index = localStorage.getItem('target_index');
        console.log(target_gallery_index);
        var gallery = window.byuGalleryEditors[target_gallery_index];
        gallery.add({
            image: url
        });
    }

}
