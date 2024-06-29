/* eslint-disable react/prop-types */
import CateItem from "./CateItem";

const CateSelected = ({ data }) => {
  return (
    <div className="h-[400px] overflow-auto">
      <ul>
        {data?.map((item) => (
          <CateItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default CateSelected;
