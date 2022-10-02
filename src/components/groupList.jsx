import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
  items,
  filter,
  onChangeFilter,
  valueProperty,
  contentProperty
}) => {
  return (
    <div className="list-group">
      {items.map((item) => (
        <button
          key={item[contentProperty]}
          className={
            "list-group-item list-group-item-action" +
            (item[valueProperty] === filter ? " active" : "")
          }
          onClick={() => onChangeFilter(item[valueProperty])}
        >
          {item[contentProperty]}
        </button>
      ))}
    </div>
  );
};

// параметры по умолчанию, которые будут переданы компоненту, если они не были переданы из родителя
GroupList.defaultProps = {
  valueProperty: "id",
  contentProperty: "text"
};

GroupList.propTypes = {
  items: PropTypes.array.isRequired,
  filter: PropTypes.string,
  onChangeFilter: PropTypes.func.isRequired,
  valueProperty: PropTypes.string,
  contentProperty: PropTypes.string
};

export default GroupList;
