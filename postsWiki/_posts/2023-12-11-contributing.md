---
layout: article
title: Contributing
date: 2023-12-11 06:12 -0600
category: pages
author: papertek
description: Read this to figure out how to contribute. Includes directions,
  guidelines, and more!
include: Incomplete Pages
---

## Our Standards

You want to help with this site and contribute? That's awesome! Let's get started with some basics.

Our standards remain the same or similar when you read the announcements section of the [Staff Guidelines]({% link staffGuidelines.md %}). To point things out, the important parts of the Staff Guidelines will be listed here and adjusted for ease of use.

### Tone of Delivery

- Posts must be neutral to the reader. No bias should show or any favoring to specific topics. Only on rare occasions should this rule be voided.
- Grammar and styling should be consistent with previous documents. When creating or editing a copy, please check grammar with [built-in text editors](https://wordcounter.net/).
- Documents must be easy to digest and understandable for readers. Be sure to avoid any complex or abrupt sentences. If you see a problem with a document, remember "Edit This Page!" is there for you to use!

### Keeping Consistency

- All posts are to be written in United States English. Different spellings for different words will occur, so be mindful of spelling. Terms including but not limited to are: color, center, skillful, analyze, etc.
- Documents must follow [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119). It is also encouraged to use [proper markdown](https://www.markdownguide.org/cheat-sheet/) for writing.
- Trademarks must be correctly typed, including games, media, music, etc. Examples include YouTube, Discord, etc.

## Articles and Posts

This website is using [Jekyll](https://jekyllrb.com/)! Jekyll is a static website generator. It allows for content to be displayed readily on the site. One of the most significant things Jekyll offers is Markdown. Markdown is a markup language that describes how text should appear on a page.[^1] If you need a quick overview of Markdown, please look over this [Markdown Guide](https://www.markdownguide.org/cheat-sheet/) to get the gist of it.

In theory, it should be effortless to contribute to articles and posts like the one you're looking at now. Each editable page has a link saying "Edit This Page!" meaning you could go ahead and edit the Markdown contents of the page.

!["Edit This Page!" Button](/assets/images/articleImages/contributing/edithtispage.png)

When users click "Edit This Page!", they are sent to the website's Content Management System (CMS), where they can edit the Markdown contents easily. Users who found their way into the CMS must also login using [GitHub](https://github.com/). GitHub will allow the user to create Pull Requests, commits, and more! Everything is done automatically in the CMS, so the average person only needs to worry about writing standards.

### Creating Documents

> This is for people not using the CMS and are wishing to dig into the files/codebase.
{: .disclaimer }

Documents are prefered to be created using [Jekyll::Compose](https://github.com/jekyll/jekyll-compose). To use Jekyll Compose, you must type `bundle exec jekyll post "My New Post"`. This will automatically create a document for you in the `_posts` folder. Once this is handled, documents must be moved to their respective folder in ordered to be displayed correctly. There are a few benefits to this, including automatically generating the front matter for you!

### Displaying Documents

It's required to create a document within a dedicated folder. The main folders are `postsBlog`, `postsNews`, `postsWiki`, `postsInclude`.

> Documents in `postsBlog`, `postsNews`, and `postsWiki` will display in the homepage clearly. Documents in `postsInclude` will be displayed as an "included post" under a specified wiki post. More on that later.
{: .tip }

Each document must contain "front matter" to display content properly on the site.[^2] Front matter is the metadata and settings of a document. Every document should have the layouts of `article` or `post`. Articles display the Table of Contents wedge to the left while posts do not have a Table of Contents wedge.

Every document's main front matter elements are `layout, title, date, category, author, and description`. An example for this is shown below.

```md
---
layout: article
title: Camellia
date: 2023-12-10 13:35 -0600
category: pages
author: JoshuaGreatXD
description: The one and only Camellia! Here, you can find information about Camellia's background and accomplishments.
---
```

### Linking Wiki Posts and Included Posts

When a document is included in a Wiki Post, it will not show up on the homepage clearly. Instead, it will be shown under the Wiki Post as shown below. This is known as an *Included Post*.

![Wiki Post with an Included Post Attached](/assets/images/articleImages/contributing/includedpoststuff.png)

To add an *Included Post* within a *Wiki Post*, you must add `include: (Included Post Title)` in the Wiki Posts's front matter. Once done, it will be displayed in the wiki posts' card, just like magic!

Markdown example of using `include` in the front matter.

```md
---
layout: article
title: Song Use
date: 2024-01-09 00:43 -0600
category: pages
author: shiosama
description: Camellia's Music Usage Guidelines. Where you can find information about how and when to use his music!
include: Song Use (Official)
---
```

### When to use different Layouts

While the *Article* and *Post* layouts are similar, they function differently. Articles are supposed to be used *only* when the document content is very long and there are different sections. Article layouts have features such as content wedges and IDs applied to headers.

Posts are meant for smaller bits of information that usually don't have a scrollbar. This includes quick, small messages, news posts, and blog posts.

## Styles

> Custom classes and styles could still be applied in the CMS editor. Though, the editor will not display them correctly due to limitations we haven't solved yet. Keep this in mind!
{: .disclaimer }

While this site has markdown support, it also has a extended version of markdown called [kramdown](https://kramdown.gettalong.org/index.html). Kramdown is a library for parsing and converting superset of Markdown.[^3]  Essentially, kramdown is the same as markdown but expanded.

Kramdown offers adding classes for CSS or IDs to specific parts of a document. Examples will be listed below.

### Codeblocks

If you're familar with Discord's markdown then you should reconize this.

```md
\```ruby
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')

# => prints 'Hi, Tom' to STDOUT
\```
```

By removing the backslashes and specifying the programming language, it would be correctly displayed as a code block. To review more on this, visit the kramdown cheat sheet [here](https://kramdown.gettalong.org/quickref.html).

### Blockquotes

Blockquotes are preferred to be only used in articles, they function as a way to give a "heads up" to the reader. Examples for default blockquotes and styles will be listed below.

> This is a default blockquote.

> This is a disclaimer blockquote.
{: .disclaimer }

> This is a caution blockquote.
{: .caution }

> This is a tip blockquote.
{: .tip }

To use blockquotes, you must type a > before a sentence. To apply different attributes (classes), you must type the attribute and class name \{: (class/ID name)\}.

To give you an example of what blockquotes should look like in markdown, it will be listed below.

```md
> This is a default blockquote

> This is a disclaimer blockquote.
{: .disclaimer }

> This is a caution blockquote.
{: .caution }

> This is a tip blockquote.
{: .tip }
```

To learn more about blockquotes, please visit the kramdown cheat sheet [here](https://kramdown.gettalong.org/quickref.html).

## Code Contribution

When contributing, you may need to familiarize yourself with [GitHub](https://github.com/) and [git](https://git-scm.com/). GitHub is made for merging and collaborating code between developers.
It helps maintain this website and allows us to add to it easily.

You could skip this section if you want to get into profound contributions such as Sassy CSS, JavaScript, and HTML.

Here are some crucial parts of the readme you must remember when contributing code.

### You must install Jekyll

To install Jekyll, please refer to the [Jekyll Installation](https://jekyllrb.com/docs/installation/) page.

### Please never edit the CSS files

Because this project uses Sass (Sassy CSS), it will automatically convert your styling to the proper CSS files.
Please be sure to [install the .scss extension](https://marketplace.visualstudio.com/items?itemName=glenn2223.live-sass)!
To learn how to use Sass [here](https://sass-lang.com/install/).
To install Sass with [NodeJS](https://nodejs.org/en), please run: `npm install -g sass`.

### Testing Locally

If you want to test locally, please follow these steps:

1. Install [Git](https://www.git-scm.com/downloads) and [Jekyll](https://jekyllrb.com/docs/installation/) (if you are contributing to styling, install [Sass](https://sass-lang.com/install/))
2. Open your terminal of choice
3. Clone the repo with `git clone https://github.com/CamelliaCommunity/Wiki`
4. Go inside the newly created folder with the clone
5. Run `bundle install` to install the gems required
6. Run `bundle exec jekyll serve` to run the local server
7. Enter the URL it provides (like <http://localhost:4000/>) in your browser to view your local copy
Please refer to the [Jekyll Docs](https://jekyllrb.com/docs/) if you are still unsure!

## Pull Request Tip

Congratulations that you made it this far! Now that you've understood everything *(in theory)*, it's time to create a pull request in the [GitHub](https://github.com/CamelliaCommunity/wiki/tree/beta)! When creating a pull request, you must [fork the respository](https://docs.github.com/en/get-started/quickstart/fork-a-repo). Please make sure you forked the beta branch instead of the live branch. If you click the "Edit This Page!" button, GitHub will show you a screen about forking the repository. This method is an easier way to create a fork and is preferred for first-time contributors.

Once the repository is forked and its contents are edited, create a pull request that merges items into the beta branch. NEVER create a pull request to merge in the live branch. If you do that, you should feel bad.

This is it for contribution. Almost all articles and posts are editable for the user. If you see ways to improve documents, don't hesitate to contribute!

## References

[^1]: [What is Markdown?](https://www.knowledgehut.com/blog/web-development/what-is-markdown)

[^2]: [Front Matter](https://frontmatter.codes/docs/markdown)

[^3]: [kramdown](https://kramdown.gettalong.org/index.html)
