# markdown-query

[![npm version](https://badge.fury.io/js/markdown-query.svg)](https://www.npmjs.com/package/markdown-query)
[![npm](https://img.shields.io/npm/dt/markdown-query.svg)](https://www.npmjs.com/package/markdown-query)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)

`markdown-query` is a versatile library for querying, updating, and manipulating Markdown content in JavaScript/TypeScript applications. It provides a set of methods to perform common tasks such as retrieving elements by ID, class, or tag, updating content, and more.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
   - [Basic Example](#basic-example)
   - [Advanced Examples](#advanced-examples)
      - [Updating Content](#updating-content)
      - [Deleting Content](#deleting-content)
3. [API Reference](#api-reference)
   - [getElementById](#getelementbyid)
   - [getElementByClassName](#getelementbyclassname)
   - [getElementsByTag](#getelementsbytag)
   - [getMarkdownLinks](#getmarkdownlinks)
   - [getMarkdownImages](#getmarkdownimages)
   - [getMarkdownCodeBlocks](#getmarkdowncodeblocks)
   - [getMarkdownList](#getmarkdownlist)
   - [getMarkdownHeaders](#getmarkdownheaders)
   - [getMarkdownCodeBlockByIndex](#getmarkdowncodeblockbyindex)
   - [getMarkdownImageAlt](#getmarkdownimagealt)
   - [updateElementById](#updateelementbyid)
   - [updateElementByClassName](#updateelementbyclassname)
   - [updateElementByTag](#updateelementbytag)
   - [updateMarkdownLink](#updatemarkdownlink)
   - [updateMarkdownImageAlt](#updatemarkdownimagealt)
   - [updateMarkdownHeaders](#updatemarkdownheaders)
   - [updateMarkdownList](#updatemarkdownlist)
   - [deleteElementById](#deleteelementbyid)
   - [deleteElementByClassName](#deleteelementbyclassname)
   - [deleteElementByTag](#deleteelementbytag)
   - [deleteMarkdownLink](#deletemarkdownlink)
   - [deleteMarkdownImage](#deletemarkdownimage)
   - [deleteMarkdownHeaders](#deletemarkdownheaders)
   - [deleteMarkdownCodeBlockByIndex](#deletemarkdowncodeblockbyindex)
   - [deleteMarkdownImageAlt](#deletemarkdownimagealt)
4. [Contributing](#contributing)
5. [License](#license)
6. [Author](#author)
7. [Contact](#contact)

## Installation

You can install `markdown-query` using npm, yarn, or pnpm. Choose your preferred package manager:

### NPM

```bash
npm install markdown-query
```

### Yarn

```bash
yarn add markdown-query
```

### PNPM

```bash
pnpm add markdown-query
```

## Usage

### Basic Example

```typescript
import { MarkdownQuery } from 'markdown-query';

const markdownQuery = new MarkdownQuery();

// Example: Get element content by ID
const markdownContent = `
  <div id="example">
    This is some content.
  </div>
`;

const elementContent = markdownQuery.getElementById(markdownContent, 'example');
console.log(elementContent); // Output: This is some content.



or directly use this like 

import { MarkdownQuery } from 'markdown-query';

const markdownContent = `
  <div id="example">
    This is some content.
  </div>
`;
const elementContent = markdownQuery.getElementById(markdownContent, 'example');
console.log(elementContent); // Output: This is some content.

```

## Advanced Examples

### Updating Content

```typescript
// Update content of an element by ID
const updatedContentById = markdownQuery.updateElementById(markdownContent, 'example', 'Updated content.');
console.log(updatedContentById);

// Update alt text for an image
const imageUrl = 'https://example.com/image.jpg';
const updatedImageAlt = markdownQuery.updateMarkdownImageAlt(markdownContent, imageUrl, 'New Alt Text');
console.log(updatedImageAlt);
```

### Deleting Content

```typescript
// Delete an element by ID
const deletedContentById = markdownQuery.deleteElementById(markdownContent, 'example');
console.log(deletedContentById);

// Delete a link by URL
const linkUrl = 'https://example.com';
const deletedLink = markdownQuery.deleteMarkdownLink(markdownContent, linkUrl);
console.log(deletedLink);
```

## API Reference

For detailed information on all available methods, parameters, and examples, please refer to the [API Reference](docs/index.md).

| Method                              | Description                                                                                          |
| ----------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `getElementById`                    | Retrieves content for elements with the specified ID. Returns `null` if no element is found.         |
| `getElementByClassName`             | Retrieves an array of contents for elements with the given class name.                               |
| `getElementsByTag`                  | Retrieves an array of contents for elements with the specified tag name.                              |
| `getMarkdownLinks`                  | Retrieves an array of links (text and URL) from the Markdown content.                                  |
| `getMarkdownImages`                 | Retrieves an array of images (alt text and URL) from the Markdown content.                             |
| `getMarkdownCodeBlocks`             | Retrieves an array of code blocks from the Markdown content.                                           |
| `getMarkdownList`                   | Retrieves an array of list items from the Markdown content.                                            |
| `getMarkdownHeaders`                | Retrieves an array of headers from the Markdown content.                                               |
| `getMarkdownCodeBlockByIndex`       | Extracts a specific code block based on the index. Returns `null` if the index is out of bounds.      |
| `getMarkdownImageAlt`               | Retrieves the alt text for an image. Returns `null` if the image is not found or alt text is not available.|
| `updateElementById`                 | Updates the content of an element by ID. Returns the updated Markdown content.                         |
| `updateElementByClassName`          | Updates the content of elements with the given class name. Returns the updated Markdown content.      |
| `updateElementByTag`                | Updates the content of elements with the given tag name. Returns the updated Markdown content.        |
| `updateMarkdownLink`                | Updates a link in the Markdown content. Returns the updated Markdown content.                          |
| `updateMarkdownImageAlt`            | Updates the alt text for an image. Returns the updated Markdown content.                                |
| `updateMarkdownHeaders`             | Updates the headers in the Markdown content. Returns the updated Markdown content.                     |
| `updateMarkdownList`                | Updates list items in the Markdown content. Returns the updated Markdown content.                      |
| `deleteElementById`                 | Deletes the element with the specified ID. Returns Markdown content with the element removed.          |
| `deleteElementByClassName`          | Deletes elements with the specified class name. Returns Markdown content with the elements removed.    |
| `deleteElementByTag`                | Deletes elements with the specified tag name. Returns Markdown content with the elements removed.      |
| `deleteMarkdownLink`                | Deletes a link with the specified URL. Returns Markdown content with the link removed.                  |
| `deleteMarkdownImage`               | Deletes an image with the specified URL. Returns Markdown content with the image removed.               |
| `deleteMarkdownHeaders`             | Deletes headers with the specified text. Returns Markdown content with the headers removed.            |
| `deleteMarkdownCodeBlockByIndex`    | Deletes a code block at the specified index. Returns Markdown content with the code block removed.      |
| `deleteMarkdownImageAlt`            | Deletes the alt text for an image. Returns updated Markdown content.                                    |

## Contributing

We welcome contributions! Before contributing, please read our [contribution guidelines](CONTRIBUTING.md) and adhere to our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

[Shiv Kumar](https://shivkumar.me)

![Shiv Kumar](https://avatars.githubusercontent.com/u/56552766?v=4&s=100)

## Contact

For any inquiries or questions, feel free to reach out at [hello@shivkumar.me](mailto:hello@shivkumar.me).
