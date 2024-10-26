import PropTypes from "prop-types";
import StatCard from "./StatCard";
import { statsData } from "./statsData ";

const StatCardGroup = ({ stats = Object.keys(statsData) }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-9 mt-6">
      {stats.map((statKey) => {
        const statInfo = statsData[statKey];
        return (
          <StatCard
            key={statKey}
            title={statInfo.title}
            value={statInfo.value}
            change={statInfo.change}
          />
        );
      })}
    </div>
  );
};

StatCardGroup.propTypes = {
  stats: PropTypes.arrayOf(PropTypes.string),
};

export default StatCardGroup;
