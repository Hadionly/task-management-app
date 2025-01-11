# AI-Powered Task Management App

A modern task management application built with React Native and OpenAI integration. The app helps users manage tasks efficiently with AI-powered suggestions for task descriptions.

## Features

- 🤖 AI-powered task suggestions and descriptions
- ✨ Create, edit, and delete tasks
- ✅ Mark tasks as completed/pending
- 🎨 Colorful and intuitive UI
- 📱 Responsive mobile-first design
- 💾 Local storage persistence

## Tech Stack

- React Native with Expo
- TypeScript
- Redux Toolkit (with Immer) for state management
- React Navigation
- OpenAI API integration
- React Native Paper UI components
- Formik & Yup for form management

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Hadionly/task-management.git
   ```
2. Navigate to the project directory:
   ```sh
   cd task-management
   ```
3. Install dependencies and json-server:
   ```sh
   npm install
   npm install -g json-server
   ```
4. Run the app:
   ```sh
   npx expo start
   ```

## Setting up JSON Server and Open AI

1. Install JSON Server globally:

   ```sh
   npm install -g json-server
   ```

2. Find your IPv4 address, run the following command:

   ```sh
   ipconfig
   ```

   Look for "IPv4 Address" under your network adapter (usually starts with 192.168.x.x)

3. Update config file:
   Go to `../config/api.config.ts`:

   ```typescript
   export const API_CONFIG = {
     OPENAI_API_KEY: "API_KEY", // Replace with OpenAI Key
     IPV4_ADDRESS: "YOUR_IPV4_ADDRESS", // Replace with your IPv4
   };
   ```

   Replace YOUR_IPV4_ADDRESS with the address found in step 2
   And API_KEY with OpenAI Key

4. Start JSON Server:
   ```sh
   json-server db.json --port 3000 --host 0.0.0.0
   ```

Note: Your mobile device/emulator must be on the same network as your development machine.

## Usage

1. Launch the app on your device/emulator
2. Create a new task using the + button
3. Use AI suggestions for task titles and descriptions
4. Manage tasks with intuitive swipe actions
5. Track task completion status

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and commit them:
   ```sh
   git commit -m 'Add some feature'
   ```
4. Push to the branch:
   ```sh
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to reach out to us at [hadieltighanidev.com](mailto:hadieltighanidev.com).
