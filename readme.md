# Build

The following steps fully reset the app build

```sh
git clean -xdn
git clean -xdf
npm install
ionic integrations enable cordova --add
ionic cordova build android
```

App works the same with or without the following permission in the manifest:

```xml
    <uses-permission android:name="android.permission.CAMERA" />
```
