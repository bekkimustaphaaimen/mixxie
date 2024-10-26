import { useMemo } from 'react';
import PropTypes from "prop-types";
import Chartcard from "../svgs/Chartcard";
import Chartcard1 from "../svgs/Chartcard1";
import Chartcard2 from "../svgs/Chartcard2";

const StatCard = ({ title, value, change }) => {
  const changeValue = parseFloat(change.replace("%", ""));

  const { color, chart } = useMemo(() => {
    if (changeValue < 0) {
      return {
        color: "#FF392B",
        chart: <Chartcard1 />
      };
    } else if (changeValue >= 0 && changeValue <= 25) {
      return {
        color: "#FF8901",
        chart: <Chartcard />
      };
    } else {
      return {
        color: "#279F51",
        chart: <Chartcard2 />
      };
    }
  }, [changeValue]);

  return (
    <div className="bg-white p-4 rounded-lg shadow flex flex-row gap-2 justify-between items-end">
      <div className="flex flex-col gap-2 justify-between">
        <span className="text-gray-500">{title}</span>
        <div className="text-2xl font-bold mt-2">{value}</div>
      </div>
      <div className="h-12 flex justify-center items-center">
        {chart}
      </div>
      <span style={{ color }} className="h-full">
        {change}
      </span>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  change: PropTypes.string.isRequired,
};

export default StatCard;