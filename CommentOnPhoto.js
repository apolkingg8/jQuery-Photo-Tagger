

(function(){

    $.widget('custom.COP', {

        // set default option value
        options: {
            hintText: 'Comment on this photo...',
            btnSubmitText: 'Post',
            btnCancelText: 'Cancel',

            userName: {
                canEdit: false,
                name: 'NoName',
                hint: 'Somebody'
            },

            renderComments: {
                onInit: true,
                afterPost: true
            },

            renderData: {}
        },

        // stat format
        _stat: {
            copid: '',
            draggableBox: {
                top: '',
                left: '',
                chooseBox: {
                    width: '',
                    height: ''
                },
                commentBox: {
                    commentUser: '',
                    commentText: ''
                }
            },
            image: {
                src: '',
                name: '',
                ID: '',
                dataObj: ''
            }
        },

        _$wrapper: {},

        // refresh comments
        refreshComments: function(renderData, copid){

            renderData = this._parseRenderData(renderData);

            if(copid){
                var temp = [];

                for(var i = 0; i < renderData.length; i += 1){
                    if(renderData[i].copid === copid){
                        temp.push(renderData[i]);
                    }
                }
                if(temp.length > 0){
                    $('.cop_wrapper').filter('[data-copid="' + copid + '"]')
                        .find('.cop_comments').remove();
                    this._renderComments(temp);
                    console.log(temp);
                }
            }else{
                $('.cop_comments').remove();
                this._renderComments(renderData);
            }
        },

        _parseRenderData: function(renderData){
            // handel input
            if(typeof renderData === "object" && !renderData.length){
                // is single obj & not array
                renderData = [renderData];
            } else if(typeof renderData === "string" && renderData != ''){
                // is string & not empty
                renderData = JSON.parse(renderData);
            } else if(!renderData.length){
                // not array
                renderData = [];
            }
            return renderData;
        },

        // renderData must be JSON String, Object Array or Single Object
        _renderComments: function(renderData){

            var renderCommentTemplate = function(renderDataIndex){
                var data = renderData[renderDataIndex];
                var commentTemplate = [
                    '<div class="cop_comments cop_hide"',
                    'style="top:', data.draggableBox.top,
                    ';left:', data.draggableBox.left, ';">',
                    '<div class="cop_comments_chooseBox"',
                    'style="width:', data.draggableBox.chooseBox.width,
                    ';height:', data.draggableBox.chooseBox.height, ';">',
                    '',
                    '</div>',
                    '<div class="cop_comments_arrow cop_hide"></div>',
                    '<div class="cop_comments_commentBox cop_hide">',
                    '<div class="cop_comments_commentUser">',
                    data.draggableBox.commentBox.commentUser + ' : ',
                    '</div>',
                    '<div class="cop_comments_commentText">',
                    data.draggableBox.commentBox.commentText,
                    '</div>',
                    '</div>',
                    '</div>'
                ];
                var temp = '';

                for(var i = 0; i < commentTemplate.length; i += 1){
                    temp += commentTemplate[i];
                }

                return temp;
            };

            renderData = this._parseRenderData(renderData);

            for(var i = 0; i < renderData.length; i += 1){
                // find img with copid
                var $image = $('img[data-copid="' + renderData[i].copid + '"]');

                // if img exist
                if($image.length > 0){
                    // copid is not unique value
                    $image.each(function(){
                        var $wrapper = $(this).parents('.cop_wrapper'),
                            $imageBox = $wrapper.find('.cop_imageBox');

                        $imageBox.append(renderCommentTemplate(i));
                    });
                }
            }

            this._bindCommentEvents();
        },

        // bind all comment events
        _bindCommentEvents: function(){
            $('.cop_comments').find('.cop_comments_chooseBox').hover(
                function(){
                    $(this).css('border-color', '#000000');
                    $(this).parent().find('.cop_comments_arrow').removeClass('cop_hide');
                    $(this).parent().find('.cop_comments_commentBox').removeClass('cop_hide');
                }, function(){
                    $(this).css('border-color', '#a1a1a1');
                    $(this).parent().find('.cop_comments_arrow').addClass('cop_hide');
                    $(this).parent().find('.cop_comments_commentBox').addClass('cop_hide');
                }
            );
        },

        // replace img to cop wrapper
        _replaceDOM: function(){
            var options = this.options;
            var renderWrapper = function($img){
                var template = [
                    '<div class="cop_wrapper" data-copid="', $img.children().data('copid'), '">',
                        '<div class="cop_head cop_hide">',
                            '<span class="cop_hintText">' + options.hintText + '</span>',
                        '</div>',
                        '<div class="cop_imageBox">',
                            '<div class="cop_draggableBox cop_hide">',
                                '<div class="cop_chooseBox"></div>',
                                '<div class="cop_commentBox">',
                                    options.userName.canEdit
                                        ? '<input type="text" class="cop_userName" value="'+ options.userName.hint + '">'
                                        : options.userName.name + ' : ',
                                    '<textarea class="cop_textArea"></textarea>',
                                    '<div>',
                                        '<input type="button" value="' + options.btnSubmitText + '" class="ui-button cop_btnOk"> ',
                                        '<input type="button" value="' + options.btnCancelText + '" class="ui-button cop_btnCancel"> ',
                                    '</div>',
                                '</div>',
                            '</div>',
                            $img.html(),
                        '</div>',
                    '</div>'
                ];

                var html = '';

                for(var i = 0; i < template.length; i += 1){
                    html += template[i];
                }

                return html;
            };
            var $wrapper = $(renderWrapper($('<div>').append($(this.element).clone())));

            this.element.replaceWith($wrapper);
            this._$wrapper = $wrapper;

            return $wrapper;
        },

        // bind wrapper events
        _bindEvents: function(){
            var that = this;

            // bind events
            var $wrapper = this._$wrapper,
                $head = $wrapper.children('.cop_head'),
                $draggableBox = $wrapper.find('.cop_draggableBox'),
                $chooseBox = $draggableBox.find('.cop_chooseBox'),
                $commentBox = $draggableBox.find('.cop_commentBox'),
                $image = $wrapper.find('img');

            // showHide head
            $wrapper.mouseover(function(){
                if($draggableBox.hasClass('cop_hide')){
                    $head.removeClass('cop_hide');
                    $wrapper.find('.cop_comments').removeClass('cop_hide');
                }
            }).mouseout(function(){
                $head.addClass('cop_hide');
                $wrapper.find('.cop_comments').addClass('cop_hide');
            });

            // showHide draggable box
            $head.click(function(){
                $draggableBox.removeClass('cop_hide');
                $head.addClass('cop_hide');
            });

            // draggable & resizeable
            $draggableBox.draggable({
                containment: $wrapper
            });
            $chooseBox.resizable({
                containment: $wrapper
            });

            // btn OK
            $commentBox.find('.cop_btnOk').click(function(){

                // set stat
                that._stat = {
                    copid: $image.data('copid'),
                    draggableBox: {
                        top: $draggableBox.css('top'),
                        left: $draggableBox.css('left'),
                        chooseBox: {
                            width: $chooseBox.css('width'),
                            height: $chooseBox.css('height')
                        },
                        commentBox: {
                            commentUser: that.options.userName.canEdit
                                ? $commentBox.find('.cop_userName').val()
                                : that.options.userName.name,
                            commentText: $commentBox.find('.cop_textArea').val()
                        }
                    },
                    image: {
                        src: $image.attr('src'),
                        name: $image.name,
                        ID: $image.attr('ID'),
                        dataObj: $image.data()
                    }
                };

                // callback
                that._trigger('callback', null, that._stat);

                // render single comment
                if(this.options.renderComments.onInit){
                    that._renderComments(that._stat);
                }

                $draggableBox.addClass('cop_hide');
            });

            // btn Cancel
            $commentBox.find('.cop_btnCancel').click(function(){
                $draggableBox.addClass('cop_hide');
            });
        },

        _create: function(){

            this._replaceDOM();

            this._bindEvents();

            if(this.options.renderComments.onInit){
                this._renderComments(this.options.renderData);
            }
        }
    });

})();