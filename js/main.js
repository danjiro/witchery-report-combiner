"use strict";

$(function() {


    $('.combine').on('click', function() {
        let $html = $($('.html').val()),
            $maps = $($('.maps').val()),
            $output = $('.output');
        $html.each(function(i,el) {
            let imgName;
            if ($(this).find('[usemap]').attr('usemap')) {
                imgName = $(this).find('[usemap]').attr('usemap') + '.jpg';
            }
            else if ($(this).attr('usemap')) {
                imgName = $(this).attr('usemap') + '.jpg';
            }
            else { imgName = false; }
            // let imgName = $(this).find('[usemap]').attr('usemap') ? 
            //               $(this).find('[usemap]').attr('usemap') + '.jpg' :
            //               false; console.log($(this), imgName);

            if (imgName) {
                let $mapsObject = $('<div/>').html($maps),
                    usemap = $mapsObject.children('img[src*="' + imgName + '"]');
                    if(usemap.length > 0) {
                        usemap = usemap.attr('usemap').replace(/#/g, '');
                        var $map = $mapsObject.children('map[name="' + usemap + '"]');
                        $map.attr({
                            name: imgName.replace(/.jpg/,''),
                            id: imgName.replace(/.jpg/,'')
                        });
                        $(this).children('img').eq(0).after($map[0].outerHTML);
                        let final = $(this)[0].outerHTML.replace(/(?:\r\n|\r|\n)/g, '') + '\n';
                        $output.append(final);
                    }
                    else {
                        let final = $(this)[0].outerHTML.replace(/(?:\r\n|\r|\n)/g, '') + '\n';
                        $output.append(final);
                    }           
            }
        });

        $output.html($output.html().replace(/\</g, '&lt;').replace(/\"/g, "\'"));
        Prism.highlightAll();        
    })


    $('pre.copytoclipboard').each(function () {
        let $this = $(this),
        $button = $('<button>Copy</button>');
        $this.wrap('<div/>').removeClass('copytoclipboard');
        let $wrapper = $this.parent();
        $wrapper.addClass('copytoclipboard-wrapper').css({position: 'relative'})
        $button.css({position: 'absolute', top: 0, right: 0}).appendTo($wrapper).addClass('copytoclipboard btn btn-default btn-xs');
        /* */
        var copyCode = new Clipboard('button.copytoclipboard', {
            target: function (trigger) {
                return trigger.previousElementSibling;
            }
        });
        copyCode.on('success', function (event) {
            event.clearSelection();
            event.trigger.textContent = 'Copied';
            window.setTimeout(function () {
                event.trigger.textContent = 'Copy';
            }, 2000);
        });
        copyCode.on('error', function (event) {
            event.trigger.textContent = 'Press "Ctrl + C" to copy';
            window.setTimeout(function () {
                event.trigger.textContent = 'Copy';
            }, 2000);
        });
    });
  
})
