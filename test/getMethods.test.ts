import { markdownQuery } from '../src'

describe('Get markdown methods from markdownQuery', () => {
    describe('getElementById', () => {
        it('should retrieve content for the specified ID', () => {
            const markdownContent = `
                  <div id="testId">
                    This is the content for the test ID.
                  </div>
                  <div id="anotherId">
                    This is another content.
                  </div>
                `
            const id = 'testId'
            const result = markdownQuery.getElementById(markdownContent, id)
            expect(result).toEqual('This is the content for the test ID.')
        })

        it('should return null for non-existing ID', () => {
            const markdownContent = `
                  <div id="testId">
                    This is the content for the test ID.
                  </div>
                  <div id="anotherId">
                    This is another content.
                  </div>
                `
            const id = 'nonExistingId'
            const result = markdownQuery.getElementById(markdownContent, id)
            expect(result).toBeNull()
        })
    })

    describe('getElementByClassName', () => {
        it('should retrieve contents for the specified class name', () => {
            const markdownContent = `
                  <div class="testClass">
                    Content for testClass 1.
                  </div>
                  <div class="testClass">
                    Content for testClass 2.
                  </div>
                  <div class="anotherClass">
                    Content for anotherClass.
                  </div>
                `

            const className = 'testClass'
            const result = markdownQuery.getElementByClassName(markdownContent, className)
            expect(result).toEqual(['Content for testClass 1.', 'Content for testClass 2.'])
        })

        it('should return empty array for non-existing class name', () => {
            const markdownContent = `
                <div class="testClass">
                  Content for testClass 1.
                </div>
                <div class="testClass">
                  Content for testClass 2.
                </div>
                <div class="anotherClass">
                  Content for anotherClass.
                </div>
              `

            const className = 'nonExistingClass'
            const result = markdownQuery.getElementByClassName(markdownContent, className)
            expect(result).toEqual([])
            expect(result).toHaveLength(0)
        })
    })

    describe('getElementsByTag', () => {
        it('should retrieve contents for the specified tag name', () => {
            const markdownContent = `
                  <p>
                    Content for paragraph 1.
                  </p>
                  <p>
                    Content for paragraph 2.
                  </p>
                  <div>
                    Content for div.
                  </div>
                `

            const tagName = 'p'
            const result = markdownQuery.getElementsByTag(markdownContent, tagName)

            expect(result).toEqual(['Content for paragraph 1.', 'Content for paragraph 2.'])
        })

        it('should return empty array for non-existing tag name', () => {
            const markdownContent = `
                <p>
                  Content for paragraph 1.
                </p>
                <p>
                  Content for paragraph 2.
                </p>
                <div>
                  Content for div.
                </div>
              `

            const tagName = 'span'
            const result = markdownQuery.getElementsByTag(markdownContent, tagName)

            expect(result).toEqual([])
        })
    })

    describe('getMarkdownLinks', () => {
        it('should retrieve links from the given Markdown content', () => {
            const markdownContent = `
                  [Link 1](https://example.com/link1)
                  Some text with [Link 2](https://example.com/link2).
                  [Link 3](https://example.com/link3) at the end.
                `

            const result = markdownQuery.getMarkdownLinks(markdownContent)

            expect(result).toEqual([
                { text: 'Link 1', url: 'https://example.com/link1' },
                { text: 'Link 2', url: 'https://example.com/link2' },
                { text: 'Link 3', url: 'https://example.com/link3' }
            ])
        })

        it('should handle standalone URLs without text', () => {
            const markdownContent = `
                  Some text with https://example.com/standalone-url
                `

            const result = markdownQuery.getMarkdownLinks(markdownContent)

            expect(result).toEqual([{ text: '', url: 'https://example.com/standalone-url' }])
        })

        it('should handle various Markdown link formats', () => {
            const markdownContent = `
                  [Link 1](https://example.com/link1)
                  [Link 2 Test ](https://example.com/link2)
                  ![Image Link](https://example.com/image-link.jpg)
                `

            const result = markdownQuery.getMarkdownLinks(markdownContent)

            expect(result).toEqual([
                { text: 'Link 1', url: 'https://example.com/link1' },
                { text: 'Link 2 Test', url: 'https://example.com/link2' },
                { text: 'Image Link', url: 'https://example.com/image-link.jpg' }
            ])
        })
    })

    describe('getMarkdownImages', () => {
        it('should retrieve images from the given Markdown content', () => {
            const markdownContent = `
          ![Image 1](https://example.com/image1.jpg)
          Some text with ![Image 2](https://example.com/image2.png).
          ![Image 3](https://example.com/image3.gif) at the end.
        `

            const result = markdownQuery.getMarkdownImages(markdownContent)

            expect(result).toEqual([
                { alt: 'Image 1', url: 'https://example.com/image1.jpg' },
                { alt: 'Image 2', url: 'https://example.com/image2.png' },
                { alt: 'Image 3', url: 'https://example.com/image3.gif' }
            ])
        })

        it('should handle images without alternative text', () => {
            const markdownContent = `
          Some text with ![](https://example.com/no-alt.jpg).
        `

            const result = markdownQuery.getMarkdownImages(markdownContent)

            expect(result).toEqual([{ alt: '', url: 'https://example.com/no-alt.jpg' }])
        })
    })

    describe('getMarkdownCodeBlocks', () => {
        it('should retrieve an array of code blocks from Markdown content', () => {
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
      
Yet another JavaScript code block:
\`\`\`javascript
const example = 'Hello, world!';
console.log(example);
\`\`\`
`

            const codeBlocks = markdownQuery.getMarkdownCodeBlocks(markdownContent)

            expect(codeBlocks).toEqual([
                "```javascript\nconst example = 'Hello, world!';\nconsole.log(example);\n```",
                "```python\nprint('This is Python code')\n```",
                "```javascript\nconst example = 'Hello, world!';\nconsole.log(example);\n```"
            ])
            expect(codeBlocks).toHaveLength(3)
        })

        it('should handle empty code blocks', () => {
            const markdownContent = `
\`\`\`javascript
\`\`\`
      
\`\`\`python
\`\`\`
`

            const codeBlocks = markdownQuery.getMarkdownCodeBlocks(markdownContent)

            expect(codeBlocks).toEqual(['```javascript\n```', '```python\n```'])
            expect(codeBlocks).toHaveLength(2)
        })

        it('should handle no code blocks', () => {
            const markdownContent = `
            This is not a code block.
          `

            const codeBlocks = markdownQuery.getMarkdownCodeBlocks(markdownContent)

            expect(codeBlocks).toEqual([])
            expect(codeBlocks).toHaveLength(0)
        })
    })

    describe('getMarkdownList', () => {
        it('should retrieve an array of list items from Markdown content', () => {
            const markdownContent = `
        Some text
          - Item 1
          - Item 2
          - Item 3
        Some other random test
        `

            const listItems = markdownQuery.getMarkdownList(markdownContent)

            expect(listItems).toEqual(['Item 1', 'Item 2', 'Item 3'])
            expect(listItems).toHaveLength(3)
        })

        it('should handle nested list items and return an array of strings', () => {
            const markdownContent = `
            # Header 1
                        
            - Item 1
                - Subitem 1
                - Subitem 2
            - Item 2
            - Item 3
                      
              #Footer
                      `

            const listItems = markdownQuery.getMarkdownList(markdownContent)

            expect(listItems).toEqual(['Item 1', 'Subitem 1', 'Subitem 2', 'Item 2', 'Item 3'])
            expect(listItems).toHaveLength(5)
        })

        it('should handle ordered list items and return an array of strings', () => {
            const markdownContent = `
            1. First item
            2. Second item
            3. Third item
          `

            const listItems = markdownQuery.getMarkdownList(markdownContent)

            expect(listItems).toEqual(['First item', 'Second item', 'Third item'])
        })

        it('should return an empty array for no list items', () => {
            const markdownContent = `
            This is not a list item.
          `
            const listItems = markdownQuery.getMarkdownList(markdownContent)

            expect(listItems).toEqual([])
            expect(listItems).toHaveLength(0)
        })
    })

    describe('getMarkdownHeaders', () => {
        it('should extract all the headers', () => {
            const markdownContent = `
          # Header 1
          Some text
          
          ## Header 2
          More text
        
            ### Header 3
          Even more text
        `
            const result = markdownQuery.getMarkdownHeaders(markdownContent)
            expect(result).toHaveLength(3)
            expect(result).toEqual(['Header 1', 'Header 2', 'Header 3'])
        })

        it('it should extract all the headers', () => {
            const markdownContent = `
        Header 1
        Some text
        
        Header 2
        More text
      
        Header 3
        Even more text
      `
            const result = markdownQuery.getMarkdownHeaders(markdownContent)
            expect(result).toHaveLength(0)
            expect(result).toEqual([])
        })
    })

    describe('getMarkdownCodeBlockByIndex', () => {
        it('should extract code block by index number', () => {
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
        
Yet another JavaScript code block:
\`\`\`javascript
const example = 'Hello, world!';
console.log(example);
\`\`\`
        `

            const result1 = markdownQuery.getMarkdownCodeBlockByIndex(markdownContent, 1)
            expect(result1).toEqual("```python\nprint('This is Python code')\n```")
            const result2 = markdownQuery.getMarkdownCodeBlockByIndex(markdownContent, 2)
            expect(result2).toEqual("```javascript\nconst example = 'Hello, world!';\nconsole.log(example);\n```")
        })

        it('should return null for negative index', () => {
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
                  
          Yet another JavaScript code block:
          \`\`\`javascript
          const example = 'Hello, world!';
          console.log(example);
          \`\`\`
                  `

            const result = markdownQuery.getMarkdownCodeBlockByIndex(markdownContent, -1)
            expect(result).toEqual(null)
            const result1 = markdownQuery.getMarkdownCodeBlockByIndex(markdownContent, 5)
            expect(result1).toBeNull()
        })
    })

    describe('getMarkdownImageAlt', () => {
        it('should retrieve the alt text for a specified image URL', () => {
            const markdownContent = `
          Here is an image:
          ![Alt Text 1](https://example.com/image1.jpg)
    
          Another image:
          ![Alt Text 2](https://example.com/image2.jpg)
        `
            const imageUrlToFind = 'https://example.com/image2.jpg'
            const altText = markdownQuery.getMarkdownImageAlt(markdownContent, imageUrlToFind)
            expect(altText).toEqual('Alt Text 2')
        })

        it('should retrieve the blank alt text for a specified image URL', () => {
            const markdownContent = `
        Here is an image:
        ![Alt Text 1](https://example.com/image1.jpg)
  
        Another image:
        ![](https://example.com/image2.jpg)
      `
            const imageUrlToFind = 'https://example.com/image2.jpg'
            const altText = markdownQuery.getMarkdownImageAlt(markdownContent, imageUrlToFind)
            expect(altText).toEqual('')
        })

        it('should return null for an image URL that is not found', () => {
            const markdownContent = `
          Here is an image:
          ![Alt Text 1](https://example.com/image1.jpg)
    
          Another image:
          ![Alt Text 2](https://example.com/image2.jpg)
        `

            const imageUrlNotInContent = 'https://example.com/notfound.jpg'
            const altText = markdownQuery.getMarkdownImageAlt(markdownContent, imageUrlNotInContent)
            expect(altText).toBeNull()
        })
    })
})
