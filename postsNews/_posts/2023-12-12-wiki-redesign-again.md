---
layout: post
title: Wiki Overhaul, Again
date: 2023-12-12 04:31 -0600
category: pages
author: papertek
description: Insert an awesome description!
---

## Welcome to an Improved Wiki

We redeisgned the wiki again to make it cooler. Including adding different kinds of posts and making things easier(?) to navigate.

Internally, we have also restructed which posts are shown and removed the articles folder/collection as I didn't think that was good approach to sort things properly. For now on we are going to rely on catagories instead of entirely new collections. I feel like this should've been done from the start but I wasn't sure on how to implement it. It was also a hassle to use Jekyll Composer as well because it would default to posts, even though I was trying to write an article. I've tried looking for documentation but no luck, so let's restructure everything and make things neater!

Code-wide, the codebase is starting to become harder to manage, I really need some contributors to cleanup and seperate some styles and turn them into components. I would do it myself, but I'm not confident on what to seperate and leave alone. There are over 1000 lines in the main Sassy CSS sheet, and that's pretty bad in my eyes (and other people too if they're sane).

Issues or oversights are still there, they may have slipped through review. A good example is clicking the search result container and it hides. But, if you click the links inside of the container it will stay visible. The intended behavior is to hide the container whenever the user clicks away from it. Of course, workarounds had to be found because even if the user were to click anything inside of the container (the buttoms), it would hide anyways.

A code snippet is provided below for you to see :)

![Jank Code Showcase](/assets/images/news/wikiOverhaul/jank.png)

I hope you like the new wiki changes! I tried to mimic other wikis and news sites and I think I did that pretty well. This has been a big learning experience personally relating to designing and implementing new stuff. I would like to thank the contributors who have given me feedback and helped me with questions and design choices. Hopefully things only get better from here!

If you're unsure what's been changed, here are some screenshots of the old and new homepage.

Before:
![Before](/assets/images/news/wikiOverhaul/oldWiki.png)

After:
![After](/assets/images/news/wikiOverhaul/newWiki.png)

Big difference right? There's still many improvements to be made but this update is a huge stepping stone on what's to come.

If you want a detailed list of changes you can view the [Pull Request](https://github.com/papertek/papertek.github.io/pull/55) here where all the commits are listed.

If you don't want to read too many commits, here's a list instead.

### List of major changes

- Added navigation sidebar
- Added breadcrumb navigation
- Added search bar and search container
- Added news posts and blog posts
- Redesigned header and footer
- Redesigned article pages
- Redesigned homepage
- Redesigned lists
- Redesigned images
- Improve content wedge/table of contents functionality
- Improved default colors and fonts (by tweaking or replacing them)
- Improved mobile layout and content wedge in mobile
- Images now get bigger when you click on them (image modals)
- A lot of code improvements (and a lot more jank added)
- Redid the folder structure of the site. Posts are now separated into postsWiki, postsNews, postsBlog, and postsInclude. More information will be given in the contribution article
- Clean up some old code
- Removed some old posts
- Removed some useless layouts
- Removed article folder and collections
- Many more minor design improvements

Thanks for reading! Stay tuned for more.
