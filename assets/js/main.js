(function ($) {
  $(".list-group").on("click", ">button", function(){
    $button = $(this);
    $article = $button.next();
    
    $article.toggle();
    $button.toggleClass('open');
    $button.blur();
  });

})(jQuery);
