/**
 * MarkdownQuery class for querying and manipulating Markdown content.
 */
class MarkdownQuery {
    /**
     * Retrieves the content for elements with the given ID.
     *
     * @param {string} markdownContent - The Markdown content to search within.
     * @param {string} id - The ID of the element to retrieve.
     * @returns {string | null} - The content of the element if found, or `null` if no element with the specified ID is found.
     */
    getElementById(markdownContent: string, id: string): string | null {
        /* eslint-disable no-useless-escape */
        const regex = new RegExp(`<div\\s+id=["']${id}["'][^>]*>([\\s\\S]*?)<\/div>`)
        const match = markdownContent.match(regex)
        return match ? match[1].trim() : null
    }

    /**
     * Retrieves an array of contents for elements with the given class name.
     *
     * @param {string} markdownContent - The Markdown content to search within.
     * @param {string} className - The class name of the elements to retrieve.
     * @returns {string[]} - An array of contents of elements with the specified class name.
     */
    getElementByClassName(markdownContent: string, className: string): string[] {
        const regex = new RegExp(`<div\\s+class=["']${className}["'][^>]*>([\\s\\S]*?)<\/div>`, 'g')
        const elements: string[] = []

        let match
        while ((match = regex.exec(markdownContent)) !== null) {
            const contentInsideDiv = match[1].trim()
            elements.push(contentInsideDiv)
        }

        return elements
    }

