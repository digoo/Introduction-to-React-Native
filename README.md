# Initial usage

yarn add react-native-cli

## On root project source
npx react-native init <Module name>

cd <Module name>

`With react-native version > 0.60`

yarn add jetifier

npx jetify

## refresh it with:
yarn

react-native start

### Now start the android emulator OR connect your cellphone to USB and allow it to debug with ADB

## now execute the command if emulator:
adb reverse tcp:3334 tcp:3334

react-native run-android

## If Android through ADB debug mode:
adb reverse tcp:9090 tcp:9090

react-native run-android


### the reverse command is used here to debug it with reactotron


yarn add eslint -D

yarn eslint --init

### To choose, not in the correct order:
Yes/JavaScript/de-select browser and node/Use a known template/Select airbnb/JavaScript/React

### it will install few things with npm, it will also create a package.lock file, delete it then run:
yarn

### Configure it as it has been told

yarn add reactotron-react-native

yarn add react-navigation react-native-gesture-handler

react-native link react-native-gesture-handler

### On android additional commands must be added on android folder:
https://kmagiera.github.io/react-native-gesture-handler/docs/getting-started.html

Update your MainActivity.java file

### Add: (with + in the begin of the line)
package com.swmansion.gesturehandler.react.example;

import com.facebook.react.ReactActivity;
+ import com.facebook.react.ReactActivityDelegate;
+ import com.facebook.react.ReactRootView;
+ import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected String getMainComponentName() {
    return "Example";
  }

+  	@Override
+  	protected ReactActivityDelegate createReactActivityDelegate() {
+    return new ReactActivityDelegate(this, getMainComponentName()) {
+      @Override
+      protected ReactRootView createRootView() {
+       return new RNGestureHandlerEnabledRootView(MainActivity.this);
+      }
+    };
+  }
}


## install now:

yarn add styled-components

yarn add react-native-vector-icons

react-native link react-native-vector-icons

> yarn add axios

> yarn add @react-native-community/async-storage
> react-native link @react-native-community/async-storage

> yarn add prop-types

> yarn add react-native-webview
