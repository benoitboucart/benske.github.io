---
layout: post
disqus_comments: true
title: Little CSS3 3D
subtitle: hover effects
description: With <strong>CSS3 transitions</strong> you can create some nice and subtle hover effects without too much effort. 
tags: [tutorial,design,CSS]
---
In this little tutorial I'll show how to make two 3D hover transitions like those on <a title="my portfolio" href="http://webbb.be" target="_blank">my portfolio</a>.

## [1] CSS3 Social Media icons 3D rotation
The first example is a <strong>CSS3 3D rotation</strong> of a Social Media icon. This is the markup:

{% highlight html linenos %}
<ul class="sm">
    <li>
        <a href="https://twitter.com/benoitboucart" target="_blank">
            <span>Twitter</span>
        </a>
    </li>
</ul>
{% endhighlight %}

And I created this sprite:

<img src="http://webbb.be/themes/webbb/images/sm3d.png" alt="3D sprite" />

As you can see, for each social media I created 2 icons. The second one will be rotated 90° via CSS, so the icon image must be rotated 90°.

The link has the <code>transform-style: preserve-3d;</code> property set for the 3D effect.

{% highlight css linenos %}
.sm a {
   background: url(images/sm3d.png) no-repeat #2e8198; 
   background-position: 0 0;
   height: 27px; width: 27px; 
   display: inline-block; 
   transform: perspective(1000);
   transform-style: preserve-3d; 
   transition: all 400ms ease;
}
{% endhighlight %}

The hover style is even simpler! The <code>background-position</code> is changed and the image is rotated.

{% highlight css linenos %}
.sm a:hover {
   background-position: 0 -27px;
   transform: rotate(-90deg);
}
{% endhighlight %}

<a class="btn-style" title="CSS3 3D Hover effects [1]" href="http://dabblet.com/gist/5231260" target="_blank">View the first demo</a>

## [2] Simple CSS3 3D hover (text) effect
The second example is 100% text, an example can be seen at the bottom of this article. This is the markup for the hover effect:

{% highlight html linenos %}
<a href="#"><span data-content="Hello world!">Hello world!</span></a>
{% endhighlight %}

Pay some special attention to the <code>data-content</code> attribute. This is required because it will be showed on hover, via CSS.

{% highlight css linenos %}
.bizarlink {
  color: #000; text-decoration: none; background: white;
  font-size: .9em; font-family: Arial;
  display: inline-block; overflow: hidden; vertical-align: top; 
  perspective: 600px; 
  perspective-origin: 50% 50%;
}
.bizarlink span {
  display: block; position: relative; padding: 1.5em 3em;
  transition: all 400ms ease;
  transform-origin: 50% 0%;
  transform-style: preserve-3d;
}
.bizarlink:hover {color: #fff; }
.bizarlink:hover span {
  background: #000 color: white;
  transform: translate3d( 0px, 0px, -30px ) rotateX( 90deg );
}
.bizarlink span:after {
    content: attr(data-content);
    display: inline-block;position: absolute; left: 0; top: 0; right:0; bottom: 0;
    padding: 1.5em 3em;
    color: #fff; background: #000; 
    transform-origin: 50% 0%;
    transform: translate3d( 0px, 105%, 0px ) rotateX( -90deg );
 }
{% endhighlight %}

<a class="btn-style" title="CSS3 3D Hover effects [1]" href="http://dabblet.com/gist/5231289" target="_blank">View the second demo</a>
<h2>[3] <a title="Making a balancing effect with CSS3 animations" href="http://webbb.be/blog/making-a-balancing-effect-with-css3-animations/">3D hover effect with CSS3 animations</a></h2>