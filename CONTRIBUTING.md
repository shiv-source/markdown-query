# Contributing to markdown-query

👋 Welcome! We're thrilled that you'd like to contribute to markdown-query. Your help is essential for keeping it great.

## Code of Conduct

This project and everyone participating in it is governed by the [markdown-query Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [hello@shivkumar.me](mailto:hello@shivkumar.me).

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check if the issue has already been reported. If you find a bug that hasn't been reported yet, please create a new issue with a detailed description of the problem and steps to reproduce it.

### Suggesting Enhancements

If you have an idea to enhance markdown-query, we'd love to hear it! Create an issue with your proposal and any relevant details.

### Pull Requests

If you want to contribute directly by implementing new features or fixing bugs:

1. Fork the repository.

2. Clone the fork to your local machine:

    ```bash
    git clone https://github.com/shiv-source/markdown-query.git
    ```

3. Create a new branch for your changes using semantic branch naming conventions:

    ```bash
    # For a bug fix
    git checkout -b bug/fix-something

    # For a new feature
    git checkout -b feature/add-something

    # For documentation changes
    git checkout -b docs/update-something
    ```

4. Make your changes, commit them, and push to your fork following conventional commit message conventions:

    ```bash
    git add .
    git commit -m "feat: add new feature"          # For new features
    git commit -m "fix: resolve a bug"              # For bug fixes
    git commit -m "docs: update documentation"      # For documentation changes
    ```

5. Open a pull request from your branch to the `main` branch of the main repository.

6. Your pull request will be reviewed, and any necessary feedback will be provided.

## Development Setup

1. Install dependencies:

    ```bash
    pnpm install
    ```

2. Ensure tests pass:

    ```bash
    pnpm test
    ```

3. Check your code against linting rules:

    ```bash
    pnpm lint
    ```

4. Make any necessary corrections before submitting a pull request.

### Development Environment Information

For development, please ensure you are using Node.js version 18.18.0 and PNPM version 8.10.5.

## Scripts

Here are some useful scripts you can use in this project:

- **Build**: `pnpm build` (runs `tsc`)
- **Start**: `pnpm start` (runs `nodemon`)
- **Test**: `pnpm test` (runs `jest`)
- **Test (Watch Mode)**: `pnpm test:watch` (runs `jest --watch`)
- **Clean**: `pnpm clean` (runs `rimraf lib`)
- **Build and Clean**: `pnpm build:clean` (runs `pnpm clean && pnpm build`)
- **Lint**: `pnpm lint` (runs `eslint --fix src test`)
- **Format**: `pnpm format` (runs `prettier --config .prettierrc --write src test`)
- **Precommit**: `pnpm precommit` (runs `lint-staged`)
- **Prepare**: `pnpm prepare` (runs `husky install`)

## Style Guide

Please follow the existing coding style and structure used in the project.

## Contact

If you have questions or need further assistance, feel free to contact the project maintainer:

- [Shiv Kumar](mailto:shivy007@gmail.com)

Happy coding! 🚀
