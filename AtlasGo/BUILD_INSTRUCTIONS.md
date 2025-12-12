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

### Method 3: Testing with Expo Go + Android Studio Emulator

The easiest way to test the app during development using Expo Go.

#### Prerequisites

1. **Install Android Studio**
   - Download from https://developer.android.com/studio
   - Follow the installation wizard
   - Install Android SDK (at least API level 30)

2. **Create Android Emulator**
   - Open Android Studio > Device Manager
   - Click "Create Virtual Device"
   - Select a device (e.g., Pixel 9 Pro)
   - Choose a system image (e.g., Android 14 or higher)
   - Click "Finish" and start the emulator

3. **Install Expo Go on the Emulator**
   - Start the Android emulator
   - Open Google Play Store
   - Search for "Expo Go"
   - Install the app

#### Testing Steps

**Clone and Setup the Project:**

```bash
git clone https://github.com/PzYusawaLux/UX-Project.git
cd AtlasGo
git checkout main
npm install
```

**Start the Development Server:**

```bash
npm run android
```

This command will:
1. Start Metro bundler (JavaScript bundler)
2. Generate a QR code in the terminal
3. Automatically open the app in your Android emulator via Expo Go

**What You'll See:**

- Terminal shows: `Android Bundled [time]ms index.ts ([modules] modules)`
- QR code appears for manual scanning
- App loads in Expo Go on the emulator

**Hot Reload During Development:**

While the app is running:
- Edit any file in `src/` folder
- Changes automatically reload in the emulator (usually within a few seconds)
- Press `r` in terminal if manual reload is needed
- Press `m` to toggle menu
- Press `j` to open debugger

**Terminal Commands:**

```
Press a │ open Android emulator
Press r │ reload app
Press j │ open debugger
Press m │ toggle menu
Press ? │ show all commands
```

---

### Method 4: Download & Install on Real Android Phone

#### Option A: Direct APK Download (if available)

1. **On your Android phone:**
   - Open file manager or browser
   - Visit the download link provided by the project
   - Download the APK file (atlas-go.apk)
   - Open the file to install
   - If prompted, enable "Unknown Sources" in Settings > Security

2. **Installation:**
   - Follow on-screen prompts
   - App will be installed and ready to use

#### Option B: Install from Emulator via QR Code

1. **With development server running (`npm run android`):**
   - Expo displays a QR code in the terminal
   - On your real Android phone, open Expo Go app
   - Tap "Scan QR code" button
   - Scan the code shown in terminal
   - App loads on your phone

2. **Requirements:**
   - Phone must be on same WiFi network as computer
   - Expo Go app installed on phone

#### Option C: Build Production APK (via EAS)

```bash
eas login  # Login to Expo account
eas build --platform android --profile preview
```

- Wait 5-15 minutes for build to complete
- EAS provides download link for final APK
- Download and install on your phone

---

### Method 5: Development with Android Studio (Advanced)

For viewing logs and debugging:

1. **In Android Studio:**
   - Open Tools > Logcat to view app logs
   - See real-time error messages and output
   - Build on top of the emulator setup from Method 3

2. **Code Editing:**
   - Edit files in `src/` folder
   - Changes hot-reload automatically
   - Use Android Studio's code editor features

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

