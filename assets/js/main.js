(function ($) {
  $('.napp-catalog > button').click(function() {
    $button = $(this);
    $article = $button.next();
    
    $article.toggle();
    $button.blur();
  });




})(jQuery);
