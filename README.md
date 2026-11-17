# Midnight-Detective

<!-- omgithub:readme:start -->
## 🚀 Build, play, and remix with OMGithub

**Remixed using [OMGithub.com](https://go.ondev.store/).**

[![OMGithub](https://img.shields.io/badge/OMGithub-Open%20project-orange?style=for-the-badge)](https://go.ondev.store/DJBS1868/Midnight-Detective)
[![GitHub](https://img.shields.io/badge/GitHub-Source-181717?logo=github&style=for-the-badge)](https://github.com/DJBS1868/Midnight-Detective)

- 🎮 [Open the project](https://go.ondev.store/DJBS1868/Midnight-Detective).
- ✨ [Remix this project](https://go.ondev.store/DJBS1868/Midnight-Detective?remix=1).
- 💻 [Explore the source](https://github.com/DJBS1868/Midnight-Detective).
- 🛠️ [Check build runs](https://github.com/DJBS1868/Midnight-Detective/actions).
- 🐛 [Report an issue](https://github.com/DJBS1868/Midnight-Detective/issues).
- 👤 [Explore the creator's projects](https://go.ondev.store/DJBS1868).
- 🌍 [Create with OMGithub](https://go.ondev.store/).
- 🧬 [Explore the remix source](https://github.com/DJBS1868/Midnight-Detective).
<!-- omgithub:readme:end -->

## The game

A short, replayable 1940s noir murder mystery built for vertical phone screens. Every case
randomizes the victim, the weapon, the three suspects, their motives and alibis, the four
clues, the true killer, and one of **24 hand-drawn crime scenes**. Each location carries the
room, pier, or suite number Miller gives you on the phone.

### How to play

1. **Answer the call.** Sergeant Miller gives you the address at 2:00 A.M.
2. **Work the scene.** Tap the four marked details to log clues. One of them is the smoking gun.
3. **Read the board.** Cross-check the evidence, motives, and alibis.
4. **Accuse once.** The right name with the smoking gun closes the case. The right name
   without it, or the wrong name, and the killer walks.

Rain, ringing, and clue sounds are optional — tap **SOUND** in the top corner to enable them.

### Run locally

There is no build step and no runtime dependency. Serve the folder with any static server:

```bash
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/index.html>. Fonts and artwork are bundled; the game also
works when opened directly from disk.
