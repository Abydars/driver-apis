window.byuGalleryEditors = [];
(function($, window, document, undefined) {
    // Create the defaults once
    var byuGalleryEditorName = 'byuGalleryEditor',
        defaults = {
            'viewer': 'view',
            'adder': 'add',
            'template': '<li class="gallery-item">' +
                '   <div class="gallery-content">' +
                '       <div class="featured-image-box featured-image-box-4x3">' +
                '           <img class="featured-image featured-image-fit-height" alt="" data-name="image">' +
                '       </div>' +
                '       <div class="gallery-action">' +
                // '           <button class="btn btn-default" data-action="show"><i class="fa fa-search"></i></button>' +
                '           <button type="button" class="btn btn-danger btn-circle" data-action="remove"><i class="fa fa-trash"></i></button>' +
                '       </div>' +
                '   </div>' +
                '</li>',
            'detailbox': 'detailbox',
            'fields': ['id', 'image']
        };

    // The actual plugin constructor
    function byuGalleryEditor(element, options) {
        this.element = element;
        this.$element = $(element);

        // jQuery has an extend method that merges the
        // contents of two or more objects, storing the
        // result in the first object. The first object
        // is generally empty because we don't want to alter
        // the default options for future instances of the plugin
        this.options = $.extend(this.$element.data(), defaults, options);

        this._defaults = defaults;
        this._name = byuGalleryEditorName;
        window.byuGalleryEditors.push(this);
        this._index = window.byuGalleryEditors.length - 1;
        this.init();
    }

    byuGalleryEditor.prototype.init = function() {
        var _this = this;
        _this.$adder = _this.$element.find('[data-role="' + _this.options.adder + '"]');
        _this.$viewer = _this.$element.find('[data-role="' + _this.options.viewer + '"]');
        _this.$viewer.sortable();

        _this.$viewer.on('click', '[data-action="remove"]', function(e) {
            var _self = this;
            var $gallery_item = _self.closest('.gallery-item');
            var index = _this.$viewer.find('.gallery-item').index($gallery_item);
            _this.$modal.find('[name="gallery_item_index"]').val(index);
            _this.$modal.modal('show');
        });

        _this.$modal = $(
            '<div class="modal fade" role="dialog" aria-labelledby="Delete Gallery Item">' +
            '   <div class="modal-dialog" role="document">' +
            '       <div class="modal-content">' +
            '           <div class="modal-header">' +
            '               <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
            '               <div class="modal-title" id="myModalLabel">Delete Gallery Item</div>' +
            '           </div>' +
            '           <div class="modal-body">' +
            '               Are you sure to delete this gallery item?' +
            '           </div>' +
            '           <div class="modal-footer">' +
            '               <input type="hidden" name="gallery_item_index">' +
            '               <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>' +
            '               <button type="button" class="btn btn-danger" data-remove="gallery-item">Delete</button>' +
            '           </div>' +
            '       </div>' +
            '   </div>' +
            '</div>'
        );
        $(document.body).append(_this.$modal);

        _this.$modal.on('click', '[data-remove="gallery-item"]', function(e) {
            //_this.$viewer.find('.gallery-item:nth-of-type(' + (index+1) + ')')
            _this.remove(_this.$modal.find('[name="gallery_item_index"]').val());
            _this.$modal.modal('hide');
        });

        _this.$adder.on('click', '[data-action="add"]', function(e) {
            var _self = this;
            localStorage.setItem('target_action', 'byuGalleryEditor');
            localStorage.setItem('target_index', _this._index);
            PopupCenter('/laravel-filemanager?type=Images', 'File Manager', 900, 600);
            return false;
        });
    };

    byuGalleryEditor.prototype.add = function(data) {
        var _this = this;
        var $gallery_item = $(_this.options.template);
        $gallery_item.data(data);
        if (typeof data.image != "undefined") {
            $gallery_image = $gallery_item.find('[data-name="image"]');
            $gallery_image.attr('src', data.image);
        }
        if (typeof data.alt != "undefined") {
            $gallery_image = $gallery_item.find('[data-name="image"]');
            $gallery_image.attr('alt', data.alt);
        }
        _this.$viewer.append($gallery_item);
    }

    byuGalleryEditor.prototype.remove = function(index) {
        $(this.$viewer.find('.gallery-item')[index]).remove();
    }

    byuGalleryEditor.prototype.serialize = function() {
        var _this = this;
        var ret = [];
        _this.$viewer.find('.gallery-item').each(function() {
            var $gallery_item = $(this);
            var data = $gallery_item.data();
            var fields = _this.options.fields;
            var item = {}
            for (var i = 0, ni = fields.length; i < ni; i++) {
                var field = fields[i];
                if (typeof data[field] !== 'undefined') {
                    item[field] = data[field];
                }
            }
            ret.push(item);
        });
        return ret;
    }

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn.byuGalleryEditor = function(options) {
        var _this = this;
        var retval = this;
        _this.each(function() {
            var plugin = $(this).data(byuGalleryEditorName);
            if (!$(this).data(byuGalleryEditorName)) {
                $(this).data(byuGalleryEditorName, new byuGalleryEditor(this, options));
            } else {
                if (typeof options === "string") {
                    retval = plugin[options].apply(plugin);
                }
            }
        });
        return retval || _this;
    }
})(jQuery, window, document);
