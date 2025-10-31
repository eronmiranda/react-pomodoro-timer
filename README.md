# My Pomodoro Timer 🍅

I built this because I was tired of cluttered productivity apps. Sometimes you just need a simple timer that works.

[Try it out →](https://www.pomodoro.eroniellemiranda.com)

## What it does

- 25-minute work sessions, 5-minute breaks (you know the drill)
- Remembers your settings
- Works offline
- No accounts, no tracking, no nonsense

## Running it locally

```bash
git clone https://github.com/eronmiranda/react-pomodoro-timer.git
cd react-pomodoro-timer
bun install
bun run dev
```

That's it. Open your browser and start focusing.

## What I used

React, Bun, JoyUI, and Vite. Keeps your settings in localStorage so they stick around.

## Want to help?

Feel free to fork it, break it, fix it. Here's what I'm thinking about adding:

- Notifications when sessions end
- Different sound options
- Maybe some basic stats
- PWA support so it works like a real app

## Docker if you're into that

```bash
docker compose up -d
```

Visit `http://localhost:4020` and you're good to go.

---

Made by me (with ☕️), [@eronmiranda](https://github.com/eronmiranda), when I should have been using a Pomodoro timer instead of building one.
