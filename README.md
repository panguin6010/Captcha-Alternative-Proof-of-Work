# Proof of Work Captcha Alternative

This project provides an alternative to traditional captchas by requiring users to complete a simple, inconvenient task in order to verify their humanity. The user is presented with a list of tasks to choose from, and must provide proof that they have completed the task by uploading a photo or entering a text answer. The proof is then verified using an image tagging API.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/)
- [React](https://reactjs.org/)
- [Axios](https://www.npmjs.com/package/axios) (for making API calls)

### Installing

1. Clone or download the repository
2. Navigate to the project directory
3. Run `npm install` to install the dependencies
4. Run `npm start` to start the development server

### Customizing the Tasks

You can customize the available tasks by modifying the `tasks` array in the `ProofOfWork` component. Each task should have an `id`, a `description`, and a `verificationMethod` (either 'photo' or 'text'). If the `verificationMethod` is 'text', the task should also include an `answer` property.

## Documentation

For more information on the image tagging API used to verify the proof, see the API documentation.

## Contributing

If you would like to contribute to this project, please feel free to submit a pull request with your changes.

## Acknowledgments


- [React](https://reactjs.org/) for providing a powerful and efficient way to build user interfaces.
- [Axios](https://www.npmjs.com/package/axios) for making HTTP requests easy.
