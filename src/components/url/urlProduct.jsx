export default function UrlProduct({ brand ,categoryTitle }) {
      return (
        <div className="max-w-screen-xl my-5 flex mx-auto w-full">
          <p className="text-cyan-400 text-sm">
            {brand && <span> {brand}</span>}
            {brand && {categoryTitle} && <span> / {categoryTitle} {brand}</span>}
          </p>
        </div>
      );
    }
    