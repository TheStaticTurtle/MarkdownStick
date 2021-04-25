# MarkdownStick

This project is a simple markdown reader for hosting static files, likes courses.

It might be simple but it supports a lot of thins going from simple html support to UML and LaTex
The idea was to have a simple format that course could be written into whilst still having a simple way to share them, download them ....

## Course setup
Each course is configured via a simple config file containing the title, description and cover image

```json
{
	"title": "Example course",
	"image": "https://upload.wikimedia.org/wikipedia/commons/5/5a/Books_HD_%288314929977%29.jpg",
	"description": "This is an example course to get started on organising yours",
	"visible": true
}
```

Whilst each chapter can be configured to have a title, subtitle, icon and ordering in the index. This config have to be a the start of every markdown file in a course
```md
---
title: Math stuff?
subtitle: Advanced stuff
icon: mdi-chart-areaspline
order: 40
---
```

## Features
As mentioned the reader supports multiple intergrations like, code highlighting, html,iframes, images, links (with support for chapter to chapter links), math expressions with latex, smileys, tables, uml, and some basic UI with MCQs.
All of which can be ssen in the example course

It supports the download of all the chapters of a course in a zip file, or you can download each chapter individually

And of course it supports a dark / light mode

## Pictures


## Build
This project is build around nuxt and nuxt-content. Here is a few commands to get it started:
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

