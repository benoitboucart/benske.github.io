---
layout: post
disqus_comments: true
title: Set up GIT
subtitle: and a GitHub repository
description: When you're beginning with Git, its not always simple to find your way out. That's why I created a simple and concise tutorial for beginners about how to get started with it.
tags: [development]
cover: code-2.jpg
image_credit: "&copy; Almonroth"
---

1. First of all, start with **configuring** the system on your computer or Mac. You can find a short tutorial about it on the [GitHub website](https://help.github.com/articles/set-up-git#set-up-git).
2. Making a GIT repository is simple: start with the **initialising of the Git repository** with the following command: <code>git init</code>
3. That’s it, your Git is configured, now you can **create and add files** in this repository (directory). When that’s done you can add those files to your first commit with this command: <code>git add .</code>
4. The files are now added so it’s time for your **first commit**: <code>git commit -m 'My first commit!'</code>
5. The final step is to **push** your commit remotely (can be on GitHub, BitBucket, ...): <code>git push</code>

The final step depends on the location of your repository. Please visit the [help specific for GitHub](https://help.github.com/articles/create-a-repo) or [BitBucket](https://confluence.atlassian.com/display/BITBUCKET/Set+up+Git+and+Mercurial). Your files will now be saved online and can be shared with the world!

## Other articles about Git
You can find a lot more of interesting articles and how-to's about it. I suggest a [post on StackOverflow](http://stackoverflow.com/questions/315911/git-for-beginners-the-definitive-practical-guide) that gives some nice links. [Git Immersion](http://gitimmersion.com/) is a nice tutorial for learning Git (from basic to advanced stuff). You can also find an interesting article on WebdesignersDepot with [introduction specifically for web designers](http://www.webdesignerdepot.com/2009/03/intro-to-git-for-web-designers/).