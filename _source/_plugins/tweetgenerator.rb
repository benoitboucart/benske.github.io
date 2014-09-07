# encoding: utf-8
#
# Title:
# ======
# Jekyll to JSON Generator
#
# Description:
# ============
# A plugin for generating JSON representations of your
# site content for easy use with JS MVC frameworks like Backbone.
#
# Author:
# ======
# Jezen Thomas
# jezenthomas@gmail.com
# http://jezenthomas.com
# 
require 'net/http'
require 'uri'
require 'json'
require 'yaml'
require 'twitter'

module Jekyll
  require 'json'

  class TwitterJSONGenerator < Generator
    safe true
    priority :low

    def generate(site)
        # config = {
        #   :consumer_key    => "Tbv7l4pcPGfYSE5NrQDQ",
        #   :consumer_secret => "qX8LjeqwhngnXZWEnoAxadhFrDTLTD4uGbu4C65WuA",
        #   #:bearer_token    => "ABC_BEARERTAOKEN",
        # }
        # twitterClient = Twitter::REST::Client.new(config)

        # # Start building the path
        # path = "_source/_data/"

        # # Add the sanitized post title to complete the path
        # #path << "/dribbble"

        # # Create the directories from the path
        # FileUtils.mkpath(path) unless File.exists?(path)

        # # Create the JSON file and inject the data
        # f = File.new("#{path}/tweets.yml", "w+")
        # #f.puts JSON.generate(JSON.parse(json))
        # #f.puts JSON.parse(json)
        # #twitterClient.user("benoitboucart")
        # tweetsOptions = {
        #   :count        => 200, 
        #   :include_rts  => false,
        #   :trim_user            => true,
        #   :exclude_replies      => true,
        #   :contributor_details  => false,
        # }
        # #f.puts YAML::dump(twitterClient.user_timeline('benoitboucart',tweetsOptions))
        # f.puts YAML::dump(get_all_tweets(twitterClient, "benoitboucart", tweetsOptions))

    end

    def collect_with_max_id(collection=[], max_id=nil, &block)
      response = yield(max_id)
      collection += response
      response.empty? ? collection.flatten : collect_with_max_id(collection, response.last.id - 1, &block)
    end

    def get_all_tweets(twitterClient, user, tweetOptions)
      collect_with_max_id do |max_id|
        #tweetOptions = {:count => 200, :include_rts => true}
        tweetOptions[:max_id] = max_id unless max_id.nil?
        twitterClient.user_timeline(user, tweetOptions)
      end
    end
  end
end