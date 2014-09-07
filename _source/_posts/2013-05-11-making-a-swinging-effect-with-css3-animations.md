---
layout: post
disqus_comments: true
title: Swinging effect
subtitle: with CSS3 animations
description: This tutorial demonstrate a nice and easy to achieve swing CSS3 hover effect. 
tags: [CSS,design]
cover: play.jpg
image_credit: "&copy; Picjumbo"
---
<a title="Little CSS3 3D hover effects" href="http://webbb.be/blog/little-css3-3d-hover-effects/" target="_blank">In a previous post</a> I've made two subtle CSS3 hover effects with CSS transitions. In this tutorial I'm using <strong>CSS3 <b>animations</b></strong> and <strong>transitions</strong> to create a "swinging" hover effect for a "follow me on Twitter" button.

<img class="alignnone size-full wp-image-331 full-item" alt="Swinging CSS3 animation hover effect" src="http://webbb.be/blog/wp-content/uploads/2013/05/swining-css3-animation-effect.jpg" />
<h2>The markup for the "flip effect"</h2>
This is the (simple) markup for the hover effect:

<em><strong>NOTE: </strong>Only the <code>.hover</code> block contains the link but you could easily convert the <code>.block </code>container to a link.</em>

{% highlight html linenos %}
<div class="block">
    <div class="normal">Follow me...</div>
    <a class="hover" title="My twitter profile" href="http://twitter.com/benoitboucart" target="_blank">on Twitter </a>
</div>
{% endhighlight %}

<h2>The CSS</h2>
The <strong>3D perspective</strong> is set on the <code>.block </code>container. This will add a little 3D effect when the block is animating. Try to remove it and see the difference: the animation around the the X-axis will not work but the <code>.hover</code> will be correctly positionned.

{% highlight css linenos %}
.block { position: relative; perspective: 350; }
{% endhighlight %}

The <code>.hover</code> block is then positioned under the <code>.normal</code> block:

{% highlight css linenos %}
.block .normal { position:relative; z-index:2; }
.block .hover { position: relative; z-index:1; margin-top:-48px; }
{% endhighlight %}

<blockquote>The perspective property defines how many pixels a 3D element is placed from the view. This property allows you to change the perspective on how 3D elements are viewed. (<a title="CSS3 perspective Property" href="http://www.w3schools.com/cssref/css3_pr_perspective.asp" target="_blank">W3Schools</a>)</blockquote>
<h3>The hover effect and CSS3 animation</h3>
When the <code>.block </code>container is hovered, the <code>.hover</code> is animated and positionned correctly under the title:

{% highlight css linenos %}
.block:hover .hover { 
    margin-top: 0; 
    transform-origin: top; 
    animation: balance 1.5s ease-in-out 110ms 1 alternate;
}
{% endhighlight %}

The animation is a simple <strong>rotation around the X-axis</strong> (with the <code>transform: rotateX(30deg)</code> property), see the <a title="CSS3 effect demo" href="http://dabblet.com/gist/5559193" target="_blank">Dabblet demo of this tutorial</a> for the complete and unprefixed CSS.

<a class="btn-style" title="CSS3 effect demo" href="http://dabblet.com/gist/5559193" target="_blank">See the result on Dabblet</a>