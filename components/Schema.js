import React from 'react';

const SchemaMarkup = ({url}) => (
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org/",
      "@type": "WebSite",
      "name": "Upfront",
      "url": "https://www.walmartvriddhi.org/",
      "potentialAction": {
        "@type": "SearchAction",
        "target": `https://www.walmartvriddhi.org/{search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    })}
  </script>
);

export default SchemaMarkup;