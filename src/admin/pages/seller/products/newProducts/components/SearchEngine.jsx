import TextFiled from "../../../../../components/fields/TextFiled";

const SearchEngine = () => {
  return (
    <div className={"w-full bg-white rounded-md shadow-md sm:overflow-auto p-4"}>
      <h3 className="font-bold">Search engine optimize</h3>
      <div>
        <div className="mt-5">
          <TextFiled
            placeholder="Meta Title"
            name="metaTitle"
            label="Meta Title"
          ></TextFiled>
        </div>
        <div className="mt-5">
          <TextFiled
            placeholder="Meta Keywords"
            name="metaKey"
            label="Meta Keywords"
            rows="5"
          ></TextFiled>
        </div>
        <div className="mt-5">
          <TextFiled
            placeholder="Meta Description"
            name="metaDesc"
            label="Meta Description"
            rows="2"
          ></TextFiled>
        </div>
      </div>
    </div>
  );
};

export default SearchEngine;
