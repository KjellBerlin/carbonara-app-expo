# The Carbonara App

The Carbonara app is an open-source project designed to demonstrate how various components can be combined to create a fully functional end-to-end solution, with both frontend and backend. This React Native app is inspired by a sample from Creative Tim.

The imaginary use case for this app is a meal delivery service, where users can order meals and have them instantly delivered within a specific geographic area.

Important Notice:
This project is provided without a license. As such, the use of this code—whether for commercial or non-commercial purposes—is strictly prohibited without explicit permission from the project owner. The code is shared solely for educational purposes and as a source of inspiration.

If you wish to use the code, please contact me to request permission.

Some articles about the Carbonara app can be found on my Medium account: https://medium.com/@kjell.lilliestolze.

## How to use this app

A fully functional backend is deployed and accessible via the URL included in this project. You are welcome to create accounts and place orders for testing purposes. The payment page provides test credit card information for this purpose.

Please note that orders can only be placed within a 1500m radius of Schönhauser Allee 180, Berlin.

## Run it on IOS

1. Install Xcode
2. Install iOS 18.0 `Settings -> Components`
3. Run `npm run:ios`

## Run it on Android

1. Install Android Studio 
2. Create a local.properties file and set the path to the android sdk there like this
`sdk.dir=/path/to/your/sdk`. You can find the path to your sdk in android studio `Preferences > Appearance & Behavior > System Settings > Android SDK`
3. Install NDK in Android Studio `Settings -> Language & Frameworks -> SDK Tools -> Install NDK (Side by side)`
4. Open a simulator in android studio `More Actions -> Virtual Device Manager`.
5. Run `npm run:android`
