# `markdown-query` Documentation

## Overview

Welcome to the official documentation for `markdown-query`! This comprehensive guide offers in-depth insights into the features, usage, and best practices for seamlessly integrating `markdown-query` into your projects.

Explore the extensive capabilities of `markdown-query` through the following API references:

[API Reference](#api-reference)

1. [getElementById](#getelementbyid)
2. [getElementByClassName](#getelementbyclassname)
3. [getElementsByTag](#getelementsbytag)
4. [getMarkdownLinks](#getmarkdownlinks)
5. [getMarkdownImages](#getmarkdownimages)
6. [getMarkdownCodeBlocks](#getmarkdowncodeblocks)
7. [getMarkdownList](#getmarkdownlist)
8. [getMarkdownHeaders](#getmarkdownheaders)
9. [getMarkdownCodeBlockByIndex](#getmarkdowncodeblockbyindex)
10. [getMarkdownImageAlt](#getmarkdownimagealt)
11. [updateElementById](#updateelementbyid)
12. [updateElementByClassName](#updateelementbyclassname)
13. [updateElementByTag](#updateelementbytag)
14. [updateMarkdownLink](#updatemarkdownlink)
15. [updateMarkdownImageAlt](#updatemarkdownimagealt)
16. [updateMarkdownHeaders](#updatemarkdownheaders)
17. [updateMarkdownList](#updatemarkdownlist)
18. [deleteElementById](#deleteelementbyid)
19. [deleteElementByClassName](#deleteelementbyclassname)
20. [deleteElementByTag](#deleteelementbytag)
21. [deleteMarkdownLink](#deletemarkdownlink)
22. [deleteMarkdownImage](#deletemarkdownimage)
23. [deleteMarkdownHeaders](#deletemarkdownheaders)
24. [deleteMarkdownCodeBlockByIndex](#deletemarkdowncodeblockbyindex)
25. [deleteMarkdownImageAlt](#deletemarkdownimagealt)

## Installation

To incorporate `markdown-query` into your project, follow these simple installation steps using your preferred package manager:

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

Start leveraging the power of `markdown-query` to enhance your Markdown content processing. If you have any questions or need further assistance, feel free to explore the detailed documentation. For additional support, you can reach out to us at [hello@shivkumar.me](mailto:hello@shivkumar.me).

Happy coding!

# API Reference

## `getElementById`

Retrieves the content for elements with the given ID.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `id` (type: `string`): The ID of the element to retrieve.

### Returns

- (type: `string | null`): The content of the element if found, or `null` if no element with the specified ID is found.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  <div id="example">
    This is some content.
  </div>
`;

const elementContent = markdownQuery.getElementById(markdownContent, 'example');
console.log(elementContent); // Output: This is some content.
```

---

## `getElementByClassName`

Retrieves an array of contents for elements with the given class name.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `className` (type: `string`): The class name of the elements to retrieve.

### Returns

- (type: `string[]`): An array of contents of elements with the specified class name.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  <div class="example">First content</div>
  <div class="example">Second content</div>
`;

const elementsContent = markdownQuery.getElementByClassName(markdownContent, 'example');
console.log(elementsContent);
// Output: [ 'First content', 'Second content' ]
```

---

## `getElementsByTag`

Retrieves an array of contents for elements with the given tag name.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `tagName` (type: `string`): The tag name of the elements to retrieve.

### Returns

- (type: `string[]`): An array of contents of elements with the specified tag name.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  <h2>This is a heading</h2>
  <p>This is a paragraph</p>
  <h3>Another heading</h3>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
`;

const elementsContent = markdownQuery.getElementsByTag(markdownContent, 'h2');
console.log(elementsContent);
// Output: [ 'This is a heading' ]
```

---

## `getMarkdownLinks`

Retrieves an array of links from the given Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to extract links from.

### Returns

- (type: `Array<{ text: string; url: string }>`): An array of objects representing the links, containing `text` and `url` properties.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  This is a [sample link](https://example.com) in Markdown.
  Also, visit [GitHub](https://github.com) for more information.
`;

const links = markdownQuery.getMarkdownLinks(markdownContent);
console.log(links);
// Output: [ { text: 'sample link', url: 'https://example.com' }, { text: 'GitHub', url: 'https://github.com' } ]
```

---

## `getMarkdownImages`

Retrieves an array of images from the given Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to extract images from.

### Returns

- (type: `Array<{ alt: string; url: string }>`): An array of objects representing the images, containing `alt` (alternative text) and `url` properties.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  This is an image: ![Alt Text](https://example.com/image.jpg)
  Another image without alt text: ![](https://example.com/another-image.jpg)
`;

const images = markdownQuery.getMarkdownImages(markdownContent);
console.log(images);
// Output: [ { alt: 'Alt Text', url: 'https://example.com/image.jpg' }, { alt: '', url: 'https://example.com/another-image.jpg' } ]
```

---

## `getMarkdownCodeBlocks`

Retrieves an array of code blocks from the given Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to extract code blocks from.

### Returns

- (type: `string[]`): An array of strings, where each string represents a code block.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  Here is a code block:
  \`\`\`javascript
  const example = 'Hello, world!';
  console.log(example);
  \`\`\`

  Another code block:
  \`\`\`python
  print('This is Python code')
  \`\`\`
`;

const codeBlocks = markdownQuery.getMarkdownCodeBlocks(markdownContent);
console.log(codeBlocks);
// Output: [ 'const example = 'Hello, world!';\nconsole.log(example);', 'print('This is Python code')' ]
```

---

### `getMarkdownList`

Retrieves an array of lists (both ordered and unordered) from the given Markdown content.

#### Parameters

- `markdownContent` (type: `string`): The Markdown content to extract lists from.

#### Returns

- (type: `Array<string>`): An array of strings, where each string represents a list item.

#### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  - Item 1
  - Item 2
  - Item 3
`;

const lists = markdownQuery.getMarkdownList(markdownContent);
console.log(lists);
// Output: [ 'Item 1', 'Item 2', 'Item 3' ]
```

---

### `getMarkdownHeaders`

Retrieves an array of headers from the given Markdown content.

#### Parameters

- `markdownContent` (type: `string`): The Markdown content to extract headers from.

#### Returns

- (type: `Array<string>`): An array of strings, where each string represents a header.

#### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  # Header 1
  ## Header 2
  ### Header 3
`;

const headers = markdownQuery.getMarkdownHeaders(markdownContent);
console.log(headers);
// Output: [ 'Header 1', 'Header 2', 'Header 3' ]
```

---

### `getMarkdownCodeBlockByIndex`

Retrieves a specific code block by index from the given Markdown content.

#### Parameters

- `markdownContent` (type: `string`): The Markdown content to extract code blocks from.
- `index` (type: `number`): The index of the code block to retrieve.

#### Returns

- (type: `string | null`): The content of the code block if found, or `null` if the index is out of bounds.

#### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  \`\`\`javascript
  const example = 'Hello, world!';
  console.log(example);
  \`\`\`

  \`\`\`python
  print('This is Python code')
  \`\`\`
`;

const codeBlock = markdownQuery.getMarkdownCodeBlockByIndex(markdownContent, 1);
console.log(codeBlock);
// Output: print('This is Python code')
```

---

### `getMarkdownImageAlt`

Retrieves an array of alt text for images from the given Markdown content.

#### Parameters

- `markdownContent` (type: `string`): The Markdown content to extract image alt text from.

#### Returns

- (type: `Array<string>`): An array of strings, where each string represents the alt text of an image.

#### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  Some text with an image: ![Alt Text 1](https://example.com/image1.jpg)

  Another image without alt text: ![](https://example.com/image2.jpg)
`;

const altTexts = markdownQuery.getMarkdownImageAlt(markdownContent);
console.log(altTexts);
// Output: [ 'Alt Text 1', '' ]
```

---

## `updateElementById`

Updates the content for an element with the given ID in the provided Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `id` (type: `string`): The ID of the element to update.
- `newContent` (type: `string`): The new content to set for the element.

### Returns

- (type: `string`): The updated Markdown content.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  <div id="example">
    This is the old content.
  </div>
`;

const updatedContent = markdownQuery.updateElementById(markdownContent, 'example', 'This is the new content.');
console.log(updatedContent);
// Output:
// <div id="example">
//   This is the new content.
// </div>
```

---

## `updateElementByClassName`

Updates the content for elements with the given class name in the provided Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `className` (type: `string`): The class name of the elements to update.
- `newContent` (type: `string`): The new content to set for the elements.

### Returns

- (type: `string`): The updated Markdown content.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  <div class="example">Old content 1</div>
  <div class="example">Old content 2</div>
`;

const updatedContent = markdownQuery.updateElementByClassName(markdownContent, 'example', 'New content');
console.log(updatedContent);
// Output:
// <div class="example">New content</div>
// <div class="example">New content</div>
```

---

## `updateElementByTag`

Updates the content for elements with the given tag name in the provided Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `tagName` (type: `string`): The tag name of the elements to update.
- `newContent` (type: `string`): The new content to set for the elements.

### Returns

- (type: `string`): The updated Markdown content.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  <h2>Old heading 1</h2>
  <h2>Old heading 2</h2>
`;

const updatedContent = markdownQuery.updateElementByTag(markdownContent, 'h2', 'New heading');
console.log(updatedContent);
// Output:
// <h2>New heading</h2>
// <h2>New heading</h2>
```

---

## `updateMarkdownLink`

Updates the URL or text for a link in the given Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content containing the link to be updated.
- `oldLink` (type: `string`): The current URL or text of the link to update.
- `newLink` (type: `string`): The new URL or text to set for the link.

### Returns

- (type: `string`): The updated Markdown content.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  This is a [sample link](https://example.com) in Markdown.
  Also, visit [GitHub](https://github.com) for more information.
`;

const updatedContent = markdownQuery.updateMarkdownLink(markdownContent, 'https://example.com', 'New Link');
console.log(updatedContent);
// Output:
// This is a [New Link](https://example.com) in Markdown.
// Also, visit [GitHub](https://github.com) for more information.
```

---

## `updateMarkdownImageAlt`

Updates the alt text for an image in the given Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content containing the image to be updated.
- `imageUrl` (type: `string`): The URL of the image to update.
- `newAltText` (type: `string`): The new alt text to set for the image.

### Returns

- (type: `string`): The updated Markdown content.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  Some text with an image:
  ![Old Alt Text](https://example.com/old-image.jpg)

  More content...
`;

const updatedContent = markdownQuery.updateMarkdownImageAlt(markdownContent, 'https://example.com/old-image.jpg', 'New Alt Text');
console.log(updatedContent);
// Output:
// Some text with an image:
// ![New Alt Text](https://example.com/old-image.jpg)
//
// More content...
```

---

## `updateMarkdownHeaders`

Updates headers in the given Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content containing headers to be updated.
- `oldHeader` (type: `string`): The existing header text to be replaced.
- `newHeader` (type: `string`): The new header text to replace the existing header.

### Returns

- (type: `string`): The updated Markdown content.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  # Old Header 1
  ## Old Header 2
  ### Old Header 3
`;

const updatedContent = markdownQuery.updateMarkdownHeaders(markdownContent, 'Old Header 2', 'New Header 2');
console.log(updatedContent);
// Output:
//   # Old Header 1
//   ## New Header 2
//   ### Old Header 3
```

This method allows you to update headers in the provided Markdown content. It searches for the specified old header text and replaces it with the new header text, leaving the rest of the content unchanged if no matching headers are found.

---

## `updateMarkdownList`

Updates lists in the given Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content containing lists to be updated.
- `oldList` (type: `string`): The existing list item text to be replaced.
- `newList` (type: `string`): The new list item text to replace the existing list item.

### Returns

- (type: `string`): The updated Markdown content.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  - Item 1
  - Item 2
  - Item 3
`;

const updatedContent = markdownQuery.updateMarkdownList(markdownContent, 'Item 2', 'New Item 2');
console.log(updatedContent);
// Output:
//   - Item 1
//   - New Item 2
//   - Item 3
```

This method allows you to update lists in the provided Markdown content. It searches for the specified old list item text and replaces it with the new list item text, leaving the rest of the content unchanged if no matching list items are found.

---

## `deleteElementById`

Deletes the element with the given ID from the provided Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `id` (type: `string`): The ID of the element to delete.

### Returns

- (type: `string`): The updated Markdown content with the specified element removed.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  <div id="example">
    This is the content to be deleted.
  </div>
`;

const updatedContent = markdownQuery.deleteElementById(markdownContent, 'example');
console.log(updatedContent);
// Output: (empty string)
```

---

## `deleteElementByClassName`

Deletes elements with the given class name from the provided Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `className` (type: `string`): The class name of the elements to delete.

### Returns

- (type: `string`): The updated Markdown content with the specified elements removed.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  <div class="example">Content 1</div>
  <div class="example">Content 2</div>
`;

const updatedContent = markdownQuery.deleteElementByClassName(markdownContent, 'example');
console.log(updatedContent);
// Output: (empty string)
```

---

## `deleteElementByTag`

Deletes elements with the given tag name from the provided Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `tagName` (type: `string`): The tag name of the elements to delete.

### Returns

- (type: `string`): The updated Markdown content with the specified elements removed.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  <h2>Heading 1</h2>
  <h2>Heading 2</h2>
`;

const updatedContent = markdownQuery.deleteElementByTag(markdownContent, 'h2');
console.log(updatedContent);
// Output: (empty string)
```

---

## `deleteMarkdownLink`

Deletes a link with the given URL or text from the provided Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `link` (type: `string`): The URL or text of the link to delete.

### Returns

- (type: `string`): The updated Markdown content with the specified link removed.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  This is a [sample link](https://example.com) in Markdown.
  Also, visit [GitHub](https://github.com) for more information.
`;

const updatedContent = markdownQuery.deleteMarkdownLink(markdownContent, 'https://example.com');
console.log(updatedContent);
// Output: Also, visit [GitHub](https://github.com) for more information.
```

---

## `deleteMarkdownImage`

Deletes an image with the given URL from the provided Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content to search within.
- `imageUrl` (type: `string`): The URL of the image to delete.

### Returns

- (type: `string`): The updated Markdown content with the specified image removed.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  Some text with an image:
  ![Alt Text](https://example.com/image.jpg)

  More content...
`;

const updatedContent = markdownQuery.deleteMarkdownImage(markdownContent, 'https://example.com/image.jpg');
console.log(updatedContent);
// Output: More content...
```

---

## `deleteMarkdownHeaders`

Deletes headers with the specified level from the given Markdown content.

### Parameters

- `markdownContent` (type: `string`): The Markdown content containing the headers to be deleted.
- `headerLevel` (type: `number`): The level of headers to be deleted.

### Returns

- (type: `string`): The updated Markdown content after removing headers with the specified level.

### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  # Header 1
  Some text here.

  ## Header 2
  More content.

  ### Header 3
  Additional details.
`;

const updatedContent = markdownQuery.deleteMarkdownHeaders(markdownContent, 2);
console.log(updatedContent);
// Output:
// # Header 1
// Some text here.
//
// ### Header 3
// Additional details.
```

This method allows you to delete headers of a specific level from the provided Markdown content. It searches for headers with the specified level and removes them. If no headers with the given level are found, the original Markdown content is returned unchanged.

---

### `deleteMarkdownCodeBlockByIndex`

Deletes a specific code block by index from the given Markdown content.

#### Parameters

- `markdownContent` (type: `string`): The Markdown content to remove code blocks from.
- `index` (type: `number`): The index of the code block to delete.

#### Returns

- (type: `string`): The updated Markdown content after removing the specified code block.

#### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  \`\`\`javascript
  const example = 'Hello, world!';
  console.log(example);
  \`\`\`

  \`\`\`python
  print('This is Python code')
  \`\`\`
`;

const updatedContent = markdownQuery.deleteMarkdownCodeBlockByIndex(markdownContent, 0);
console.log(updatedContent);
// Output:
//   \`\`\`python
//   print('This is Python code')
//   \`\`\`
```

---

### `deleteMarkdownImageAlt`

Deletes alt text for images from the given Markdown content.

#### Parameters

- `markdownContent` (type: `string`): The Markdown content to remove image alt text from.

#### Returns

- (type: `string`): The updated Markdown content after removing alt text for images.

#### Example

```typescript
import { markdownQuery } from 'markdown-query';

const markdownContent = `
  Some text with an image: ![Alt Text 1](https://example.com/image1.jpg)

  Another image without alt text: ![](https://example.com/image2.jpg)
`;

const updatedContent = markdownQuery.deleteMarkdownImageAlt(markdownContent);
console.log(updatedContent);
// Output:
//   Some text with an image: ![](https://example.com/image1.jpg)
//
//   Another image without alt text: ![](https://example.com/image2.jpg)
```
