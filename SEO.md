# SEO Configuration Guide

This document outlines the SEO optimizations implemented for JsonInspect.

## ✅ Implemented SEO Features

### 1. Enhanced Metadata
- **Open Graph tags** for social media sharing
- **Twitter Card** metadata
- **Structured metadata** with keywords, descriptions, and canonical URLs
- **Page-specific metadata** for all routes

### 2. Robots.txt
- Automatically generated at `/robots.txt`
- Allows all crawlers to index the site
- Points to sitemap location

### 3. Sitemap.xml
- Dynamically generated at `/sitemap.xml`
- Includes all public pages
- Priority and change frequency configured per page

### 4. Structured Data (JSON-LD)
- **WebApplication** schema for the main tool
- **WebSite** schema with search functionality
- **Organization** schema with social links
- Helps search engines understand the content

### 5. Google Analytics
- Integrated with proper tracking
- Page view tracking on route changes
- Requires `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Google Analytics Measurement ID (optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Site URL (for canonical URLs, Open Graph, etc.)
NEXT_PUBLIC_SITE_URL=https://jsoninspect.dev
```

## 📝 Next Steps for Better SEO

1. **Create Open Graph Image**
   - Add an `og-image.png` (1200x630px) in the `public` folder
   - Update the path in `app/layout.tsx` if needed

2. **Add Logo**
   - Add a `logo.png` in the `public` folder
   - Used in structured data

3. **Submit to Search Engines**
   - Submit sitemap to Google Search Console
   - Submit sitemap to Bing Webmaster Tools

4. **Add Verification Codes**
   - Uncomment and add verification codes in `app/layout.tsx` metadata
   - For Google Search Console, Bing, Yandex, etc.

5. **Content Optimization**
   - Ensure all pages have unique, descriptive content
   - Add more internal links between pages
   - Consider adding a blog or documentation section

6. **Performance**
   - Optimize images (if any)
   - Ensure fast page load times
   - Use Next.js Image component for images

7. **Accessibility**
   - Ensure proper heading hierarchy
   - Add alt text to images
   - Ensure keyboard navigation works

## 🔍 Testing SEO

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
2. **Facebook Sharing Debugger**: https://developers.facebook.com/tools/debug/
3. **Twitter Card Validator**: https://cards-dev.twitter.com/validator
4. **LinkedIn Post Inspector**: https://www.linkedin.com/post-inspector/

## 📊 Monitoring

- Set up Google Search Console to monitor indexing
- Track search performance and keywords
- Monitor Core Web Vitals
- Check for crawl errors

