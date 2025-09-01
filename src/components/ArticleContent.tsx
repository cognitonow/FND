import React from 'react';
import { YoutubeEmbed } from './YoutubeEmbed';

type ArticleContentProps = {
  content: string;
};

const SimpleMarkdownParser = ({ text }: { text: string }) => {
    const lines = text.split('\n');
    const elements = lines.map((line, index) => {
        if (line.startsWith('### ')) {
            return <h3 key={index} className="text-2xl font-bold mt-6 mb-3">{line.substring(4)}</h3>;
        }
        if (line.startsWith('## ')) {
            return <h2 key={index} className="text-3xl font-bold mt-8 mb-4 border-b pb-2">{line.substring(3)}</h2>;
        }
        if (line.startsWith('# ')) {
             return <h1 key={index} className="text-4xl font-bold mt-8 mb-4 border-b pb-2">{line.substring(2)}</h1>;
        }
        if(line.trim() === '') {
            return null;
        }
        
        let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');

        return <p key={index} className="my-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />;
    }).filter(Boolean);

    return <>{elements}</>;
};

export function ArticleContent({ content }: ArticleContentProps) {
  const parts = content.split(/(<YoutubeVideo id="[^"]+"\s*\/?\s*>)/g);

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {parts.map((part, index) => {
        const youtubeMatch = part.match(/<YoutubeVideo id="([^"]+)"\s*\/?\s*>/);
        if (youtubeMatch) {
          const videoId = youtubeMatch[1];
          return <YoutubeEmbed key={index} videoId={videoId} />;
        }
        return <SimpleMarkdownParser key={index} text={part} />;
      })}
    </div>
  );
}
