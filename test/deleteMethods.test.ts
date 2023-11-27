import { markdownQuery } from '../src'

describe('Delete markdown methods from markdownQuery', () => {
    describe('deleteElementById', () => {
        it('should delete the element with the specified ID', () => {
            const markdownContent = `<div id="testId">
            Content for testId.
            </div>
            <div id="anotherId">
            Content for anotherId.
            </div>`

            const id = 'testId'
            const result = markdownQuery.deleteElementById(markdownContent, id)

            expect(result).not.toContain('<div id="testId">')
            expect(result).toEqual(`
            <div id="anotherId">
            Content for anotherId.
            </div>`)
        })

        it('should handle non-existing ID without modifying the content', () => {
            const markdownContent = `
            <div id="existingId">
            Content for existingId.
            </div>
            `

            const id = 'nonExistingId'
            const result = markdownQuery.deleteElementById(markdownContent, id)

            expect(result).toEqual(`
            <div id="existingId">
            Content for existingId.
            </div>
            `)
        })
    })

    describe('deleteElementByClassName', () => {
        it('should delete elements with the specified class name in the Markdown content', () => {
            const markdownContent = `
<div class="delete-me">Content to be deleted</div>
<div class="keep-me">Content to keep</div>
`

            const className = 'delete-me'

            const updatedMarkdown = markdownQuery.deleteElementByClassName(markdownContent, className)
            const expectedUpdatedMarkdown = `

<div class="keep-me">Content to keep</div>
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should handle multiple occurrences of elements with the specified class name', () => {
            const markdownContent = `
<div class="delete-me">Content to be deleted</div>
<div class="delete-me">Another content to be deleted</div>
<div class="keep-me">Content to keep</div>
`

            const className = 'delete-me'

            const updatedMarkdown = markdownQuery.deleteElementByClassName(markdownContent, className)

            const expectedUpdatedMarkdown = `


<div class="keep-me">Content to keep</div>
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })
    })

    describe('deleteElementByTag', () => {
        it('should delete elements with the specified tag name from Markdown content', () => {
            const markdownContent = `
            <div>This is a div element.</div>
            <p>This is a paragraph element.</p>
            <span>This is a span element.</span>`

            const updatedContent = markdownQuery.deleteElementByTag(markdownContent, 'p')

            expect(updatedContent).toEqual(`
            <div>This is a div element.</div>
            
            <span>This is a span element.</span>`)
        })

        it('should only handle case sensitive tag names', () => {
            const markdownContent = `
            <Div>This is a div element.</Div>
            <P>This is a paragraph element.</P>
            <Span>This is a span element.</Span>
            `

            const updatedContent = markdownQuery.deleteElementByTag(markdownContent, 'div')

            expect(updatedContent).toEqual(`
            <Div>This is a div element.</Div>
            <P>This is a paragraph element.</P>
            <Span>This is a span element.</Span>
            `)
        })

        it('should handle empty content and return empty content', () => {
            const updatedContent = markdownQuery.deleteElementByTag('', 'div')

            expect(updatedContent).toEqual('')
        })

        it('should handle non-matching tag names and return unchanged content', () => {
            const markdownContent = `
              <div>This is a div element.</div>
              <p>This is a paragraph element.</p>
              <span>This is a span element.</span>
            `

            const updatedContent = markdownQuery.deleteElementByTag(markdownContent, 'h1')

            expect(updatedContent).toEqual(markdownContent)
        })
    })

    describe('deleteMarkdownLink', () => {
        it('should delete the link with the specified URL from Markdown content', () => {
            const markdownContent = `
              [Google](https://www.google.com) is a search engine.
              [GitHub](https://github.com) is a code hosting platform.
              [LinkedIn](https://www.linkedin.com) is a professional network.
            `

            const updatedContent = markdownQuery.deleteMarkdownLink(markdownContent, 'https://github.com')

            expect(updatedContent).toEqual(`
              [Google](https://www.google.com) is a search engine.
               is a code hosting platform.
              [LinkedIn](https://www.linkedin.com) is a professional network.
            `)
        })

        it('should not handle case-insensitive URL comparison', () => {
            const markdownContent = `
              [Google](https://www.google.com) is a search engine.
              [GitHub](https://github.com) is a code hosting platform.
              [LinkedIn](https://www.linkedin.com) is a professional network.
            `

            const updatedContent = markdownQuery.deleteMarkdownLink(markdownContent, 'HTTPS://GITHUB.COM')

            expect(updatedContent).toEqual(`
              [Google](https://www.google.com) is a search engine.
              [GitHub](https://github.com) is a code hosting platform.
              [LinkedIn](https://www.linkedin.com) is a professional network.
            `)
        })

        it('should handle empty content and return empty content', () => {
            const updatedContent = markdownQuery.deleteMarkdownLink('', 'https://github.com')

            expect(updatedContent).toEqual('')
        })

        it('should handle non-matching URLs and return unchanged content', () => {
            const markdownContent = `
              [Google](https://www.google.com) is a search engine.
              [GitHub](https://github.com) is a code hosting platform.
              [LinkedIn](https://www.linkedin.com) is a professional network.
            `
            const updatedContent = markdownQuery.deleteMarkdownLink(markdownContent, 'https://example.com')
            expect(updatedContent).toEqual(markdownContent)
        })
    })

    describe('deleteMarkdownImage', () => {
        it('should delete the image with the specified URL from Markdown content', () => {
            const markdownContent = `
              Some text with an image: ![Alt Text](https://www.example.com/image.jpg)
              Another image: ![Another Image](https://www.example.com/another-image.png)
            `

            const updatedContent = markdownQuery.deleteMarkdownImage(
                markdownContent,
                'https://www.example.com/image.jpg'
            )

            expect(updatedContent).toEqual(`
              Some text with an image: 
              Another image: ![Another Image](https://www.example.com/another-image.png)
            `)
        })

        it('should not handle case-insensitive URL comparison', () => {
            const markdownContent = `
              Some text with an image: ![Alt Text](https://www.example.com/image.jpg)
              Another image: ![Another Image](https://www.example.com/another-image.png)
            `

            const updatedContent = markdownQuery.deleteMarkdownImage(
                markdownContent,
                'HTTPS://WWW.EXAMPLE.COM/IMAGE.JPG'
            )

            expect(updatedContent).toEqual(`
              Some text with an image: ![Alt Text](https://www.example.com/image.jpg)
              Another image: ![Another Image](https://www.example.com/another-image.png)
            `)
        })

        it('should handle empty content and return empty content', () => {
            const updatedContent = markdownQuery.deleteMarkdownImage('', 'https://www.example.com/image.jpg')

            expect(updatedContent).toEqual('')
        })

        it('should handle non-matching URLs and return unchanged content', () => {
            const markdownContent = `
              Some text with an image: ![Alt Text](https://www.example.com/image.jpg)
              Another image: ![Another Image](https://www.example.com/another-image.png)
            `

            const updatedContent = markdownQuery.deleteMarkdownImage(
                markdownContent,
                'https://example.com/non-matching.jpg'
            )

            expect(updatedContent).toEqual(markdownContent)
        })
    })

    describe('deleteMarkdownHeaders', () => {
        it('should delete headers with the specified text from Markdown content', () => {
            const markdownContent = `
            # First Header
            Some text under the first header.
                        
            ## Second Header
            Some text under the second header.
                        
            ### Third Header
            Some text under the third header.
            `

            const updatedContent = markdownQuery.deleteMarkdownHeaders(markdownContent, 'Second Header')

            expect(updatedContent).toEqual(`
            # First Header
            Some text under the first header.

            Some text under the second header.
                        
            ### Third Header
            Some text under the third header.
            `)
        })

        it('should not handle case-insensitive header text comparison', () => {
            const markdownContent = `
            # First Header
            Some text under the first header.
            
            ## Second Header
            Some text under the second header.
            
            ### Third Header
            Some text under the third header.
            `

            const updatedContent = markdownQuery.deleteMarkdownHeaders(markdownContent, 'THIRD HEADER')

            expect(updatedContent).toEqual(markdownContent)
        })

        it('should handle empty content and return empty content', () => {
            const updatedContent = markdownQuery.deleteMarkdownHeaders('', 'Header')

            expect(updatedContent).toEqual('')
        })

        it('should handle non-matching header text and return unchanged content', () => {
            const markdownContent = `
            # First Header
            Some text under the first header.
            
            ## Second Header
            Some text under the second header.
            
            ### Third Header
            Some text under the third header.
            `

            const updatedContent = markdownQuery.deleteMarkdownHeaders(markdownContent, 'Non-Matching Header')

            expect(updatedContent).toEqual(markdownContent)
        })
    })

    describe('deleteMarkdownCodeBlockByIndex', () => {
        it('should delete code block at the specified index from Markdown content', () => {
            const markdownContent = `
            \`\`\`javascript
            const example = 'Hello, world!';
            console.log(example);
            \`\`\`

            \`\`\`python
            print('This is Python code')
            \`\`\`
    
            \`\`\`javascript
            const example = 'Hello, user!';
            console.log(example);
            \`\`\`
            `

            const updatedContent = markdownQuery.deleteMarkdownCodeBlockByIndex(markdownContent, 1)

            expect(updatedContent).toEqual(`
            \`\`\`javascript
            const example = 'Hello, world!';
            console.log(example);
            \`\`\`

            
    
            \`\`\`javascript
            const example = 'Hello, user!';
            console.log(example);
            \`\`\`
            `)
        })

        it('should handle empty content and return empty content', () => {
            const updatedContent = markdownQuery.deleteMarkdownCodeBlockByIndex('', 0)

            expect(updatedContent).toEqual('')
        })

        it('should handle non-matching index and return unchanged content', () => {
            const markdownContent = `
                \`\`\`javascript
                const example = 'Hello, world!';
                console.log(example);
                \`\`\`
    
                \`\`\`python
                print('This is Python code')
                \`\`\`
    
                \`\`\`javascript
                const example = 'Hello, world!';
                console.log(example);
                \`\`\`
            `

            const updatedContent = markdownQuery.deleteMarkdownCodeBlockByIndex(markdownContent, 5)

            expect(updatedContent).toEqual(markdownContent)
        })
    })

    describe('deleteMarkdownImageAlt', () => {
        it('should delete alt text for the specified image URL', () => {
            const markdownContent = `
                Some text before the image.
                ![Alt Text](https://example.com/image.jpg)
                Some text after the image.
                ![Another Alt Text](https://example.com/another-image.jpg)
                `

            const imageUrlToDelete = 'https://example.com/image.jpg'

            const updatedContent = markdownQuery.deleteMarkdownImageAlt(markdownContent, imageUrlToDelete)

            expect(updatedContent).toEqual(`
                Some text before the image.
                ![](https://example.com/image.jpg)
                Some text after the image.
                ![Another Alt Text](https://example.com/another-image.jpg)
                `)
        })

        it('should handle not deleting alt text when the URL is not found', () => {
            const markdownContent = `
                Some text before the image.
                ![Alt Text](https://example.com/image.jpg)
                Some text after the image.
                ![Another Alt Text](https://example.com/another-image.jpg)
                `

            const imageUrlToDelete = 'https://example.com/non-existing-image.jpg'

            const updatedContent = markdownQuery.deleteMarkdownImageAlt(markdownContent, imageUrlToDelete)

            expect(updatedContent).toEqual(markdownContent)
        })
    })
})
