<div align="center">
  <img src="src/assets/icon144.png" alt="QuizBridge Logo" width="144" height="144"/>

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Chrome Extension](https://img.shields.io/badge/Platform-Chrome-green.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)

</div>

# QuizBridge Chrome Extension

QuizBridge is a Chrome extension that helps you bridge your vocabulary lists to Quizlet flashcards seamlessly. It allows you to collect words while browsing and easily create Quizlet sets from them.

## Features

- 🔍 **Quick Word Selection**: Right-click any word or phrase on any webpage to save it to your collection
- 📚 **Quizlet Integration**: Seamlessly create Quizlet sets from your collected words
- 💾 **Local Storage**: All your words are stored locally in your browser
- 🎯 **Context Menu**: Easy-to-use context menu for saving selected text
- 🎨 **Modern UI**: Built with React and Tailwind CSS for a beautiful user experience
- ⚡ **Fast Performance**: Built with Vite for optimal performance

## Installation

1. Clone this repository:

```bash
git clone [your-repository-url]
cd quizlet-chrome-extension
```

2. Install dependencies:

```bash
pnpm install
```

3. Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

4. Build the extension:

```bash
pnpm build
```

5. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the `dist` folder from your project directory

## Development

- Start development server:

```bash
pnpm dev
```

- Lint code:

```bash
pnpm lint
```

- Format code:

```bash
pnpm format
```

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Type Safety**: TypeScript
- **Routing**: React Router
- **Code Quality**: ESLint, Prettier

## Project Structure

```
src/
├── app/          # App configuration
├── assets/       # Static assets
├── features/     # Feature components
├── state/        # Redux state management
└── types/        # TypeScript type definitions
```

## Environment Variables

| Variable                      | Description                            |
| ----------------------------- | -------------------------------------- |
| `VITE_UNINSTALL_FEEDBACK_URL` | Google Form URL for uninstall feedback |

## Requirements

- Node.js >= 18.0.0
- pnpm (package manager)

## Browser Support

- Chrome (Latest version)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This means you can:

- ✅ Use the extension commercially
- ✅ Modify the code
- ✅ Distribute the code
- ✅ Use it privately
- ✅ Use it for any purpose

The only requirement is keeping the copyright and license notices.

## Feedback

When users uninstall the extension, they will be redirected to a feedback form to help us improve the extension.
