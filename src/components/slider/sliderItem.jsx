
export default function SliderItem({  src , alt , url }) {

  return (
    <div
      aria-label={`selected-${alt}`}
      className="flex flex-col h-auto justify-start items-start gap-3 cursor-pointer  relative focus:outline-none w-full transition-transform duration-200"
    >
      <a href={url} className="decoration-0 w-full">
        <img
          className="w-full h-full object-cover"
          src={src}
          alt={alt}
        />
      </a>
    </div>
  );
}
