import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const Loader = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    async function updateProgress() {
      for (let i = 0; i <= 100; i++) {
        await new Promise((resolve) => setTimeout(resolve, 5));
        setProgress(i);
      }
    }
    updateProgress();
  }, []);
  return (
    <div
      style={{
        zIndex: 9999,
        width: `${progress == 100 ? 0 : progress}%`,
      }}
      className="fixed z-50 top-0 left-0   h-1 bg-blue-500"
    ></div>
  );
};
Loader.propTypes = {
  loading: PropTypes.bool,
};
export default Loader;
