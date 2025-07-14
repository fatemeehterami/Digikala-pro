import { useNavigate } from "react-router-dom";

export default function BrandItem({ src, alt, url,name }) {
  const navigate = useNavigate();
  const handleClick = () => {
    const encodedBrand = encodeURIComponent(name.replace(/\s+/g, "-"));
    navigate(`/search/${encodedBrand}`);
  };
  return (
    <div
      aria-label={`selected-${name}`}
      onClick={handleClick}
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
