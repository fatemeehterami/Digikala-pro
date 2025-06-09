export default function BrandItem({ src, alt, url }) {
    return (
      <div
        aria-label={`selected-${alt}`}
        className="cursor-pointer flex justify-center items-center relative focus:outline-none w-full h-32 transition-transform duration-200"
      >
        <a
          href={url}
          className="decoration-0 flex justify-center items-center w-full h-full"
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain"
          />
        </a>
      </div>
    );
  }
  