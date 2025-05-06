import React from "react"
import { useState } from "react";
import { useRef } from "react";

const Sidebar = ({ onSelect, selectedLang, setSubmenuSelection, submenuSelect, pendingLang, setPendingLang }) => {
    const refMap = {
      react: useRef(null),
      python: useRef(null),
    };
  
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
    const [showSubmenu, setShowSubmenu] = useState(false);
  
    const toggleLang = (lang) => {
      const isSameLang = pendingLang === lang;
  
      if (isSameLang && !submenuSelect) {
        setPendingLang(null);
        setShowSubmenu(false);
      } else {
        setPendingLang(lang);
        setShowSubmenu(true);
  
        const ref = refMap[lang];
        if (ref?.current) {
          const rect = ref.current.getBoundingClientRect();
          setMenuPosition({ top: rect.top, left: rect.right });
        }
      }
    };
  
    const icons = [
      { name: "home", src: "/images/home.png" },
      { name: "react", src: "/images/react.svg" },
      { name: "python", src: "/images/python.svg" },
    ];
  
    return (
      <div className="sidebar">
        {icons.map((icon) => (
          <div
            key={icon.name}
            ref={refMap[icon.name]}
            className="icon-wrapper"
            onClick={() => toggleLang(icon.name)}
          >
            <img src={icon.src} alt={icon.name} />
          </div>
        ))}
  
        {pendingLang && showSubmenu && (
          <div
            className="submenu"
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left + 10}px`,
              zIndex: 9999,
              position: "fixed",
            }}
          >
            <div
              onClick={() => {
                setSubmenuSelection("video");
                onSelect(pendingLang);
                setShowSubmenu(false);
              }}
            >Videos</div>
            <div
              onClick={() => {
                setSubmenuSelection("book");
                onSelect(pendingLang);
                setShowSubmenu(false);
              }}
            >Books</div>
          </div>
        )}
      </div>
    );
  };
  


export default Sidebar;