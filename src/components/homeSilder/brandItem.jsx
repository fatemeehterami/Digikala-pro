export default function BrandItem({ src, alt, url }) {
  return (
    <div
      aria-label={`selected-${alt}`}
      className="cursor-pointer flex justify-center items-center w-full lg:h-24 h-32 transition-transform duration-200"
    >
      <a
        href={url}
        className="flex justify-center items-center w-full h-full"
      >
        <img
          src={src}
          alt={alt}
          className="max-h-full max-w-full object-contain"
        />
      </a>
    </div>
  );
}
