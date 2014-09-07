---
layout: post
disqus_comments: true
title: Use Google Maps
subtitle: with AngularJS
description: In this tutorial I'll describe how to combine the famous AngularJS framework with the Google Maps API.
tags: [frontend]
cover: map.jpg
image_credit: "&copy; cocoparisienne Pixabay"
---

The community behind AngularJS is fantastic. When you're facing a problem the chance is high that you'll find a solution on the web. Sometimes you'll even find a proper _Angular directive_. And that was the case when I was looking for combining AngularJS with Google Maps.

There are multiple libraries that integrates the Google Maps API with AngularJS. Some are:

- [**Google Maps for AngularJS**](http://angular-google-maps.org "Google Maps for Angular") makes the integration of more advanced features of the Google Maps API (v3) possible. The [demo](http://angular-google-maps.org/demo) shows what's possible with this collection of directives.
- [**Angular UI Maps**](https://github.com/angular-ui/ui-map) is another set of directives that has less advanced possibilities then _Google Maps for AngularJS_ but enough for a basic usage of the Google Maps API. 

For the purpose of this simple demo, I'll use the second library. This one is sufficient for what we need for this demo: display a Google Map based on a text location.

First of all you'll have to load the Google Maps API. This can be done by adding this script at the bottom of your HTML file (before the closing <code>&lt;body&gt;</code> tag).

{% highlight html linenos %}
<script type="text/javascript" src="bower_components/angular/angular.js"></script>
<script type="text/javascript" src="bower_components/angular-ui-utils/modules/event/event.js"></script>
<script type="text/javascript" src="bower_components/angular-ui-map/src/map.js"></script>
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=onGoogleReady"></script>
{% endhighlight %}

You can also [load the API aynchronously](https://developers.google.com/maps/documentation/javascript/examples/map-simple-async "Load the Google Maps API asynchronously") if you want, but then make sure to compile the Angular templates with Maps UI directives in it **after** the Google Maps API has been loaded.

Read more on how to install _Angular UI Maps_ on the [GitHub repository](https://github.com/angular-ui/ui-map), and try to display a hardcoded Google Map with this plugin. 

##  Geocode an address
If you have an address (user input), you'll have to "geocode" this string to have the GPS coordinates of the given location (longitude & latitude). You can do this easily via Javascript with the Geocodor Google Maps API.
{% highlight javascript linenos %}
var geocoder = new google.maps.Geocoder();
geocoder.geocode( { "address": $scope.textfield }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK && results.length > 0) {
        var location = results[0].geometry.location;
        $scope.myMap.panTo(location);
    }
});
{% endhighlight %}

The above code will geocode the address that the user has filled in (<code>$scope.textfield</code>) and will then pan to the geocoded location (<code>$scope.myMap.panTo(location)</code>).

(see this [pen on CodePen.io](http://codepen.io/benske/pen/iAgpq "Google Maps Geocode API example") for a working example)

