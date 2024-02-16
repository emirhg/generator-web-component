# Web Component Generator [![NPM version][npm-badge]][npm-url]

Quickly scaffold lightweight web components with [Yeoman][yeoman], with just what's needed and none of the cruft. Built against the v1 Web Components spec.

madeleineostoja/generator-web-component was archived in 2000

Modular Web Component definition. JavaScript and CSS are implemented different in splitted files.
Polymer support removed.

### Contents

<!-- MarkdownTOC -->

- [Features](#features)
- [Installation & usage](#installation--usage)
- [Components for apps](#components-for-apps)
- [Standalone components](#standalone-components)
- [Todo](#todo)

## Features

- Generate standalone projects for distribution
- Optionally include Shadow DOM template boilerplate

Check out the files in `app/templates` in this repo for a better idea of what you'll get.

## Installation & usage

Install Yeoman and the component generator with NPM or Yarn

```sh
$ npm i -g yo generator-web-component
```

Then run it

```sh
$ yo web-component ${NEW_COMPONENT_TAG_TWO_WORDS_MINIMUM}
```

## Test

And index.html is included to load the component
