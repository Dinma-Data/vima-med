# VIMA MED — Website

**Medical & Public Health Communications**  
Personal portfolio website for Dr. Chidinma Ndubuisi.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [How to Edit Text](#how-to-edit-text)
4. [How to Replace the Headshot](#how-to-replace-the-headshot)
5. [How to Add a Blog Post](#how-to-add-a-blog-post)
6. [How to Change Colors or Fonts](#how-to-change-colors-or-fonts)
7. [How to Enable the Contact Form](#how-to-enable-the-contact-form)
8. [How to Host on GitHub Pages](#how-to-host-on-github-pages)
9. [Useful Links](#useful-links)

---

## Project Overview

This is a clean, static website built with plain HTML, CSS, and JavaScript — no frameworks, no build tools. Every file is beginner-friendly and can be edited in any text editor (VS Code recommended).

---

## File Structure

```
vima-med-website/
├── index.html      ← All page content (sections, text, links)
├── style.css       ← All visual styling (colors, fonts, spacing)
├── script.js       ← Interactive behaviour (menu, form, animations)
├── assets/
│   └── headshot.jpg  ← Add your professional photo here
└── README.md       ← This guide
```

---

## How to Edit Text

All visible text lives in **`index.html`**. Open it in VS Code and use **Ctrl + F** (or Cmd + F on Mac) to search for the text you want to change.

### Common edits:

| What to change | Search for |
|---|---|
| Hero headline | `Clear, audience-appropriate` |
| Hero subheadline | `I help individuals, brands` |
| About bio | `I'm Chidinma Ndubuisi` |
| Blog card titles | `blog-card-title` |
| Blog card excerpts | `blog-card-excerpt` |
| Service names | `service-card` |
| Email address | `vima.medcoms@gmail.com` |
| LinkedIn URL | `linkedin.com/in/dr-chidinma` |
| WhatsApp number | `wa.me/2347062558696` |

Simply find the text and type your new content in its place.

---

## How to Replace the Headshot

1. Save your professional photo as **`headshot.jpg`** inside the `assets/` folder.
2. Open `index.html` and find this block (search for `about-photo-placeholder`):

```html
<div class="about-photo-placeholder" aria-label="Headshot placeholder">
  <span>Photo</span>
</div>
```

3. Replace the entire `<div class="about-photo-placeholder">` block with:

```html
<img src="assets/headshot.jpg" alt="Dr. Chidinma Ndubuisi" class="about-photo" />
```

4. Save the file and refresh your browser — your photo will appear.

**Tip:** Use a square or portrait-oriented photo (4:5 ratio works best). Compress it to under 300 KB for fast loading.

---

## How to Add a Blog Post

To add a new card to the blog section, open `index.html`, find the `blog-grid` section, and copy-paste this block:

```html
<article class="blog-card">
  <div class="blog-card-tag">Your Category</div>
  <h3 class="blog-card-title">Your Article Title Here</h3>
  <p class="blog-card-excerpt">
    A short 2–3 sentence description of the article that gives the reader a reason to click through and read more.
  </p>
  <a href="#" class="blog-card-link">Read More &rarr;</a>
</article>
```

Replace the placeholder text with your real content. When your article is published somewhere, replace `href="#"` with the full URL.

---

## How to Change Colors or Fonts

All colors and fonts are defined as variables at the top of **`style.css`** (look for the `/* 1. CSS CUSTOM PROPERTIES */` comment).

```css
:root {
  --color-primary:       #1a5fa8;   /* Main blue — change this to update the whole site */
  --color-primary-dark:  #134a85;
  --color-primary-light: #e8f1fb;
  ...
}
```

Change a single hex value and every button, link, and accent across the site updates at once.

To change the font, replace `'Merriweather'` or `'Inter'` in the `:root` block — then update the Google Fonts `<link>` tag in `index.html` accordingly.

---

## How to Enable the Contact Form

The contact form currently shows a success message but does not send emails. To make it actually send messages:

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Create a new form — you'll receive a unique endpoint URL like `https://formspree.io/f/abc12345`.
3. Open `script.js` and find the `OPTION B` comment block near the bottom.
4. Uncomment that block and replace `YOUR_FORM_ID` with your actual Formspree form ID.
5. Comment out or delete the `OPTION A` block above it.

All form submissions will then be forwarded to your email address.

---

## How to Host on GitHub Pages

GitHub Pages lets you host this site for free with your own `.github.io` URL.

### Step 1 — Push to GitHub

If you haven't already:

```bash
git init
git add .
git commit -m "Initial commit — VIMA MED website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/vima-med-website.git
git push -u origin main
```

### Step 2 — Enable GitHub Pages

1. Go to your repository on GitHub.
2. Click **Settings** → **Pages** (in the left sidebar).
3. Under **Source**, select `main` branch and `/ (root)` folder.
4. Click **Save**.

Your site will be live at:
`https://YOUR-USERNAME.github.io/vima-med-website/`

(It may take 1–2 minutes to go live the first time.)

### Step 3 — Custom domain (optional)

If you have a domain like `vinamed.com`:

1. In GitHub Pages settings, enter your domain under **Custom domain**.
2. At your domain registrar, add a CNAME record pointing to `YOUR-USERNAME.github.io`.

---

## Useful Links

- [VS Code Download](https://code.visualstudio.com/) — recommended editor
- [Google Fonts](https://fonts.google.com/) — to find alternative fonts
- [Formspree](https://formspree.io/) — to enable contact form emails
- [Squoosh](https://squoosh.app/) — free image compressor (for your headshot)
- [GitHub Pages Docs](https://docs.github.com/en/pages) — hosting documentation

---

*Built for VIMA MED by Dinma-Data · 2025*
