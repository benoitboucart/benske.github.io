---
layout: post
disqus_comments: true
title: How to use Jekyll
subtitle: with Gulp
description: I finally gave **Jekyll**, a static website generator, a try. In this article you'll read some of my impressions and how I combined it with **Gulp**. This blog is the result of testing both technologies.
tags: [frontend]
cover: jekyll.jpg
image_credit: This image is available from the United States Library of Congress's Prints and Photographs division under the <a href="http://loc.gov/pictures/resource/cph.3g08267/">digital ID cph 3g08267</a>.
---

This blog is built with **Jekyll**, a static site generator. That means that raw HTML files are generated and so no database is required like for a WordPress blog. That gives your website a considerable performance boost. 

One of the other advantages of using _Jekyll_ is that you can write your posts in your favorite text editor and then push your changes via GIT for deployment.

{% comment %}
    {% gist 8387126 %} 
{% endcomment %}

Before developping my new blog with Jekyll, I started with the HTML / CSS / Javascript slicing of [my design](https://dribbble.com/shots/1527973-Personal-blog-redesign "Blog design on Dribbble"). I used **Sass with Compass** in combination with Gulp. 

> For more information about Gulp and how it works, I recommend [this article](http://www.smashingmagazine.com/2014/06/11/building-with-gulp/ "Article about Gulp JS").

I made different **Gulp tasks**, one for CSS, another for Javascript and finally one for Jekyll and HTML.

##  The CSS task
I used this task for converting the SASS files and minify the generated CSS:

{% highlight javascript linenos %}
gulp.task('compass', function() {
    gulp.src(srcStylesheets + '*.scss')
        .pipe(compass({
            css     : distStylesheets,
            sass    : srcStylesheets,
            image   : distImages,
            logging : true
        }))
            .on('error', function(err) {
                console.log(err);
            })
        .pipe(minifyCSS())
        .pipe(gulp.dest(distStylesheets))
        .pipe(browserSync.reload({stream:true}));
});
{% endhighlight %}

The last "Gulp pipe" will reload the browser window when the CSS has been generated. The magic behind this is **browserSync**. This plugin will reload **all your devices**, no matter if its a desktop, tablet or smartphone.

>BrowserSync makes your workflow faster by synchronising URLs, interactions and code changes across **multiple devices**. It’s wicked-fast and totally free. 

You can read more about BrowserSync and how to install it [on the blog of its developer](http://shakyshane.com/gulpjs-sass-browsersync-ftw/ "Gulp - Sass - Browsersync ftw").

##  The Javascript task
The Javascript Gulp task is similar to the CSS task:
{% highlight javascript linenos %}
gulp.task('js', function () {
    gulp.src([srcJavascripts + 'plugins.js', srcJavascripts + 'main.js'])
        .pipe(concat(pkg.name + '.js'))
        .pipe(gulp.dest(distJavascripts))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest(distJavascripts))
        .pipe(browserSync.reload({stream:true, once: true}));
});
{% endhighlight %}

This task will combine &amp; minify all the Javascript files and reload the open browser(s) when a Javascript file changed.

##  The HTML & Jekyll task
And now the most interesting part: the HTML & Jekyll tasks. The HTML task will be triggered **after Jekyll's task** to minify the generated HTML files:

{% highlight javascript linenos %}
gulp.task('html', ['jekyll'], function() {
    gulp.src([path.join(deploy, '*.html'),path.join(deploy, '*/*/*/*.html')]/*'*.html'*/)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(deploy))
        .pipe(browserSync.reload({stream:true, once: true}));
});
{% endhighlight %}

The *"Jekyll"* task is based on [multiple](http://stackoverflow.com/questions/21856861/running-jekyll-as-a-child-process-in-gulp-node) [StackOverflow](http://stackoverflow.com/questions/21293999/use-jekyll-with-gulp) [answers](http://stackoverflow.com/questions/23185448/managing-gulp-dependencies-when-spawning-child-processes). It will run the <code>build</code> command of Jekyll.

{% highlight javascript linenos %}
gulp.task('jekyll', function (gulpCallBack){
    var spawn = require('child_process').spawn;
    var jekyll = spawn('jekyll', ['build'], {stdio: 'inherit'});

    jekyll.on('exit', function(code) {
        gulpCallBack(code === 0 ? null : 'ERROR: Jekyll process exited with code: '+code);
    });
});
{% endhighlight %}

## Conclusion
Now I can update my blog and see the updates on all my connected devices immediately with one single "gulp" command. No need to worry about SASS compiling or Jekyll builds. Isn't that easy?

Do you have suggestions on how I could improve those tasks? Your feedback is very welcome in the comment section below!