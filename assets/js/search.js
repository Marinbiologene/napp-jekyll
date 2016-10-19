(function ($) {

  function clearSearchResults() {
    $('#napp-search-results').empty().hide();
    $('#napp-search-empty').hide();

    $('#napp-catalog article').hide();
    $('#napp-catalog').show();
  }

  function highlightedTitles(hit) {
    var title = '';
    var alt_title = '';

    if(hit._highlightResult.title && hit._highlightResult.title.matchLevel !== 'none') {
      title = hit._highlightResult.title.value;
    }

    if(hit._highlightResult.synonyms) {
      $.each(hit._highlightResult.synonyms, function(i, synonym) {
        if(synonym.matchLevel !== 'none') {
          alt_title = synonym.value;
        }
      });
    }

    if(hit._highlightResult.latin && hit._highlightResult.latin.matchLevel !== 'none') {
      alt_title = hit._highlightResult.latin.value;
    }

    return {main: title, alt: alt_title};
  }

  function searchCallback(result) {
    if (result.query !== $('#q').val()) {
      // do not take out-dated answers into account
      return;
    }

    var hitsCount = result.hits.length;
    $('#napp-search-results').empty().show();

    if (hitsCount === 0) {
      // no results
      $('#napp-search-empty .napp-search-query').html($('#q').val());
      $('#napp-search-empty').show();
      $('#napp-catalog').show();
      return;
    }

    $('#napp-search-empty').hide();
    $('#napp-catalog').hide();

    for (var i = 0; i < hitsCount; ++i) {
      var hit = result.hits[i];
      var titles = highlightedTitles(hit);

      $button = $('#napp-catalog button[data-url="' + hit.url + '"]').clone().appendTo('#napp-search-results');
      $buttonTitle =  $button.find('.napp-title');
      $article = $('#napp-catalog article[data-url="' + hit.url + '"]').clone().appendTo('#napp-search-results');

      if(titles.main) {
        $buttonTitle.html(titles.main);
      } else if(titles.alt) {
        $buttonTitle.after(' <em>' + titles.alt + '</em>');
      }

      $button.show();

      if(hitsCount === 1) {
        $button.addClass('open');
        $article.show();
      }
    }
  }

  $(document).ready(function() {

    var $inputfield = $('#q');
    var $clearButton = $('#napp-search button.napp-search-clear');
    // Replace the following values by your ApplicationID and ApiKey.
    var client = $.algolia.Client('QRAL2FHS60', '58abef0b64a591c5efda8bbe11d281cd');
    // Replace the following value by the name of the index you want to query.
    var index = client.initIndex('napp');

    $('#napp-search .napp-search-clear').click(function() {
      $inputfield.val('').trigger('keyup');
    });


    $inputfield.keyup(function() {

      if($inputfield.val()) {
        $clearButton.show();
        index.search($inputfield.val(), { hitsPerPage: 10 })
          .done(searchCallback)
          .fail(function(result) { console.log('Error', result); });
      } else {
        $clearButton.hide();
        clearSearchResults();
      }

    }).focus().closest('form').on('submit', function() {
      // on form submit, store the query string in the anchor
      location.replace('#q=' + encodeURIComponent($inputfield.val()));
      return false;
    });

    // check if there is a query in the anchor: http://example.org/#q=my+query
    if (location.hash && location.hash.indexOf('#q=') === 0) {
      var q = decodeURIComponent(location.hash.substring(3));
      $inputfield.val(q).trigger('keyup');
    }
  });

})(jQuery);
