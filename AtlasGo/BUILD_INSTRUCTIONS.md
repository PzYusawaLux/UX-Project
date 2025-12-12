# AtlasGo - Build Instructions & APK Download

## Quick Installation

### Method 1: Direct APK Download (Recommended)
The latest build is ready to download and install directly.

**Download Link:** https://expo.dev/artifacts/eas/nJgzp6bfh7Vcb7cWwe93RS.apk

**Installation Steps:**
1. Download the APK file on your Android device
2. Open file manager and locate the downloaded APK
3. Tap the APK file to install
4. If prompted about "Unknown Sources", enable it in Settings > Security

### Method 2: Build from Source Code

**Important:** Make sure to clone the `main` branch

**Prerequisites:**
- Node.js 16 or higher
- npm or yarn
- Expo CLI (`npm install -g eas-cli`)
- Expo account (https://expo.dev)

**Build Steps:**

1. Clone the repository from the main branch
```bash
git clone https://github.com/PzYusawaLux/UX-Project.git
cd AtlasGo
git checkout main
```

2. Install dependencies
```bash
npm install
```

3. Login to Expo account
```bash
eas login
```

4. Build APK
```bash
eas build --platform android --profile preview
```

5. Wait for build to complete (usually 5-15 minutes)

6. Once finished, download link will be provided in the console

### Method 3: Using Android Studio (For Development)

Android Studio allows you to view, test, and debug the React Native code during development.

#### Setup Android Studio

1. **Install Android Studio**
   - Download from https://developer.android.com/studio
   - Follow the installation wizard
   - Install Android SDK (at least API level 30)

2. **Setup Android Emulator**
   - Open Android Studio > Device Manager
   - Click "Create Virtual Device"
   - Select a device (e.g., Pixel 4)
   - Choose a system image (e.g., Android 13)
   - Click "Finish"

#### Getting the Code

**Make sure to use the `main` branch**

1. **Clone the Repository**
```bash
git clone https://github.com/PzYusawaLux/UX-Project.git
cd AtlasGo
git checkout main
```

2. **Open Project in Android Studio**
   - Open Android Studio
   - Click "File" > "Open"
   - Navigate to the `AtlasGo` folder
   - Click "Open"
   - Wait for Android Studio to sync the project (this may take a few minutes)

3. **Install Node Dependencies**
```bash
# In terminal, make sure you're in the AtlasGo directory
npm install
```

4. **Start Development Server**
```bash
# In the same terminal, start the Expo development server
npm start
```

#### Running the App in Android Studio

**Option A: Via Expo CLI (Recommended)**
- In your terminal where `npm start` is running, press `a` to automatically open the app on Android emulator
- Android Studio will automatically detect the emulator

**Option B: Manual Setup**
1. In Android Studio, go to "Tools" > "Device Manager"
2. Select your virtual device and click "Play" to start the emulator
3. In your `npm start` terminal, press `a` to connect to the running emulator

#### Using Android Studio Features for Development

- **View/Edit Code**: Open any file in `src/` folder to view and edit React Native source code
- **View Logs**: Open "Logcat" at bottom of Android Studio to see application logs and errors
- **Run Debugger**: While app is running, go to "Tools" > "Debugger" > "Attach Debugger to Android Process"
- **Test Different Devices**: Create multiple virtual devices in Device Manager to test on different screen sizes and Android versions

#### Hot Reload During Development

When you have the app running on the emulator:
1. Edit any file in your source code
2. The changes will automatically reload in the emulator (usually within a few seconds)
3. If hot reload doesn't work, press `r` in the `npm start` terminal to manually reload

## Project Information

- **Project Name:** Atlas Go
- **Package Name:** com.atlasgo.app
- **Version:** 1.0.0
- **Platform:** Android (APK)

## System Requirements

- Android 5.0 or higher
- Minimum 50MB storage space
- Internet connection for development features

## Features

- Public transportation route search
- Interactive map navigation
- Online ticket purchase system
- Trip and ticket management
- Real-time departure boards
- Station information lookup

## EAS Dashboard

View all builds and download history:
https://expo.dev/accounts/sys1412/projects/atlas-go/builds

## License

See LICENSE file in project root directory

## Troubleshooting

**APK Installation Fails:**
- Ensure Android version is 5.0 or higher
- Check that unknown sources are enabled in settings
- Try uninstalling any previous version

**Build Fails:**
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`
- Ensure EAS CLI is updated: `npm install -g eas-cli@latest`

**Emulator Issues:**
- Ensure virtualization is enabled in BIOS
- Update Android SDK in Android Studio > SDK Manager
- Allocate sufficient RAM to virtual device (at least 2GB)

## Support

For additional help:
- Expo Documentation: https://docs.expo.dev
- React Native Docs: https://reactnative.dev
- Android Studio Help: https://developer.android.com/studio/help

