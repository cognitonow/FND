import React from 'react';
import { YoutubeEmbed } from './YoutubeEmbed';

type ArticleContentProps = {
  content: string;
};

const SimpleMarkdownParser = ({ text }: { text: string }) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
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
        
        let processedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');

        return <p key={index} className="my-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processedLine }} />;
    });

    return <>{elements}</>;
};

export function ArticleContent({ content }: ArticleContentProps) {
  const youtubeTagRegex = /<YoutubeVideo id="([^"]+)"\s*\/?\s*>/;
  const match = content.match(youtubeTagRegex);

  let videoId = null;
  let remainingContent = content;

  if (match) {
    videoId = match[1];
    remainingContent = content.replace(youtubeTagRegex, '').trim();
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      {videoId && <YoutubeEmbed videoId={videoId} />}
      <SimpleMarkdownParser text={remainingContent} />
    </div>
  );
}
