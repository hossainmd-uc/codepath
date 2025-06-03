import React from "react"
import { useState, useEffect} from "react";
import { useRef } from "react";

const Sidebar = ({setSubmenuSelection, submenuSelection, 
                  renderedLang, setRenderedLang, 
                  selectedLang, setSelectedLang}) => {
    const refMap = {
      react: useRef(null),
      python: useRef(null),
    };
  
    const submenuRef = useRef(null);
    const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  
    useEffect(() => {
      const handleClickOutside = (e) => {
        if (
          selectedLang &&
          submenuRef.current &&
          !submenuRef.current.contains(e.target) &&
          !refMap[selectedLang]?.current.contains(e.target)
        ) {
          setSelectedLang(null);
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [selectedLang]);

    const toggleLang = (lang) => {
      
      if (lang === "home"){
        setRenderedLang(null)
        setSubmenuSelection(null);
        return;
      }

      if (!selectedLang){
        setSelectedLang(lang);
      }else if (selectedLang !== lang) {
        setSelectedLang(lang);
      }else{
        setSelectedLang(null);
      }

      const ref = refMap[lang];
      
      if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        setMenuPosition({ top: rect.top, left: rect.right });
    }
    };

    const render = (type) => {

        //if submenu item clicked
        setSubmenuSelection(type);
        setRenderedLang(selectedLang)
        setSelectedLang(null);
        
    }
  
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
        
        {selectedLang && selectedLang !== "home" && (
          <div
            className="submenu" ref={submenuRef}
            style={{
              top: `${menuPosition.top}px`,
              left: `${menuPosition.left + 10}px`,
              zIndex: 9999,
              position: "fixed",
            }}
          >
            <div
              onClick={() => render("video")}
            >Videos</div>
            <div
              onClick={() => render("book")}
            >Books</div>
          </div>
        )}
      </div>
    );
  };
  


export default Sidebar;