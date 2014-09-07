---
layout: post
disqus_comments: true
title: Updating to SASS 3.3 
subtitle: "+ make it work with Compass"
description: I had a bug when trying to update SASS to its latest version (3.3) and make it compatible with the latest Compass version (a prerelease). Here is the solution.
tags: [CSS,frontend]
cover: compass.jpg
image_credit: "&copy; josuemei72 Pixabay"
---

When I read the article <a href="http://alwaystwisted.com/post.php?s=2014-02-27-even-easier-bem-ing-with-sass-33" title="Even Easier BEM-ing with Sass 3.3">"Even Easier BEM-ing with Sass 3.3"</a>, I really wanted to try out the new Sass release. This new "@-root" alternative syntax made it perfect for BEMming your CSS. But it didn't worked with Compass...<!--more-->

First of all I updated my sass gem like so:
<code>sudo gem update sass</code>

This updated sass to the latest stable release (<i>Sass 3.3.3 (Maptastic Maple)</i>).

But when I wrote down this kind of Sass:
<code>.block { &__element { } &--modifier { } }</code>

It returned annoying errors like those:
<code>Error on line number: 2. Invalid CSS after " #{": expected expression (e.g. 1px, bold), was "&}__element {"/</code>
or <code>Syntax error: Invalid css after bem __ expected "{"</code>

The reason of this was that I used not the latest reelase (Compass 1.0.0.alpha.19 or higher) of Compass. So when I ran following command:
<code>gem install compass --pre</code>

... it finally worked.