# Algolia
Algolia is used for search on the site.

Index local site:
* Create a file called _algolia_api_key and add the Algolia master key
* Use commeand ´jekyll algolia push --config ./_algolia.yml´

Index Netlify site: 
* Create and populate ENV variable ALGOLIA_API_KEY
* Create and populate ENV variable ALGOLIA_INDEX_NAME, this will override index_name in _algolia.yml
* Add ´jekyll algolia push --config ./_algolia.yml´ to build command