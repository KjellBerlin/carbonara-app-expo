# Carbonara

Only working for ios yet. To run it locally you need to run `npm install` and `npm run:ios` in the root directory.
The simulator app from xcode is required.

## IOS

1. Install Xcode
2. Install iOS 18.0 `Settings -> Components`
3. Run `npm run:ios`

## Android

1. Install Android Studio 
2. Create a local.properties file and set the path to the android sdk there like this
`sdk.dir=/path/to/your/sdk`. You can find the path to your sdk in android studio `Preferences > Appearance & Behavior > System Settings > Android SDK`
3. Install NDK in Android Studio `Settings -> Language & Frameworks -> SDK Tools -> Install NDK (Side by side)`
4. Open a simulator in android studio `More Actions -> Virtual Device Manager`.
5. Run `npm run:android`