    /**
     * Retrieves an array of contents for elements with the given tag name.
     *
     * @param {string} markdownContent - The Markdown content to search within.
     * @param {string} tagName - The tag name of the elements to retrieve.
     * @returns {string[]} - An array of contents of elements with the specified tag name.
     */
    getElementsByTag(markdownContent: string, tagName: string): string[] {
        const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\/${tagName}>`, 'g')
        const elements: string[] = []

        let match
        while ((match = regex.exec(markdownContent)) !== null) {
            const contentInsideTag = match[1].trim()
            elements.push(contentInsideTag)
        }

        return elements
    }

    /**
     * Retrieves an array of links from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content to extract links from.
     * @returns {Array<{ text: string; url: string }>} - An array of objects representing the links, containing `text` and `url` properties.
     */
    getMarkdownLinks(markdownContent: string): Array<{ text: string; url: string }> {
        const regex = /\[([^\]]+)\]\(([^)]+)\)|https?:\/\/[^\s)]+/gm
        const links = []

        let match
        while ((match = regex.exec(markdownContent)) !== null) {
            const linkText = match[1] || '' // For Markdown links, use the link text; for standalone URLs, use an empty string.
            const linkUrl = match[2] || match[0] // Use the URL from Markdown links; for standalone URLs, use the entire match.
            links.push({ text: linkText.trim(), url: linkUrl.trim() })
        }

        return links
    }

    /**
     * Retrieves an array of images from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content to extract images from.
     * @returns {Array<{ alt: string; url: string }>} - An array of objects representing the images, containing `alt` (alternative text) and `url` properties.
     */
    getMarkdownImages(markdownContent: string): Array<{ alt: string; url: string }> {
        const regex = /!\[([^\]]*)\]\(([^)]+)\)/gm
        const images: Array<{ alt: string; url: string }> = []

        let match
        while ((match = regex.exec(markdownContent)) !== null) {
            const altText = match[1].trim()
            const imageUrl = match[2].trim()
            images.push({ alt: altText, url: imageUrl })
        }

        return images
    }

    /**
     * Retrieves an array of code blocks from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content to extract code blocks from.
     * @returns {string[]} - An array of strings, where each string represents a code block.
     */
    getMarkdownCodeBlocks(markdownContent: string): string[] {
        const codeBlockRegex = /```([\s\S]*?)```/g
        const codeBlocks = []

        let match

        // Iterate through all matches of the code block regex
        while ((match = codeBlockRegex.exec(markdownContent)) !== null) {
            codeBlocks.push(match[0])
        }

        return codeBlocks
    }

    /**
     * Retrieves an array of list items from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content to extract list items from.
     * @returns {string[]} - An array of strings, where each string represents a list item.
     */
    getMarkdownList(markdownContent: string): string[] {
        // Regular expression to match both ordered and unordered list items in Markdown
        const listRegex = /^[\s]*([\*\-\+]|[0-9]+[.)])\s+(.*?)(?=\n([\*\-\+\s]|[0-9]+[.)]))/gms

        const listItems = []

        let match
        while ((match = listRegex.exec(markdownContent)) !== null) {
            const listItemContent = match[2].trim()
            listItems.push(listItemContent)
        }

        return listItems
    }

    /**
     * Retrieves an array of headers from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content to extract headers from.
     * @returns {string[]} - An array of strings, where each string represents a header.
     */
    getMarkdownHeaders(markdownContent: string): string[] {
        // Regular expression to match headers in Markdown
        const headerRegex = /^\s*#+\s+(.*$)/gm

        const headers = []
        let match

        // Extract all headers
        while ((match = headerRegex.exec(markdownContent)) !== null) {
            const headerContent = match[1].trim()
            headers.push(headerContent)
        }

        return headers
    }

    /**
     * Extracts a specific code block from the given Markdown content based on the index.
     *
     * @param {string} markdownContent - The Markdown content to extract the code block from.
     * @param {number} index - The index of the code block to retrieve.
     * @returns {string | null} - The code block at the specified index, or `null` if the index is out of bounds.
     */
    getMarkdownCodeBlockByIndex(markdownContent: string, index: number): string | null {
        const regex = /```([\s\S]*?)```/g

        let match
        let currentIndex = 0

        while ((match = regex.exec(markdownContent)) !== null && currentIndex++ !== index);
        return match ? match[0] : null
    }

    /**
     * Retrieves the alt text for an image in the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the image.
     * @param {string} imageUrl - The URL of the image.
     * @returns {string | null} - The alt text of the image if found, or `null` if the image is not found.
     */
    getMarkdownImageAlt(markdownContent: string, imageUrl: string): string | null {
        // Regular expression to match Markdown image syntax
        const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/gm

        let match

        // Search for the image syntax in the Markdown content
        while ((match = imageRegex.exec(markdownContent)) !== null) {
            const altText = match[1].trim()
            const currentImageUrl = match[2].trim()

            // Check if the current image URL matches the provided imageUrl
            if (currentImageUrl === imageUrl) {
                return altText
            }
        }

        return null // Image not found or alt text not available
    }

    /**
     * Updates the content of an element by ID in the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the element to be updated.
     * @param {string} id - The ID of the element to update.
     * @param {string} newContent - The new content to set for the element.
     * @returns {string} - The updated Markdown content.
     */
    updateElementById(markdownContent: string, id: string, newContent: string): string {
        const regex = new RegExp(`(<div\\s+id=["']${id}["'][^>]*>)([\\s\\S]*?)(<\/div>)`)
        const updatedContent = markdownContent.replace(regex, `$1\n${newContent}\n$3`)
        return updatedContent
    }

    /**
     * Updates the content of elements with the given class name in the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the elements to be updated.
     * @param {string} className - The class name of the elements to update.
     * @param {string} newContent - The new content to set for the elements.
     * @returns {string} - The updated Markdown content.
     */
    updateElementByClassName(markdownContent: string, className: string, newContent: string): string {
        const regex = new RegExp(`(<div\\s+class=["']${className}["'][^>]*>)([\\s\\S]*?)(<\/div>)`, 'g')
        const updatedContent = markdownContent.replace(regex, `$1\n${newContent}\n$3`)
        return updatedContent
    }

    /**
     * Updates the content of elements with the given tag name in the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the elements to be updated.
     * @param {string} tagName - The tag name of the elements to update.
     * @param {string} newContent - The new content to set for the elements.
     * @returns {string} - The updated Markdown content.
     */
    updateElementByTag(markdownContent: string, tagName: string, newContent: string): string {
        const regex = new RegExp(`(<${tagName}[^>]*>)([\\s\\S]*?)(<\/${tagName}>)`, 'g')
        const updatedContent = markdownContent.replace(regex, `$1\n${newContent}\n$3`)
        return updatedContent
    }

    /**
     * Updates the link in the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the link to be updated.
     * @param {string} oldUrl - The old URL of the link to be updated.
     * @param {string} newUrl - The new URL to set for the link.
     * @returns {string} - The updated Markdown content.
     */
    updateMarkdownLink(markdownContent: string, oldUrl: string, newUrl: string, newText?: string): string {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/gm
        const updatedContent = markdownContent.replace(regex, (match, linkText, linkUrl) => {
            if (linkUrl === oldUrl) {
                return `[${newText || linkText}](${newUrl})`
            }
            return match
        })
        return updatedContent
    }

    /**
     * Updates the alt text for an image in the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the image to be updated.
     * @param {string} imageUrl - The URL of the image to update.
     * @param {string} newAltText - The new alt text to set for the image.
     * @returns {string} - The updated Markdown content.
     */
    updateMarkdownImageAlt(markdownContent: string, imageUrl: string, newAltText: string): string {
        const regex = /!\[([^\]]*)\]\(([^)]+)\)/gm
        const updatedContent = markdownContent.replace(regex, (match, altText, currentUrl) => {
            if (currentUrl === imageUrl) {
                return `![${newAltText}](${imageUrl})`
            }
            return match
        })
        return updatedContent
    }

    /**
     * Updates the headers in the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the headers to be updated.
     * @param {string} oldHeader - The old header text to be updated.
     * @param {string} newHeader - The new header text to set.
     * @returns {string} - The updated Markdown content.
     */
    updateMarkdownHeaders(markdownContent: string, oldHeader: string, newHeader: string) {
        const regex = /^#+\s+(.*)/gm
        const updatedContent = markdownContent.replace(regex, (match, headerText) => {
            if (headerText === oldHeader) {
                const hashPrefix = match.substring(0, match.indexOf(headerText))
                return `${hashPrefix} ${newHeader}`
            }
            return match
        })
        return updatedContent
    }

