---
layout: post
disqus_comments: true
title: Light Social 
subtitle: buttons with WordPress
description: I integrated SocialCount social media buttons in this WordPress blog. The main advantage of this <em>jQuery plugin</em> is that you can add <strong>social buttons</strong> without slowing down the page load (for Facebook, Twitter, and Google Plus) because they are lazy loaded.
tags: [development,tutorial]
cover: code-2.jpg
image_credit: "&copy; Almonroth"
---
First of all let's download the <a title="SocialCount Github" href="https://github.com/filamentgroup/SocialCount/tree/master/src" target="_blank">SocialCount package on GitHub</a>. The files that are needed for this tutorial are:

<ul>
  <li><em><span style="line-height: 13px;">socialcount.js</span></em></li>
  <li><em>socialcount-icons.css (or .scss) and the icon directories</em>: this file gives a neat styling with <em>social media</em> icons. It can easily be overriden.</li>
  <li>the <strong>"service"</strong> directory: this directory is optional but recommended: it will show the number of shares of the current page under the icons (like on this blog).</li>
</ul>
<h2>Adding the markup for the social buttons</h2>
Now let's add the markup needed by the plugin for displaying the social buttons. This markup has to be added in your <strong>WordPress template</strong>. In my case I only want to show the buttons under the blog articles so I edited the <em>content-single.php</em> <strong></strong>file of my template (can be another filename depending of your template!).

{% highlight html linenos %}
<ul data-url="YOUR_CUSTOM_URL" data-counts="true" data-share-text="SHARE_TEXT_HERE">
 <li><a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_CUSTOM_URL" title="Share on Facebook"><span></span><span>Like</span></a></li>
 <li><a href="https://twitter.com/intent/tweet?text=YOUR_CUSTOM_URL" title="Share on Twitter"><span></span><span>Tweet</span></a></li>
 <li><a href="https://plus.google.com/share?url=YOUR_CUSTOM_URL" title="Share on Google Plus"><span></span><span>+1</span></a></li>
</ul>
{% endhighlight %}

The <code>data-counts</code> attribute is set to <em>true</em> if you want to show the number of shares (therefore the "service" directory of the SocialCount plugin is needed). Be sure, if you set <code>data-counts</code> to <em>true </em>that the <em>service </em>directory is correctly located. If it does not work you can always change the "<em>serviceURL</em>" setting in the <em>socialcount.js </em>file to meet your needs.<em></em>

As you can see, the <code>data-url</code> property of the <code>&lt;ul&gt;</code>-tag has to be updated to the current URL, in this case to the URL of the current blogpost. Update the tag with this to do so:

{% highlight php linenos %}
data-url="<?php urlencode(the_permalink()); ?>"
{% endhighlight %}

<code>the_permalink()</code> displays the URL to the current post. Just what we needed.

The <code>data-share-text</code> attribute is similar:
{% highlight php linenos %}
data-share-text="<?php urlencode(the_title()); ?> - <?php urlencode(the_permalink()); ?>"
{% endhighlight %}

<blockquote><strong>NOTE: </strong>Be aware that it isn't the best solution to add this markup directly in the template file.<em> </em>A better solution would be to make a <em>WordPress</em> plugin for it. However this tutorial should give you a quick overview of how to use this plugin in combination with WordPress.</blockquote>