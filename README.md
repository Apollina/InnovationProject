# InnovationProject
React Native mobile application for Innovation Project course (4th year studies) at Metropolia UAS.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. For basic React-Native troubleshooting please refer to[documentation by Facebook](https://facebook.github.io/react-native/docs/getting-started.html).

For development you need certain tools to get the application up and running. The setup process for OSX and Windows is a bit different, so they are split into separate sections. 


### Prerequisites for MacOS development

#### Xcode

First thing to do when starting mobile development on MacOS is installing Xcode. You can install the latest version of Xcode from [Apples App Store](https://www.apple.com/ca/osx/apps/app-store/). 

#### Homebrew

[Homebrew](https://brew.sh/index_fi) makes developers life so much easier on MacOS. To install Homebrew run

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

#### Node.js

Because this project uses [Firebase](https://firebase.google.com/), you need to have certain version of Node.js installed. Node version should be above 8, but below 10. To handle multiple versions of Node.js node version manager is recommended.

To install latest Node version supported by our project run 

```
brew install node@9
```

Verify your current Node version with

```
node --version
```

#### React Native CLI

For running the React Native application locally, lightweight react-native-cli needs to be installed globally. 

```
npm install -g react-native-cli
```

## Installation

To get the latest version of our application, clone this git repository with https or ssh. 

```
cd <targetfolder>
```

```
git init
```

```
git clone https://github.com/Apollina/InnovationProject.git
```

To run with ios simulator
```
react-native run-ios
```