    /**
     * Updates the list items in the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the list items to be updated.
     * @param {string} oldListItem - The old list item text to be updated.
     * @param {string} newListItem - The new list item text to set.
     * @returns {string} - The updated Markdown content.
     */
    updateMarkdownList(markdownContent: string, oldListItem: string, newListItem: string): string {
        const regex = /^\s*[-*+]\s+(.*)/gm
        const updatedContent = markdownContent.replace(regex, (match, listItemText) => {
            if (listItemText === oldListItem) {
                return ` - ${newListItem}`
            }
            return match
        })
        return updatedContent
    }

    /**
     * Deletes the element with the specified ID from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the element to be deleted.
     * @param {string} id - The ID of the element to delete.
     * @returns {string} - The Markdown content with the element removed.
     */
    deleteElementById(markdownContent: string, id: string) {
        const regex = new RegExp(`(<div\\s+id=["']${id}["'][^>]*>)([\\s\\S]*?)(<\/div>)`)
        const updatedContent = markdownContent.replace(regex, '')
        return updatedContent
    }

    /**
     * Deletes elements with the specified class name from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the elements to be deleted.
     * @param {string} className - The class name of the elements to delete.
     * @returns {string} - The Markdown content with the elements removed.
     */
    deleteElementByClassName(markdownContent: string, className: string) {
        const regex = new RegExp(`(<div\\s+class=["']${className}["'][^>]*>)([\\s\\S]*?)(<\/div>)`, 'g')
        const updatedContent = markdownContent.replace(regex, '')
        return updatedContent
    }

    /**
     * Deletes elements with the specified tag name from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the elements to be deleted.
     * @param {string} tagName - The tag name of the elements to delete.
     * @returns {string} - The Markdown content with the elements removed.
     */
    deleteElementByTag(markdownContent: string, tagName: string) {
        const regex = new RegExp(`(<${tagName}[^>]*>)([\\s\\S]*?)(<\/${tagName}>)`, 'g')
        const updatedContent = markdownContent.replace(regex, '')
        return updatedContent
    }

    /**
     * Deletes the link with the specified URL from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the link to be deleted.
     * @param {string} url - The URL of the link to delete.
     * @returns {string} - The Markdown content with the link removed.
     */
    deleteMarkdownLink(markdownContent: string, url: string) {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/gm
        const updatedContent = markdownContent.replace(regex, (match, linkText, linkUrl) => {
            if (linkUrl === url) {
                return ''
            }
            return match
        })
        return updatedContent
    }

    /**
     * Deletes the image with the specified URL from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the image to be deleted.
     * @param {string} imageUrl - The URL of the image to delete.
     * @returns {string} - The Markdown content with the image removed.
     */
    deleteMarkdownImage(markdownContent: string, imageUrl: string) {
        const regex = /!\[([^\]]*)\]\(([^)]+)\)/gm
        const updatedContent = markdownContent.replace(regex, (match, altText, currentUrl) => {
            if (currentUrl === imageUrl) {
                return ''
            }
            return match
        })
        return updatedContent
    }

    /**
     * Deletes the headers with the specified text from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the headers to be deleted.
     * @param {string} header - The text of the headers to delete.
     * @returns {string} - The Markdown content with the headers removed.
     */
    deleteMarkdownHeaders(markdownContent: string, header: string) {
        const regex = /^\s*#+\s+(.*$)/gm
        const updatedContent = markdownContent.replace(regex, (match, headerText) => {
            if (headerText === header) {
                return ''
            }
            return match
        })
        return updatedContent
    }

    /**
     * Deletes the code block at the specified index from the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the code block to be deleted.
     * @param {number} index - The index of the code block to delete.
     * @returns {string} - The Markdown content with the code block removed.
     */
    deleteMarkdownCodeBlockByIndex(markdownContent: string, index: number): string {
        // Regular expression to match Markdown code block syntax
        const codeBlockRegex = /```[\s\S]*?```/g

        // Find all code blocks in the markdown content
        const codeBlocks = markdownContent.match(codeBlockRegex)

        // Check if the specified index is valid
        if (codeBlocks && index >= 0 && index < codeBlocks.length) {
            // Remove the code block at the specified index
            const updatedContent = markdownContent.replace(codeBlocks[index], '')

            return updatedContent
        } else {
            // Index is out of bounds or no code blocks found
            return markdownContent
        }
    }

    /**
     * Deletes the alt text for an image in the given Markdown content.
     *
     * @param {string} markdownContent - The Markdown content containing the image.
     * @param {string} imageUrl - The URL of the image.
     * @returns {string} - The updated Markdown content.
     */
    deleteMarkdownImageAlt(markdownContent: string, imageUrl: string): string {
        // Regular expression to match Markdown image syntax with alt text
        const imageRegex = new RegExp(`!\\[[^\\]]*\\]\\(${imageUrl}\\)`, 'g')

        // Replace all occurrences of the matched image syntax with an empty alt text
        const updatedContent = markdownContent.replace(imageRegex, `![](${imageUrl})`)

        return updatedContent
    }
}

// Export the MarkdownQuery class
export { MarkdownQuery }

// Export the MarkdownQuery class instance
export const markdownQuery = new MarkdownQuery()
