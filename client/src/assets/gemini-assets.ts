import { Type } from "@google/genai";
// NOTE: If you are using the older Google SDK, import it like this instead:
// import { SchemaType as Type } from "@google/generative-ai";

// 1. Export schema so TypeScript doesn't throw 'declared but never read' (TS6133)
export const seoAnalysisSchema = {
    type: Type.OBJECT,
    properties: {
        overallScore: { type: Type.INTEGER },
        categories: {
            type: Type.OBJECT,
            properties: {
                seo: { type: Type.INTEGER },
                performance: { type: Type.INTEGER },
                accessibility: { type: Type.INTEGER },
                bestPractices: { type: Type.INTEGER },
            },
            required: ["seo", "performance", "accessibility", "bestPractices"],
        },
        keywords: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    word: { type: Type.STRING },
                    count: { type: Type.INTEGER },
                    density: { type: Type.NUMBER },
                },
                required: ["word", "count", "density"],
            },
        },
        issues: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    severity: {
                        type: Type.STRING,
                        format: "enum",
                        enum: ["critical", "warning", "info"],
                    },
                    category: { type: Type.STRING },
                    message: { type: Type.STRING },
                    recommendation: { type: Type.STRING },
                },
                required: ["severity", "category", "message", "recommendation"],
            },
        },
    },
    required: ["overallScore", "categories", "keywords", "issues"],
};

// 2. Wrap the prompt in a function accepting 'scrapedData' as an argument
export const generateSeoPrompt = (scrapedData: any) => {
    return `You are an expert SEO analyst. Analyze the following website data and provide a comprehensive SEO audit.

Website URL: ${scrapedData.url}
Load Time: ${scrapedData.loadTime}ms
Status Code: ${scrapedData.statusCode}
Page Size: ${Math.round((scrapedData.pageSize || 0) / 1024)}KB
Word Count: ${scrapedData.wordCount}

META DATA:
- Title: "${scrapedData.metaData?.title || ''}" (${scrapedData.metaData?.title?.length || 0} chars)
- Description: "${scrapedData.metaData?.description || ''}" (${scrapedData.metaData?.description?.length || 0} chars)
- Canonical: "${scrapedData.metaData?.canonical || ''}"
- Robots: "${scrapedData.metaData?.robots || ''}"
- OG Title: "${scrapedData.metaData?.ogTitle || ''}"
- OG Description: "${scrapedData.metaData?.ogDescription || ''}"
- OG Image: "${scrapedData.metaData?.ogImage || ''}"
- Twitter Card: "${scrapedData.metaData?.twitterCard || ''}"
- Viewport: "${scrapedData.metaData?.viewport || ''}"
- Charset: "${scrapedData.metaData?.charset || ''}"

HEADINGS:
- H1: ${scrapedData.headings?.h1 || 0} (texts: ${JSON.stringify(scrapedData.headings?.h1Texts || [])})
- H2: ${scrapedData.headings?.h2 || 0}
- H3: ${scrapedData.headings?.h3 || 0}
- H4: ${scrapedData.headings?.h4 || 0}
- H5: ${scrapedData.headings?.h5 || 0}
- H6: ${scrapedData.headings?.h6 || 0}

LINKS:
- Internal: ${scrapedData.links?.internal || 0}
- External: ${scrapedData.links?.external || 0}
- Total: ${scrapedData.links?.total || 0}

IMAGES:
- Total: ${scrapedData.images?.total || 0}
- Missing Alt Text: ${scrapedData.images?.missingAlt || 0}
- With Alt Text: ${scrapedData.images?.withAlt || 0}

PAGE CONTENT (first 3000 chars):
${scrapedData.bodyText || ''}

Scoring guidelines:
- Title: 50-60 chars optimal, must exist
- Description: 150-160 chars optimal, must exist
- H1: exactly 1 is ideal
- Images: all should have alt text
- Load time: <3s good, <5s ok, >5s poor
- Page size: <3MB good
- Must have viewport meta, charset, canonical
- OG tags and Twitter cards are important
- Internal linking is good for SEO
- Word count: >300 words for content pages
- Check heading hierarchy

Severity levels must be exactly one of: "critical", "warning", or "info".
Provide 5-15 issues sorted by severity (critical first). Be specific and actionable with recommendations.
Extract top 10 keywords by frequency from the page content.`;
};