import { useState, useEffect } from "react";

import { Box } from "@mantine/core";
import { IconChevronDown } from "@tabler/icons-react";

const ScrollIndicator = () => {
  const [isScrollable, setIsScrollable] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const checkScrollable = () => {
      const scrollable = document.body.clientHeight > window.innerHeight;
      setIsScrollable(scrollable);
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if the user is at the bottom with a small buffer
      setIsAtBottom(scrollPosition >= documentHeight - 5);
    };

    checkScrollable();
    handleScroll(); // Run on mount in case page loads scrolled down

    window.addEventListener("resize", checkScrollable);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", checkScrollable);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isScrollable && !isAtBottom ? (
    <Box className="scroll-indicator" 
        style={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "#7F909E",
        // padding: "10px 15px",
        borderRadius: "8px",
        opacity: 0.8,
        fontSize: "14px",
        fontWeight: "bold",
        transition: "opacity 0.5s ease-in-out",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "5px",
      }}
    >
      <IconChevronDown />
    </Box>) : null;
};

export default ScrollIndicator;