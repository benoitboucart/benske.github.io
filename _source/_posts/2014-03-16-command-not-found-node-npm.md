---
layout: post
disqus_comments: true
title: "Command not found"
subtitle: "with a Node Module (NPM) solution"
description:  I recently wanted to install a new NPM module (that is Gulp). I followed the getting started guide and ran the needed command but it didn't worked and I felt desperate... but I finally found the solution!
tags: [development]
cover: commandline.jpg
---

To give you a little context: I ran the following command for installing Gulp (a <i>node package module</i>) globally:
<code>npm install -g gulp</code>

The installation succeed but when I ran this command <code>gulp</code> in the command line I got a <code>"gulp: command not found"</code> error. It appeared that it installed "Gulp" in my local folder that is <code>/Users/YOURUSERNAME/node_modules</code> and not in the <b>global NPM folder</b>.

You can check this by running this command: <code>npm root</code> or <code>npm root -g</code>, which was returning my personal directory <code>/Users/YOURUSERNAME/node_modules</code> and not the expected <code>/usr/local/lib/node_modules</code>.

With some trial & error, I finally found the solution. You have to change the "<i>npm config prefix</i>" like so:
<code>npm config set prefix /usr/local</code>

Then when I re-ran <code>npm root -g</code>, I got the correct root folder:
<code>/usr/local/lib/node_modules</code>

When I reinstalled Gulp globally (with the <code>-g</code> param) it finally worked and appeared that it was now correctly installed in the global NPM folder!