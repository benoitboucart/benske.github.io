---
layout: post
disqus_comments: true
title: Trigger CSS
subtitle: animations on scroll
description: In this tutorial I will show you how to **trigger CSS animations** on elements when scrolling down a page. This is an easy effect to achieve with some Javascript &amp; CSS magic.
tags: [tutorial,frontend]
cover: code-2.jpg
image_credit: "&copy; Almonroth"
---
{% comment %}
cover: mouse.jpg
image_credit: "&copy; Startup Stock Photos"
{% endcomment %}

An example of this trick can be seen on the [Jeet Grid System website](http://jeet.gs/). When you scroll down, you see that CSS transform animations are triggered.

For this purpose, there are several Javascript / **jQuery plugins** available. One example of such plugin is [WOW](http://mynameismatthieu.com/WOW/). In this tutorial I’ll show how you can achieve this effect without a plugin.

## The markup
So let’s begin. First of all the markup. The <code>revealOnScroll</code> class must be added to the elements that will be animated on scroll:

{% highlight html linenos %}
<div data-animation="flipInX" data-timeout="400">...some content here...
{% endhighlight %}

The <code>data-animation</code> attribute declares the <code>animate.css</code> animation that will be used. It’s also possible to add an extra optional timeout, that could be useful when multiple elements are animated at the same position (see [the demo](http://cdpn.io/yJoqz) for an example of this).

## The Javascript & CSS animations
Then, we need to declare some variables at the top of the Javascript document (don't forget to load jQuery & Modernizr – needed to check if it's a "touch" device). I also imported animate.css for the **CSS based animations**.

{% highlight javascript linenos %}
  var $window           = $(window),
      win_height_padded = $window.height() * 1.1,
      isTouch           = Modernizr.touch;
{% endhighlight %}

Then we have to watch for the <code>scroll</code> event that will be triggered when the user is scrolling:

{% highlight javascript linenos %}
  $window.on('scroll', revealOnScroll);
{% endhighlight %}

In the <code>revealOnScroll</code> function we check if the element that must be animated is becoming visible. If so, the **animation class** is added and that will trigger the CSS animation.

{% highlight javascript linenos %}
  function revealOnScroll() {
    var scrolled = $window.scrollTop();
    $(".revealOnScroll:not(.animated)").each(function () {
      var $this     = $(this),
          offsetTop = $this.offset().top;

      if (scrolled + win_height_padded > offsetTop) {
        if ($this.data('timeout')) {
          window.setTimeout(function(){
            $this.addClass('animated ' + $this.data('animation'));
          }, parseInt($this.data('timeout'),10));
        } else {
          $this.addClass('animated ' + $this.data('animation'));
        }
      }
    });
{% endhighlight %}

Isn't that easy to achieve? There is also another check for the inverse: when the elements becomes invisible the **animation classes are removed**. This will make it possible to animate the items more then one time per request.

[View the demo](http://cdpn.io/yJoqz)
