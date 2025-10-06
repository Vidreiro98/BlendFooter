# BlendFooter

A redesigned footer component with a smooth blending / animated effect — built as a personal project to showcase skills and design sensibilities.

## Table of Contents

* [Demo](#demo)
* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup / Installation](#setup--installation)
* [How It Works (Animation)](#how-it-works-animation)
* [Usage / Integration](#usage--integration)
* [Customization](#customization)
* [License](#license)
* [Acknowledgments](#acknowledgments)

---

## Demo

Here’s a preview animation:

![BlendFooter Animation](public/preview.gif)




You can view the live demo [here](https://joaovidreiro.wuaze.com/BlendFooter/index.html) *(replace with real link)*.

---

## Features

* Smooth blend / transition animation on footer background or overlay
* Responsive layout
* Built with modern frontend tooling
* Easily customizable

---

## Tech Stack

* **HTML / CSS / JavaScript / TypeScript**
* **Vite** as bundler / dev server
* **Tailwind CSS** for utility-first styling
* **Three.js** as the main tool to build.
 
---

## Setup / Installation

Here’s how to get the project running locally:

```bash
# Clone the repo
git clone https://github.com/Vidreiro98/BlendFooter.git
cd BlendFooter

# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

You might also have configurations like:

* `vite.config.mjs` — Vite configuration
* `tailwind.config.js` — Tailwind setup
* `postcss.config.cjs` — PostCSS setup

Check those files for any special project-specific settings.

---

## Usage / Integration

If you want to integrate the BlendFooter into your own project:

1. Copy over the relevant HTML markup for the footer.
2. Include the CSS (Tailwind + any custom styles) and JS logic (animation triggers).
3. Ensure that the parent container has necessary styling (positioning, overflow, etc.).
4. Adjust classes, colors, gradient stops, timing, etc., to fit your site’s theme.

An example usage:

```html
<footer class="blend-footer relative overflow-hidden">
  <div class="blend-overlay absolute inset-0"></div>
  <div class="footer-content relative z-10">
    <!-- your footer links / branding / content -->
  </div>
</footer>
```

And ensure the CSS / JS that animates `.blend-overlay` or background is included.

---

## Customization

You can tweak the animation and appearance by adjusting:

* Geometry, Material & Mesh
* Animation duration, easing, delay
* Trigger mechanisms (scroll, hover, load)
* Blend modes (`mix-blend-mode: overlay`, `screen`, etc.)
* Responsive breakpoints

---

## Acknowledgments

This project was developed as part of a portfolio / learning exercise to deepen frontend, animation, and design skills.

## License

MIT License

Copyright (c) 2025 [Your Name]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
