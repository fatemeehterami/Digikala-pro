export default function UrlPage({ breadcrumb = [], categoryTitle }) {
const lastItem = breadcrumb[breadcrumb.length - 1];
  return (
    <div className="max-w-screen-xl my-5 flex mx-auto w-full">
      <p className="text-gray-500 text-sm">
        دیجیکالا
        {lastItem ? ` / ${lastItem.title_fa}` : ""}
        {categoryTitle && <span> / {categoryTitle}</span>}
      </p>
    </div>
  );
}
