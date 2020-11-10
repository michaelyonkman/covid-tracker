import React from 'react';

const Legend = ({ legendItems }) => {
  return (
    <div className="legend-container">
      {legendItems.map((item) => (
        <div
          key={item.title}
          style={{
            backgroundColor: item.color,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: item.textColor,
            height: '8vh',
            fontFamily: 'Roboto Mono',
            borderBottom: 'solid black 1px',
          }}
        >
          <span>{item.title}</span>
        </div>
      ))}
    </div>
  );
};

export default Legend;
