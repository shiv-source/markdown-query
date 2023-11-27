import { markdownQuery } from '../src'

describe('Update markdown methods from markdownQuery', () => {
    describe('updateElementById', () => {
        it('should update the content of an element by ID', () => {
            const markdownContent = `
<div id="testId">
Old content for testId.
</div>
<div id="anotherId">
Content for anotherId.
</div>`

            const id = 'testId'
            const newContent = 'New content for testId.'
            const result = markdownQuery.updateElementById(markdownContent, id, newContent)

            expect(result).toContain('<div id="testId">\nNew content for testId.\n</div>')
            expect(result).toContain('<div id="anotherId">\nContent for anotherId.\n</div>')
        })

        it('should handle non-existing ID without modifying the content', () => {
            const markdownContent = `
<div id="existingId">
Content for existingId.
</div>
`

            const id = 'nonExistingId'
            const newContent = 'New content for nonExistingId.'
            const result = markdownQuery.updateElementById(markdownContent, id, newContent)

            expect(result).toContain('<div id="existingId">\nContent for existingId.\n</div>')
        })
    })

    describe('updateElementByClassName', () => {
        it('should update elements with the given class name in the Markdown content', () => {
            const markdownContent = `
<div class="my-class">Old content</div>
<div class="other-class">Some content</div>
`

            const className = 'my-class'

            const newContent = 'New content'

            const updatedMarkdown = markdownQuery.updateElementByClassName(markdownContent, className, newContent)

            const expectedUpdatedMarkdown = `
<div class="my-class">
New content
</div>
<div class="other-class">Some content</div>
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should handle multiple occurrences of elements with the given class name', () => {
            const markdownContent = `
<div class="my-class">Old content</div>
<div class="my-class">Another old content</div>
`

            const className = 'my-class'

            const newContent = 'New content'

            const updatedMarkdown = markdownQuery.updateElementByClassName(markdownContent, className, newContent)
            const expectedUpdatedMarkdown = `
<div class="my-class">
New content
</div>
<div class="my-class">
New content
</div>
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })
    })

    describe('updateElementByTag', () => {
        it('should update elements with the given tag name in the Markdown content', () => {
            const markdownContent = `
<p>Old content</p>
<div>Some content
</div>
`

            const tagName = 'div'

            const newContent = 'New content'

            const updatedMarkdown = markdownQuery.updateElementByTag(markdownContent, tagName, newContent)

            const expectedUpdatedMarkdown = `
<p>Old content</p>
<div>
New content
</div>
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should handle multiple occurrences of elements with the given tag name', () => {
            const markdownContent = `
<div>Old content</div>
<div>Another old content</div>
`

            const tagName = 'div'

            const newContent = 'New content'

            const updatedMarkdown = markdownQuery.updateElementByTag(markdownContent, tagName, newContent)

            const expectedUpdatedMarkdown = `
<div>
New content
</div>
<div>
New content
</div>
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })
    })

    describe('updateMarkdownLink', () => {
        it('should return the original match when the URL does not match', () => {
            const markdownContent = `
Some text with a link: [Old Link Text](https://example.com/old)
`
            const oldUrl = 'https://nonexistent.com'
            const newUrl = 'https://example.com/new'
            const newText = 'New Link Text'

            const matchReturnValue = markdownQuery.updateMarkdownLink(markdownContent, oldUrl, newUrl, newText)

            expect(matchReturnValue).toEqual(markdownContent)
        })

        it('should update the specified link in the Markdown content', () => {
            const markdownContent = `
              Some text with a link: [Old Link Text](https://example.com/old)
            `
            const oldUrl = 'https://example.com/old'
            const newUrl = 'https://example.com/new'
            const updatedMarkdown = markdownQuery.updateMarkdownLink(markdownContent, oldUrl, newUrl)
            const expectedUpdatedMarkdown = `
              Some text with a link: [Old Link Text](https://example.com/new)
            `
            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
            expect(updatedMarkdown).toContain('[Old Link Text](https://example.com/new)')
        })

        it('should update link for multiple occurrences of the same URL', () => {
            const markdownContent = `
              [Link Text](https://example.com/old)
              [Link Text](https://example.com/old)
            `
            const oldUrl = 'https://example.com/old'
            const newUrl = 'https://example.com/new'
            const updatedMarkdown = markdownQuery.updateMarkdownLink(markdownContent, oldUrl, newUrl)
            const expectedUpdatedMarkdown = `
              [Link Text](https://example.com/new)
              [Link Text](https://example.com/new)
            `
            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
            expect(updatedMarkdown).toContain('[Link Text](https://example.com/new)')
        })

        it('should update link with new text if specified', () => {
            const markdownContent = `
              [Old Link Text](https://example.com/old)
            `
            const oldUrl = 'https://example.com/old'
            const newUrl = 'https://example.com/new'
            const newText = 'New Link Text'
            const updatedMarkdown = markdownQuery.updateMarkdownLink(markdownContent, oldUrl, newUrl, newText)
            const expectedUpdatedMarkdown = `
              [New Link Text](https://example.com/new)
            `
            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
            expect(updatedMarkdown).toContain('[New Link Text](https://example.com/new)')
        })

        it('should not handle other types of Markdown link syntax', () => {
            const markdownContent = `
              Some text with a link: [Old Link Text][linkRef]
              [linkRef]: https://example.com/old
            `
            const oldUrl = 'https://example.com/old'
            const newUrl = 'https://example.com/new'
            const updatedMarkdown = markdownQuery.updateMarkdownLink(markdownContent, oldUrl, newUrl)

            expect(updatedMarkdown).toEqual(markdownContent)
        })

        it('should handle Markdown content with no links', () => {
            const markdownContent = `
              Some plain text without links.
            `
            const oldUrl = 'https://example.com/old'
            const newUrl = 'https://example.com/new'
            const updatedMarkdown = markdownQuery.updateMarkdownLink(markdownContent, oldUrl, newUrl)
            expect(updatedMarkdown).toEqual(markdownContent)
        })

        it('should return the original match when there are no links', () => {
            const markdownContent = `
              Some plain text without links.
            `
            const oldUrl = 'https://example.com/old'
            const newUrl = 'https://example.com/new'
            const matchReturnValue = markdownQuery.updateMarkdownLink(markdownContent, oldUrl, newUrl)
            expect(matchReturnValue).toEqual(markdownContent)
        })
    })

    describe('updateMarkdownImageAlt', () => {
        it('should return the unchanged Markdown content if the image URL is not found', () => {
            const markdownContent = `
      Some text with an image: ![Alt Text](https://example.com/image.jpg)
    `
            const imageUrl = 'https://notfound.com/image.jpg'
            const newAltText = 'New Alt Text'
            const updatedMarkdown = markdownQuery.updateMarkdownImageAlt(markdownContent, imageUrl, newAltText)
            expect(updatedMarkdown).toEqual(markdownContent)
        })

        it('should update the alt text for the specified image in the Markdown content', () => {
            const markdownContent = `
      Some text with an image: ![Old Alt Text](https://example.com/image.jpg)
    `
            const imageUrl = 'https://example.com/image.jpg'
            const newAltText = 'New Alt Text'
            const updatedMarkdown = markdownQuery.updateMarkdownImageAlt(markdownContent, imageUrl, newAltText)
            const expectedUpdatedMarkdown = `
      Some text with an image: ![New Alt Text](https://example.com/image.jpg)
    `
            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should update alt text for multiple occurrences of the same image URL', () => {
            const markdownContent = `
      ![Alt Text](https://example.com/image.jpg)
      ![Alt Text](https://example.com/image.jpg)
    `
            const imageUrl = 'https://example.com/image.jpg'
            const newAltText = 'New Alt Text'
            const updatedMarkdown = markdownQuery.updateMarkdownImageAlt(markdownContent, imageUrl, newAltText)
            const expectedUpdatedMarkdown = `
      ![New Alt Text](https://example.com/image.jpg)
      ![New Alt Text](https://example.com/image.jpg)
    `
            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should not handle other types of Markdown image syntax', () => {
            const markdownContent = `
      Some text with an image: ![Old Alt Text][imageRef]
      [imageRef]: https://example.com/image.jpg
    `
            const imageUrl = 'https://example.com/image.jpg'
            const newAltText = 'New Alt Text'
            const updatedMarkdown = markdownQuery.updateMarkdownImageAlt(markdownContent, imageUrl, newAltText)

            expect(updatedMarkdown).toEqual(markdownContent)
        })

        it('should handle empty alt text in the original Markdown content', () => {
            const markdownContent = `
      Some text with an image: ![](https://example.com/image.jpg)
    `
            const imageUrl = 'https://example.com/image.jpg'
            const newAltText = 'New Alt Text'
            const updatedMarkdown = markdownQuery.updateMarkdownImageAlt(markdownContent, imageUrl, newAltText)
            const expectedUpdatedMarkdown = `
      Some text with an image: ![New Alt Text](https://example.com/image.jpg)
    `
            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should handle Markdown content with no images', () => {
            const markdownContent = `
      Some plain text without images.
    `
            const imageUrl = 'https://example.com/image.jpg'
            const newAltText = 'New Alt Text'
            const updatedMarkdown = markdownQuery.updateMarkdownImageAlt(markdownContent, imageUrl, newAltText)
            expect(updatedMarkdown).toEqual(markdownContent)
        })
    })

    describe('updateMarkdownHeaders', () => {
        it('should update the specified header in the Markdown content', () => {
            const markdownContent = `
# Header 1
## Header 2
### Header 3
`

            const oldHeader = 'Header 2'

            const newHeader = 'Updated Header 2'

            const updatedMarkdown = markdownQuery.updateMarkdownHeaders(markdownContent, oldHeader, newHeader)
            const expectedUpdatedMarkdown = `
# Header 1
##  Updated Header 2
### Header 3
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should handle multiple occurrences of headers with the same text', () => {
            const markdownContent = `
## Header 2
## Header 2
`

            const oldHeader = 'Header 2'

            const newHeader = 'Updated Header 2'

            const updatedMarkdown = markdownQuery.updateMarkdownHeaders(markdownContent, oldHeader, newHeader)

            const expectedUpdatedMarkdown = `
##  Updated Header 2
##  Updated Header 2
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })
    })

    describe('updateMarkdownList', () => {
        it('should update the specified list item in the Markdown content', () => {
            const markdownContent = `
- Item 1
- Item 2
- Item 3
`

            const oldListItem = 'Item 2'

            const newListItem = 'Updated Item 2'

            const updatedMarkdown = markdownQuery.updateMarkdownList(markdownContent, oldListItem, newListItem)
            const expectedUpdatedMarkdown = `
- Item 1
 - Updated Item 2
- Item 3
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should handle multiple occurrences of the same list item text', () => {
            const markdownContent = `
- Item 1
- Item 2
- Item 2
`

            const oldListItem = 'Item 2'

            const newListItem = 'Updated Item 2'

            const updatedMarkdown = markdownQuery.updateMarkdownList(markdownContent, oldListItem, newListItem)

            const expectedUpdatedMarkdown = `
- Item 1
 - Updated Item 2
 - Updated Item 2
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should handle other types of list item markers', () => {
            const markdownContent = `
* Item A
* Item B
`

            const oldListItem = 'Item B'

            const newListItem = 'Updated Item B'

            const updatedMarkdown = markdownQuery.updateMarkdownList(markdownContent, oldListItem, newListItem)

            const expectedUpdatedMarkdown = `
* Item A
 - Updated Item B
`

            expect(updatedMarkdown).toEqual(expectedUpdatedMarkdown)
        })

        it('should handle Markdown content with no list items', () => {
            const markdownContent = `
              Some plain text without list items.
            `

            const oldListItem = 'Item X'

            const newListItem = 'Updated Item X'

            const updatedMarkdown = markdownQuery.updateMarkdownList(markdownContent, oldListItem, newListItem)

            expect(updatedMarkdown).toEqual(markdownContent)
        })
    })
})
