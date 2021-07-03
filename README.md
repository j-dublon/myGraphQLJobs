# My GraphQL Jobs

This React Native app uses Apollo Client and GraphQL to query a public GraphqL server. It serves jobs by the user's selected country in a tinder-style swipeable stack, and allows the user to save their favourites. User's can then follow links in the adverts to view company details and apply for roles. Charts display the cities in the user's home country with the most jobs, and the relative quantity of remote to on-site positions in the user's home city. Users register and login to use the app, and can change and reset their password using Cognito.

## Getting Started

The instructions below will allow you to get a copy of this project up and running on your local machine. This project will only run if you have access to the `aws-exports` config file.

XCode (12.5) is necessary to run this project on iOS, as is Android Studio (4.2) to run it on Android.

## Installing

1. Clone the project: `git clone https://github.com/j-dublon/myGraphQLJobs.git`

2. Install dependencies: `yarn`

3. Install pods: `npx pod-install`

4. Create a file `aws-exports.js` in the root of the project and add the AWS config data.

## To run on iOS:

Double click on the `myGraphQLJobs.xcworkspace` file in the `ios` folder to open the project in XCode.

## To run on Android:

Either drag the android folder to the Android Studio application icon, or open the android folder of the project from Android Studio directly.

## Built with:

- **React Native** - application framework
- **GraphQL** - query language
- **Apollo Client** - state management library
- **Amplify & Cognito** - authentication

## Contributing

[Please see here](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for an excellent guide on how to contribute.

## Author

Jodi Dublon
