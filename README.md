# Personal Pomodoro Timer 🍅

A minimalist productivity tool built with React to help maintain focus and manage work sessions effectively. This project was created to explore React's latest features while solving a personal need for a clean, customizable timer.

[View Live Demo Here](https://www.pomodoro.eroniellemiranda.com) 🔗

## Why Another Pomodoro Timer? 🤔

I wanted to build a distraction-free Pomodoro timer that:

- Remembers my preferred settings
- Doesn't require an account
- Works offline
- Has a clean, minimalist UI

## Getting Started 🚀

```bash
# Clone the repository and navigat to project dir
git clone https://github.com/eronmiranda/react-pomodoro-timer.git && cd react-pomodoro-timer

# Install dependencies
bun install

# Start dev server
bun run dev
```

## Tech Stack 🛠️

- **React** - for building the UI
- **Bun** - for JavaScript runtime and package manager for fast development
- **JoyUI** - for consistent component look and design
- **Vite** - For lightning-fast development
- **LocalStorage** - for persistence without a backend

## Project Structure 📁

```bash
src/
├── components/       # reusable UI components
├── context/          # global state management
├── hooks/            # custom react hooks
```

## Future Improvements 🚧

- [ ] Add PWA support
- [ ] Add notifications
- [ ] Implement more keyboard shortcuts
- [ ] Add custom sound themes
- [ ] Include productivity statistics tracking and dashboard
- [ ] Add Task/Todo tracking
- [ ] Provide theme customization

## Development 💻

```bash
# Start development
bun run dev

# Run prettier to format code
bun run format

# Build for production
bun run build
```

## Docker Setup 🐳

The project includes Docker support for easy deployment. You can run the timer using either Docker directly or Docker Compose.

### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker compose up -d

# Stop the container
docker compose down
```

### Using Docker Directly

```bash
# Build the Docker image
docker build -t pomodoro-timer .

# Run the container
docker run -d -p 4020:80 --name pomodoro pomodoro-timer

# Stop the container
docker stop pomodoro
```

The app will be available at `http://localhost:4020`

---

Built with ☕️ by [@eronmiranda](https://github.com/eronmiranda)
