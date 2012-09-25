(function ($){
    var drag = {
	target: null,
	hanlde: null,
	x: 0,
	y: 0,
	state: false,
	zindex: 0,
    };

    var delta = {
	x: 0,
	y: 0,
    }

    var zindex = 10;

    function mousedown(e){
	var off = {x: e.offsetX, y: e.offsetY};
	var target = $(e.target);

	if(!target.hasClass('resize-handle')) return;
	drag.handle = target;

	target = target.parent();
	    drag.state = true;
	    drag.target = target;
	    drag.target.addClass('resizing-active')
	    drag.x = e.pageX;
	    drag.y = e.pageY;

	    drag.target.css('z-index', zindex++);

	    e.preventDefault();
//	}
    }

    function updatePos(source, target){

	    var off = source.offset();
	    off.left += source.width()-5;
	    off.top += source.height()-5;

//	    var target = $('<div class="resize-handle"></div>');
//	    source.append(target);
	    target.css('position', 'relative');
//	    target.css('position', 'absolute');
	    target.width(10).height(10).offset(off);

    }

    $(window).on('mouseup', function(e){
	if(drag.state){
	    $('body').css('cursor', 'default');
	    drag.state = false;
	    drag.target.removeClass('resizing-active')

	    var dropAction = drag.target.data('dropAction');
	    dropAction && dropAction();

	}
    });

    $(window).on('mousemove', function(e){
	var target = $(e.target);


	if(target.hasClass('resize-handle'))
	    $('body').css('cursor', 'se-resize');
	else
	    $('body').css('cursor', 'default');


	if(drag.state){
	    $('body').css('cursor', 'se-resize');
	    delta.x = e.pageX - drag.x;
	    delta.y = e.pageY - drag.y;

	    var w = drag.target.width();
	    var h = drag.target.height();

	    var off = drag.target.offset();


	    var threshold = 20;
	    if(w+delta.x > threshold && drag.x > off.left + w)
		drag.target.width(w+delta.x);
	    if(h+delta.y > threshold  && drag.y > off.top + h)
		drag.target.height(h+delta.y);

	    updatePos(drag.target, drag.handle);

	    drag.x = e.pageX;
	    drag.y = e.pageY;
	}
    });


    $.fn.resizable = function(){

	return this.each(function(){

	    var $this = $(this).addClass('resizable');
	    $this.css('z-index', zindex++);

	    $this.on('mousedown', mousedown);

	    var off = $this.offset();
	    off.left += $this.width()-5;
	    off.top += $this.height()-5;

	    var handle_div = $('<div class="resize-handle"></div>');
	    handle_div.css('background-color', 'gray');
	    $this.append(handle_div);
	    handle_div.css('position', 'relative');
//	    handle_div.css('position', 'absolute');
	    handle_div.width(10).height(10).offset(off);

	});
    };


})( jQuery );
