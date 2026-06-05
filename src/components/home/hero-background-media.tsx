/* eslint-disable @next/next/no-img-element */

const posterSrc = "/videos/primor-holding-poster.jpg";
const videoSrc = "/videos/primor-holding-cnae.mp4";

export default function HeroBackgroundMedia() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none"
    >
      <img
        src={posterSrc}
        alt=""
        className="absolute inset-0 h-full w-full scale-[1.03] object-cover"
        fetchPriority="high"
      />

      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={posterSrc}
        className="absolute inset-0 hidden h-full w-full scale-[1.03] object-cover md:block motion-reduce:hidden"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
    </div>
  );
}
