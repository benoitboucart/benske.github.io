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
require "instagram"

module Jekyll
  require 'json'

  class InstagramJSONGenerator < Generator
    safe true
    priority :low

    def generate(site)
        # Instagram.configure do |config|
        #   config.client_id = "159aea3909cb448ab01bc3bfe18f382d"
        #   config.client_secret = "a35bc9cc0f51409a99e6f974e89296b7"
        # end

        # userId = "287515427"
        # # Access token generated by http://www.pinceladasdaweb.com.br/
        # accessToken = "287515427.5b9e1e6.b2b4194af0094e4c8fa94307caa14ba6"


        # client = Instagram.client(:access_token => accessToken)

        # instagramOptions = {
        #   :count        => 200, 
        # }
        # instaPics = client.user_recent_media(instagramOptions)

        # # Start building the path
        # path = "_source/_data/"

        # # Add the sanitized post title to complete the path
        # #path << "/dribbble"

        # # Create the directories from the path
        # FileUtils.mkpath(path) unless File.exists?(path)

        # # Create the JSON file and inject the data
        # f = File.new("#{path}/instagrams.yml", "w+")
        # #f.puts JSON.generate(JSON.parse(json))
        # #f.puts JSON.parse(json)
        
        # f.puts YAML::dump(instaPics)
    end

  end
end