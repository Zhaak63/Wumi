<div align="center">

<img src="assets/banner.svg" alt="Wumi, your server's cutest little companion" width="100%">

<br>

[![Add to Discord](https://img.shields.io/badge/Add%20to%20Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white)](https://discord.com/oauth2/authorize?client_id=1545770920185045084&scope=bot%20applications.commands&permissions=1426362592470)
[![Support server](https://img.shields.io/badge/Support%20server-62b8ff?style=for-the-badge&logo=discord&logoColor=white)](https://discord.gg/VaGrXgnAHS)

![HTML5](https://img.shields.io/badge/HTML5-e34f26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572b6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-f7df1e?style=flat-square&logo=javascript&logoColor=black)
![Languages](https://img.shields.io/badge/languages-EN%20%7C%20FR-7b82b8?style=flat-square)

**English** · [Français](README.fr.md)

</div>

---

## About

This repository contains the website of **Wumi**, a cute all-in-one Discord bot: auto roles, reaction roles, welcome and goodbye messages, moderation and mini-games.

The site is plain HTML, CSS and JavaScript. No build step, no framework, no dependency. Open a file and it works.

<div align="center">
<img src="assets/Logo_Bot.png" alt="Wumi logo" width="180">
</div>

## Features

- 🎀 Single landing page with a hero, a chat demo, the feature list and the command list
- 🌍 **English by default**, French available with the EN / FR switch (the choice is remembered)
- 🌗 Light and dark mode that follow the visitor's system
- 📱 Responsive, from phones to wide screens
- ♿ Keyboard focus styles and reduced-motion support
- 📄 Separate Terms of Service and Privacy Policy pages, ready to paste into the Discord Developer Portal

## Files

```
.
├── index.html            # Home page
├── conditions.html       # Terms of Service (EN / FR)
├── confidentialite.html  # Privacy Policy (EN / FR)
├── assets/
│   ├── Logo_Bot.png      # Bot logo
│   └── banner.svg        # Banner used in this README
├── README.md
└── README.fr.md
```

Keep the three HTML files in the same folder: they link to each other with relative paths.

## Deploy

**Cloudflare Pages**
1. Push this folder to a GitHub repository.
2. In Cloudflare, go to *Workers & Pages* → *Create* → *Pages* → *Connect to Git*.
3. Pick the repository. Leave the build command empty and the output directory as `/`.

**GitHub Pages**
1. Open the repository's *Settings* → *Pages*.
2. Choose the `main` branch and the `/ (root)` folder, then save.

Once online, copy the page addresses into the Discord Developer Portal, in your application's *General Information*:

| Field | Address |
|---|---|
| Terms of Service URL | `https://your-site/conditions.html` |
| Privacy Policy URL | `https://your-site/confidentialite.html` |

## Customize

| What | Where |
|---|---|
| Invite and support links | Search for `discord.com/oauth2` and `discord.gg` in `index.html` |
| Colors | The variables at the top of the `<style>` block (`--bg`, `--blue`, `--ink`…) |
| Texts and translations | The `T` object in the `<script>` block, one entry per text with an `en` and an `fr` version |
| Commands list | The `cmds` entry of `T` |
| Contact email | The `EMAIL` address inside the `terms` and `privacy` entries of `T` |
| Logo | Replace `assets/Logo_Bot.png`. In the HTML files the logo is embedded as base64, so regenerate it or switch to `<img src="assets/Logo_Bot.png">` |

## Links

- 🤖 [Add Wumi to your server](https://discord.com/oauth2/authorize?client_id=1545770920185045084&scope=bot%20applications.commands&permissions=1426362592470)
- 💬 [Join the support server](https://discord.gg/VaGrXgnAHS)

---

<div align="center">
Made with 💙 for Discord
</div>
