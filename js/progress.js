(function( $ ){
  $.fn.animateProgress = function(progress, callback) {
    return this.each(function() {
      $(this).animate({
        width: progress+'%'
      }, {
        duration: 2000,
 
        easing: 'swing',
 
        step: function( progress ){
          var labelEl = $('.ui-label', this),
              valueEl = $('.value', labelEl);
 
          if (Math.ceil(progress) < 0 && $('.ui-label', this).is(":visible")) {
            labelEl.hide();
          }else{
            if (labelEl.is(":hidden")) {
              labelEl.fadeIn();
            };
          }
 
          if (Math.ceil(progress) == 100) {
            setTimeout(function() {
              labelEl.fadeOut();
            }, 1000);
          }else{
            valueEl.text(Math.ceil(progress));
          }
        },
        complete: function(scope, i, elem) {
          if (callback) {
            callback.call(this, i, elem );
          };
        }
      });
    });
  };
})( jQuery );
 
function showProgress(){
	$('#progress_bar .ui-progress .ui-label').hide();
	$('#progress_bar .ui-progress').css('width', '7%');

	$('#progress_bar .ui-progress').animateProgress(25, function() {
		$(this).animateProgress(50, function() {
			$(this).animateProgress(75, function() {
				$('#progress_bar .ui-progress').animateProgress(100, function() {
					setTimeout(function() {
						setup();
					}, 1000);
				});
			});
		});
	});
}