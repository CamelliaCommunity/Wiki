---
layout: article
title:  "How to Contribute"
categories: articles
author: papertek
description: Read this to figure out how to contribute. Includes a tutorial and more!
---

## Introduction

You want to help with this site and contribute? That's awesome! Let's get started with some basics.

## Our Standards

Our standards remain the same or similar when you read the announcements section of the [Staff Guidelines]({% link staffGuidelines.md %}). To point things out, the important parts of the Staff Guidelines will be listed here and reworded for ease of use.

### Tone of Delivery

---

- Posts must be neutral to the reader. No bias should show or any favoring to specific topics. Only on rare occasions should this rule be voided.
- Grammar and styling should be consistent with previous documents. When creating or editing a copy, please check grammar with [built-in text editors](https://wordcounter.net/).
- Documents must be easy to digest and understandable for readers. Be sure to avoid any complex or abrupt sentences. If you see a problem with a document, remember "Edit This Page!" is there for you to use!
- Try to [preview](https://dillinger.io/) your documents on a local site before contributing. If you are unable to, don't worry! We will look at it for you.

### Keeping Consistency

---

- All posts are to be written in United States English. Different spellings for different words will occur, so be mindful of spelling. Terms including but not limited to are: color, center, skillful, analyze, etc.
- Documents must follow [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119). It is also encouraged to use [proper markdown](https://www.markdownguide.org/cheat-sheet/) for writing.
- Trademarks must be correctly typed, including games, media, music, etc. Examples include YouTube, Discord, etc.

## Articles and Posts

This website is using [Jekyll](https://jekyllrb.com/)! Jekyll is a static website generator. It allows for content to be displayed readily on the site. One of the most significant things Jekyll offers is Markdown. Markdown is a markup language that describes how text should appear on a page.[^1] If you need a quick overview of Markdown, please look over this [Markdown Guide](https://www.markdownguide.org/cheat-sheet/) to get the gist of it.

In theory, it should be effortless to contribute to articles and posts like the one you're looking at now. Each editable page has a link saying "Edit This Page!" meaning you could go ahead and edit the Markdown contents of the page.

!["Edit This Page!" Button](/assets/images/articleImages/contributing/edithtispage.png)

When users click "Edit This Page!", they are sent to the page's GitHub, where they can edit the Markdown contents easily.

### Articles

---

To add articles, you must create a new markdown file within the `_articles` folder. This allows the website to see the article and display it on the homepage. It must contain "front matter" to display content properly on the site.[^2] Front matter is the metadata and settings of a document. *Every article file should have the layout of `article`, and every post file should have the layout of `post`. More on posts later*.

Since this site is relatively new and a work in progress, some front-matter contents may need to be fixed. Every document's main front matter elements are *`layout, title, categories, author, and description`*. More ways to include metadata will be coming soon!

### Posts

---

To add posts, you must create a new markdown file within the `_posts` folder, but there's a catch! Posts are preferable to be created using [Jekyll::Compose](https://github.com/jekyll/jekyll-compose). To use Jekyll Compose, you must type `bundle exec jekyll post "My New Post"`. This will automatically create a post for you in the `_posts` folder. As you can see, there are a few benefits, including automatically generating the front matter for you! Once this is handled, posts will show up on the homepage, ready to be read by users.

### Linking posts to Articles

---

You could also "include" posts within articles! When a post is included in an article, it will not show up on the homepage.

To include a post within an article, you must add `include: (post name)` in the article's front matter. Once done, it will be displayed on the article pages' card, just like magic!

![Article Page with a Post attached](/assets/images/articleImages/contributing/examplepost.png)

### When to use Articles and Posts

---

While articles and posts have very similar layouts, they function differently. Articles are supposed to be used *only* when the document content is very long and there are different sections. Article layouts have features such as content wedges and IDs applied to headers. Posts are meant for smaller bits of information that usually don't have a scrollbar. This includes quick, small messages and similar. Eventually, a better way to navigate between posts and articles will be better. You are free to contribute code whenever!

## Code Contribution

When contributing, you may need to familiarize yourself with GitHub and [git](https://git-scm.com/). GitHub is made for merging and collaborating code between developers.
It helps maintain this website and allows us to add to it easily.

You could skip this section if you want to get into profound contributions such as Sassy CSS, JavaScript, and HTML.

Here are some crucial parts of the readme you must remember when contributing code.

### Do not edit CSS files

---

This project uses .scss (Sassy CSS)! Please be sure to know how SCSS works
before contributing to styles. [Install the .scss extension](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)!
You could also review how to install Sass [here](https://sass-lang.com/install/). I installed it personally by using node.js in the command line and typing `npm install -g sass`.

### Install Jekyll

---

Assuming you know how to program, install [Jekyll](https://jekyllrb.com/docs/installation/) and its prerequisites.

### Testing Locally

---

Once Jekyll is installed (and Sassy CSS, if you want to contribute to styles), open the terminal and type `bundle exec jekyll serve` to build the site on a local server. Afterward, browse to <http://localhost:4000/> to view the website locally. If you still need help, review [Jekyll Docs](https://jekyllrb.com/docs/)!

## Pull Request Tip

Congratulations that you made it this far! Now that you've understood everything *(in theory)*, it's time to create a pull request in the [GitHub](https://github.com/papertek/papertek.github.io/tree/beta)! When creating a pull request, you must [fork the respository](https://docs.github.com/en/get-started/quickstart/fork-a-repo). Please make sure you forked the beta branch instead of the main branch. If you click the "Edit This Page!" button, GitHub will show you a screen about forking the repository. This method is an easier way to create a fork and is preferred for first-time contributors.

Once the repository is forked and its contents are edited, create a pull request that merges items into the beta branch. NEVER create a pull request to merge in the main branch. If you do that, you should feel bad.

This is for contribution. Almost all articles and posts are editable for the user. If you see ways to improve documents, don't hesitate to contribute!

## References

[^1]: [What is Markdown?](https://www.knowledgehut.com/blog/web-development/what-is-markdown)

[^2]: [Front Matter](https://frontmatter.codes/docs/markdown)
