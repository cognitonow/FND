type YoutubeEmbedProps = {
  videoId: string;
};

export function YoutubeEmbed({ videoId }: YoutubeEmbedProps) {
  return (
    <div className="aspect-video my-8">
      <iframe
        className="w-full h-full rounded-lg shadow-lg"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
