import React from "react"
import { useState } from "react";

const Sidebar = ({onSelect}) => {

    const [submenuSelect, setSubmenuSelection] = useState(null);

    const toggleLang = (lang) => {
        
    }

    return (
        <div className="sidebar">
            <div className="icon-wrapper" onClick={() => onSelect('react')}>
            <img
                src="/images/react.svg"
                alt="React"
                title="React"
            />
            </div>
            
            <div className="submenu">
                <div onClick={() => onSelect("react")}>Videos</div>
                <div onClick={() => onSelect("reactBooks")}>Books</div>
                <div onClick={() => onSelect("reactTools")}>Tools</div>
            </div>

            <div className="icon-wrapper" onClick={() => onSelect('python')}>
            <img
                src="/images/python.svg"
                alt="Python"
                title="Python"
            />
            </div>
        </div>
      );
    };

export default Sidebar;