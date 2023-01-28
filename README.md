# hoohoo_frontend

# React-native Installation
## Initialize the development environment for macOS
1. Clone our file
```
git clone https://github.com/cskangGT/hoohoo_frontend.git
```
2. Install Watchman (brew install watchman)
3. Install Node.js (19.4, 19.5)
4. Ruby 2.7.6 version install
    * 
    ```
    brew install rbenv
    ```
    * Configuration 
        - Add to your configuration file(zshrc or bash_profile) 
        ```
        eval "$(rbenv init -)”
        ```
    * install ruby
    ```
    rbenv install -l
    rbenv install 2.7.6
    rbenv global 2.7.6
    ruby -v # should be ruby 2.7.6 version
    ```

5. Java JDK version 11.0.18 OpenJDK 64-Bit Server VM Zulu11.62+17-CA
    ```
    brew tap homebrew/cask-versions
    brew install --cask zulu11
    ```
* Java version change 
* Add to your configuration file(zshrc or bash_profile)
```
export JAVA_HOME=$(/usr/libexec/java_home -v 11.0.18)
```
 * Don’t forget to apply it using command source (source “configuration file”)
```
source ~/.zshrc
```

6. Download Android studio and Xcode 
- Open Android Studio -> find SDK Manager from search -> Go to SDK tools tap -> Make sure that  Android SDK Command-line Tools 9.0 (latest), Android Emulator, Android SDK Platform-Tools (31) and Android SDK Build-Tools(31.0.0) are installed
- Configuration setting for Android SDK
    ```
    export ANDROID_SDK_ROOT=$HOME/Library/Android/sdk
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/emulator:$PATH
    export PATH=$PATH:$ANDROID_HOME/tools:$PATH
    export PATH=$PATH:$ANDROID_HOME/tools/bin:$PATH
    export PATH=$PATH:$ANDROID_HOME/platform-tools:$PATH
    ```
* Xcode should be installed to run iOS  emulator 
7. Install Bundler
    ```
    gem install bundler
    ```
8. Install Cocoapods 
    ```
    sudo gem install cocoapods
    ```
    * Install node_modules and release potfile
    ```
    cd Diary_app
    yarn
    
    cd ios
    pod install
    ```
9. Run emulator 
* Make sure that you are in Dairy_app file (cd Diary_app or cd ..)
```
npm install # install package
```
* Running the emulator virtually
```
npm run android or ios
npx react-native start (integrated)
```
10. Possible Error
* when you encounter :app:installDebug error, it is a storage issue. Clean your virtual device.



## Initialize the development environment for Windows
1. Clone our file
```
git clone https://github.com/cskangGT/hoohoo_frontend.git
```
2. Install Chocolatey
* This is a package manager in windows. We can install and manage packages from server.
```
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```
3. Install Node.js
```
choco install -y nodejs.install
```
4. Install Java __11.0.18__ OpenJDK 64-Bit Server VM Zulu11.62+17-CA
```
choco install -y nodejs-lts microsoft-openjdk11
```
* Need to apply our Java version to our system.
    * Add new env variable to your system.
    ```
    name: JAVA_HOME, value : C:\Program Files\Microsoft\jdk-11.0.18.10-hotspot\
    ```
    * Then, set path to Java.
    ```
    name: Path, value : %JAVA_HOME%\bin
    ```
    * Check the Java version.
    ```
    $ java -version 
    # output should be the below.
    
        openjdk 11.0.18 2023-01-17 LTS
        OpenJDK Runtime Environment Microsoft-7208460 (build 11.0.18+10-LTS)
        OpenJDK 64-Bit Server VM Microsoft-7208460 (build 11.0.18+10-LTS, mixed mode)
    ```
    
    * This is a helpful link to change the configuration setting for Java 11.0.18 (https://www.happycoders.eu/java/how-to-switch-multiple-java-versions-windows/)
3. Install Android Studio
    * Use this link to download Android Studio (https://developer.android.com/studio/)
    * Open Android Studio -> find SDK Manager from search -> Go to SDK tools tap -> Make sure that  Android SDK Command-line Tools 9.0 (latest), Android Emulator, Android SDK Platform-Tools (31) and Android SDK Build-Tools(31.0.0) are installed.
    * add env variables to user and system.
    ```
    # Add below to user variable
    name : ANDROID_HOME, value : C:\Users\"USERNAME"\AppData\Local\Android\Sdk
    # Add to system env
    name : ANDROID_HOME, value : %LOCALAPPDATA%\Android\Sdk
    name : Path, value : %LOCALAPPDATA%\Android\Sdk\platform-tools
    ```
    * Check the variables been added to system using the below.
    ```
    Get-ChildItem -Path Env:\
    ```
4. Install packages from node package manager
* Before install, make sure you are in Diary_app file.
```
cd Diary_app
npm install
```
5. Run the Emulator
* Check a version of Android Debug
```
$ adb    # check the Android Debug Bridge version 
    Android Debug Bridge version 1.0.41
    Version 33.0.3-8952118
```
* Run android device
```
npm run android
```
