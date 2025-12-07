
/**
 * Sanitizes an HTML string to prevent XSS attacks.
 * Uses native browser DOMParser to avoid external dependencies that may cause loading errors.
 * 
 * @param dirty - The potentially unsafe HTML string
 * @returns The sanitized HTML string
 */
export const sanitizeHtml = (dirty: string): string => {
  try {
    // 1. Parse string into a document
    const parser = new DOMParser();
    const doc = parser.parseFromString(dirty, 'text/html');
    
    // 2. Remove dangerous tags (Scripts, Iframes, Objects, Styles)
    const dangerousTags = ['script', 'iframe', 'object', 'embed', 'style', 'link', 'meta'];
    dangerousTags.forEach(tag => {
        const nodes = doc.querySelectorAll(tag);
        nodes.forEach(node => node.remove());
    });

    // 3. Iterate over all elements to remove dangerous attributes
    const allElements = doc.body.getElementsByTagName('*');
    for (let i = 0; i < allElements.length; i++) {
        const el = allElements[i];
        const attrs = el.attributes;
        for (let j = attrs.length - 1; j >= 0; j--) {
            const attrName = attrs[j].name.toLowerCase();
            // Remove event handlers (on*) and javascript: protocols
            if (attrName.startsWith('on') || 
               (attrName === 'href' && el.getAttribute('href')?.toLowerCase().trim().startsWith('javascript:'))) {
                el.removeAttribute(attrName);
            }
        }
        
        // 4. Force external links to open in new tab with security refs
        if (el.tagName.toLowerCase() === 'a') {
            el.setAttribute('target', '_blank');
            el.setAttribute('rel', 'noopener noreferrer');
        }
    }

    return doc.body.innerHTML;
  } catch (e) {
    console.warn("HTML Sanitization failed, falling back to text escaping.");
    // Fallback: Escape HTML to prevent execution if parsing fails
    return dirty
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
};
