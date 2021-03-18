# Build

The following steps fully reset the app build

```sh
git clean -xdn
git clean -xdf
npm install
ionic integrations enable cordova --add
ionic cordova build android
```
