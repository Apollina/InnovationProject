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

### Prerequisites for Windows development

To get project running on windows you need to install Node.js, Java SE Dev Kit and Python 2.

#### Node.js

Start by installing Node.js version [9.11.2](https://nodejs.org/download/release/v9.11.2/). It's the newest version supported by Firebase. 

#### Java SDK

Install [Java SDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)

#### Python 2

You will also have to install [Python 2](https://www.python.org/downloads/)

#### Intel Hardware Accelerated Virtualization

In addition you need to enable hardware virtualization from BIOS if it is not enabled yet.

```
In some cases, Intel VT-x may be disabled in the system BIOS and must be enabled within the BIOS setup utility. To access the BIOS setup utility, a key must be pressed during the computer’s boot sequence. This key is dependent on which BIOS is used but it is typically the F2, Delete, or Esc key. Within the BIOS setup utility, Intel VT may be identified by the terms "VT", "Virtualization Technology", or "VT-d." Make sure to enable all of the Virtualization features.
```

More information about [Intel® Hardware Accelerated Execution Manager](https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows)

#### React Native CLI

Then start command line interface (cmd) as an admin and run the command

```
npm install -g react-native-cli
```

#### Android studio

Download and install [Android studio](https://developer.android.com/studio/).

Choose a "Custom" setup when prompted to select an installation type. Make sure the boxes next to all of the following are checked:

* Android SDK
* Android SDK Platform
* Performance (Intel ® HAXM)
* Android Virtual Device

From Android Studio SDK Manager, install the correct Android SDK (one that supports react native)

#### Android 8.1 (Oreo)

Expand and select 

* Android SDK Platform 27
* Intel x86 Atom_64 System Image or Google APIs Intel x86 Atom System Image

Next, select the "SDK Tools" tab and check the box next to "Show Package Details" here as well. Look for and expand the "Android SDK Build-Tools" entry, then make sure that 27.0.3 is selected.

Next go to My Computer -> System Properties -> Advanced System Settings -> Environment Variable

Click on New... to create a new ANDROID_HOME user variable that points to the path to your Android SDK:
Default location: c:\Users\YOUR_USERNAME\AppData\Local\Android\Sdk


## Installation

To get the latest version of our application, clone this git repository with https or ssh. 

```
git init
```

```
git clone https://github.com/Apollina/InnovationProject.git
```

After cloning this repository run

```
npm install
```

## Firebase

### Installation and configuration

Prerequisite: A google account.

Open the [Firebase console](https://console.firebase.google.com/) and sign in with your google account if you aren't already logged in. Choose "Add Project" and give your project a name. Modify the project id, if you want to change the route of your Project.After the project was created, click in the Developer section on create database.
Copy and save the credentials, which are being displayed after creating the database. You need these credentials to connect to your database in the App.
Further instructions are in this Readme in the 'Set up project' section. Now you can add your data by using the following schema.
If you want the initial state of the project, navigate to the Project folder databasefiles (Route/app/databasefiles). In this folder are the JSON files, that can be easily imported into your database.

### Set up Database

By using this JSON-schema, you have to set up your own Firebase database to handle the user related data and grouping keywords.

Category data to be inserted at _route/categories_:
```
[
   {
      "description":"string",
      "keywords":[
         {
            "keyword":"string",
            "id":"string"
         }
      ]
   }
]
```

Agecategory data to be inserted at _route/ageCategories_:
```
[
   {
      "description":"string",
      "keywords":[
         {
            "keyword":"string",
            "id":"string"
         }
      ]
   }
]
```

Level data to be inserted at _route/levelsystem_:
```
[
   {
      "level":"string",
      "points":integer,
      "description":"string"
   }
]
```

User data to be inserted at _route/userList_: Currently a Mockup is being used.
```
[
   {
      "nickName":"string",
      "signInDate":"string",
      "userLevel":integer,
      "points":integer,
      "activeCourses":[
         {
            "courseName":"string",
            "locationName":"string",
            "locationAddress":"string"
         }
      ]
   }
 ]
```

### Set up project

To use the database you just created, you need to add a config file to the app folder (Route/app).
Create following 'firebase.json' file with the credentials of your database:
```
import firebase from 'firebase';

const config = {
    apiKey: "string",
    authDomain: "string",
    databaseURL: "string",
    projectId: "string",
    storageBucket: "string",
    messagingSenderId: "string"
};
firebase.initializeApp(config);
export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();
```

## Running with Xcode iOS simulator

To run our project with Xcodes iOS simulator, you have to run two terminal windows in your project folder. On the first window run 

```
npm start
```

This will start the Metro bundler stuff, which compiles the code to functioning applicaton. To start the iOS simulator, on the other window run 

```
react-native run-ios
```

## Running with Android studio

In project folder with command line interface run

```
react-native run-android
```

## Built with

* [React Native](https://facebook.github.io/react-native/)
* [Firebase](https://firebase.google.com/)