---
layout: post
disqus_comments: true
title: CSS only off-canvas
subtitle: "menu like the Spotify app "
description: I really like the __Spotify Android App__ and his subtle off-canvas menu animation. So I wanted to recreate it in CSS only. Normally it would require Javascript to work, but thanks to the <i>:target</i> CSS pseudo selector it isn't even needed...
tags: [CSS,tutorial]
cover: code.jpg
image_credit: "&copy; PicJumbo"
---

The off-canvas layout I made for this tutorial is based on <em><a title="Off Canvas Menu with CSS :target" href="http://css-tricks.com/off-canvas-menu-with-css-target/" target="_blank">Off Canvas Menu with CSS :target</a></em>. I made some changes to this code to make it look like the <em>Spotify Android app</em>:
<ul>
    <li>A fixed header that doesn't animate</li>
    <li>A subtle animation on the items on the left and a slide animation</li>
</ul>
The core concept is based on this CSS code, pay attention to the <code>:target</code> pseudo selector  (will be triggered when you click on a link where <code>#main-nav</code> is targetted (this is SASS syntax):

{% highlight scss linenos %}
#main-nav:target {
   width: 20%;
   a { margin-left: 0; }
}
#main-nav:target ~ .page-wrap {
   width: 80%;
}
#main-nav:target ~ .main-header {
   .open-menu {
      display: none;
   }
   .close-menu {
      display: block;
  }
}
{% endhighlight %}

This link triggers the <em>:target</em> CSS selector:
{% highlight html linenos %}
<a href="#main-navigation">Menu</a>
{% endhighlight %}

<a class="btn-style" title="CSS-only off-canvas menu like the Spotify app" href="http://codepen.io/benske/pen/cxrta" target="_blank">View the demo</a>