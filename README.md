# My GraphQL Jobs

This React Native app uses Apollo Client and GraphQL to query a public GraphqL server. It serves jobs in a tinder-style swipeable stack. Users can save favourites, and follow links to view company details and apply for roles. Charts display job data relevant to the user's preferred country and city. Users register and login to use the app, and can change their password using Cognito.

---

## Getting Started

The instructions below will allow you to get a copy of this project up and running on your local machine. This project will only run if you have access to the `aws-exports` config file.

XCode (12.5) is necessary to run this project on iOS, as is Android Studio (4.2) to run it on Android.

---

## Installing

1. Clone the project: `git clone https://github.com/j-dublon/myGraphQLJobs.git`

2. Install dependencies: `yarn`

3. Install pods: `npx pod-install`

4. Create a file `aws-exports.js` in the root of the project and add the AWS config data

5. Run the command `patch-package` to apply project patches for `react-native-chart-kit` (without this the bar graph UI will not display correctly)

---

## To run on iOS:

Double click on the `myGraphQLJobs.xcworkspace` file in the `ios` folder to open the project in XCode.

## To run on Android:

Either drag the android folder to the Android Studio application icon, or open the android folder of the project from Android Studio directly.

---

## Built with:

- **React Native** - application framework
- **GraphQL** - query language
- **Apollo Client** - state management library
- **Amplify & Cognito** - authentication

## Contributing

[Please see here](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for an excellent guide on how to contribute.

## Author

Jodi Dublon
