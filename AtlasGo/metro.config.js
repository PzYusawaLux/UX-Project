const { getDefaultConfig } = require('expo/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 * https://docs.expo.dev/versions/v54.0.0/config/metro/
 *
 * @type {import('expo/metro-config').MetroConfig}
 */
const config = getDefaultConfig(__dirname);

// Disable package exports to fix compatibility issues with Metro ES Module resolution
// See: https://github.com/expo/expo/discussions/36551
config.resolver.unstable_enablePackageExports = false;

module.exports = config;
