import React from "react"

const Sidebar = ({onSelect}) => {
    return (
        <div className="sidebar">
          <img
            src="/images/react.svg"
            alt="React"
            title="React"
            onClick={() => onSelect('react')}
            style={{ width: '32px', cursor: 'pointer', marginBottom: '20px' }}
          />
          <img
            src="/images/python.svg"
            alt="Python"
            title="Python"
            onClick={() => onSelect('python')}
            style={{ width: '32px', cursor: 'pointer' }}
          />
        </div>
      );
    };

export default Sidebar;