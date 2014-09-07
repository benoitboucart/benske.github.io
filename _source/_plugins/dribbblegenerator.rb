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

module Jekyll
  require 'json'

  class DribbbleJSONGenerator < Generator
    safe true
    priority :low

    def generate(site)

        # # Start building the path
        # path = "_source/_data/"

        # # Add the sanitized post title to complete the path
        # #path << "/dribbble"

        # # Create the directories from the path
        # FileUtils.mkpath(path) unless File.exists?(path)

        # # Create the JSON file and inject the data
        # f = File.new("#{path}/dribbbleshots.yml", "w+")
        # #f.puts JSON.generate(JSON.parse(json))
        # #f.puts JSON.parse(json)
        # f.puts YAML::dump(JSON.parse(json))

    end

    def images
      @images = JSON.parse(json)['shots'].map { |item|
        DribbbleImage.new(item['title'], item['url'], item['image_url'], item['image_teaser_url'], item['width'], item['height'])
      }
    end

    # Get feed with username
    def json
      url     = 'http://api.dribbble.com/players/benske/shots?per_page=50&page=1'
      resp    = Net::HTTP.get_response(URI.parse(url))
      return  resp.body
    end

  end

  class DribbbleImage

    def initialize(title, url, image_url, image_teaser_url, width, height)
      @title              = title
      @url                = url
      @image_url          = image_url
      @image_teaser_url   = image_teaser_url
      @width              = width
      @height             = height
    end

    def title
      return @title
    end

    def url
      return @url
    end

    def image_url
      return @image_url
    end

    def image_teaser_url
      return @image_teaser_url
    end

    def width
      return @width
    end

    def height
      return @height
    end
  end
end