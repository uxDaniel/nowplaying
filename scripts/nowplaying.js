// @title:	#nowPlaying Tweets jQuery plugin
// @author:	Daniel Garcia
// @date:	2015/03/03

// jQuery plugin structure based on jquery-boilerplate

(function ( $, window, document, undefined ) {
    var pluginName = "nowPlaying";

    function Plugin ( element, url ) {
        this.element = element;
        this.url = url;
        this.json = {};
        this._name = pluginName;
        this.init();
    }

    $.extend(Plugin.prototype, {
        init: function init() {
            var plugin = this;

            $.getJSON(this.url, function(json){
                plugin.json = json;
                plugin.drawTweets();
                plugin.renderVideos();
                plugin.setTitles();
            });
        },

        drawTweets: function drawGallery() {
            var $element = $(this.element),
                html = '',
                tweets = this.json.statuses;
            
            for (var i = 0; i < tweets.length; i++) {
                html += this.drawTweet(tweets[i]);
            }



            // Insert html into the element
            $element.html(html);
        },
        
        drawTweet: function drawTweet(tweet) {
            var videoId = this.getYoutubeId(tweet.entities.urls[0].expanded_url),
                html =  '<article class="panel panel-primary tweet">' +
                            '<header class="panel-heading">' +
                                '<h2 class="panel-title"></h2>' +
                            '</header>' +
                            '<section class="panel-body">' +
                                '<figure class="col-xs-12 col-sm-5">' +
                                    '<div class="lazyYT" data-youtube-id="' + videoId + '" data-ratio="4:3"></div>' +
                                '</figure>' +
                                '<div class="col-xs-12 col-sm-7">' +
                                    '<div class="row header">' +
                                        '<div class="col-xs-9">' +
                                            '<a class="btn btn-link" target="_blank" href="http://twitter.com/' + tweet.user.screen_name + '">' +
                                                '<img src="' + tweet.user.profile_image_url + '" class="img-circle pull-left avatar">' +
                                                '<h3>' + tweet.user.name + '</h3>' +
                                                '<h4>@' + tweet.user.screen_name + '</h4>' +
                                            '</a>' +
                                        '</div>' +
                                        '<div class="col-xs-3 text-right">' +
                                            '<a class="btn btn-twitter btn-xs pull"><i class="fa fa-twitter"></i> Follow</a>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="row body">' +
                                        '<div class="col-xs-12">' +
                                            '<p>' + tweet.text + '</p>' +
                                        '</div>' +
                                    '</div>' +
                                    '<div class="row footer">' +
                                        '<div class="col-xs-4">' +
                                            '<a class="btn btn-xs btn-link text-muted">' + tweet.created_at + '</a>' +
                                        '</div>' +
                                        '<div class="col-xs-8 text-right">' +
                                            '<a class="btn btn-xs btn-link"><i class="fa fa-reply"></i> Reply</a>' +
                                            '<a class="btn btn-xs btn-link"><i class="fa fa-retweet"></i> Retweet</a>' +
                                            '<a class="btn btn-xs btn-link"><i class="fa fa-star"></i> Favorite</a>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                            '</section>' +
                        '</article>';
            return html;

        },
        
        renderVideos: function renderVideos() {
            $('.lazyYT').lazyYT();
        },
        
        setTitles: function setTitles(){
            // Not clean, I know :(
            setTimeout( function() {  
                $('.html5-title-text').each(function(index, element) {
                    var $element = $(element);
                    $element.parents('article')
                        .find('h2')
                        .text($element.text())
                });
            }, 500);
        },
        
        getYoutubeId: function youtube_parser(url){
            // Source: http://stackoverflow.com/a/9102270
            var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
            var match = url.match(regExp);
            if (match && match[2].length == 11) {
                return match[2];
            }
        }
    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[ pluginName ] = function ( options ) {
        this.each(function() {
            if ( !$.data( this, "plugin_" + pluginName ) ) {
                $.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
            }
        });

        // chain jQuery functions
        return this;
    };

})( jQuery, window, document );