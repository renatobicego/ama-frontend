import { useEffect, useState } from "react";

const useScrollDirection = () => {
    const [scrollDirection, setScrollDirection] = useState(null);
  
    useEffect(() => {
        if (typeof window !== 'undefined') {
            let lastScrollY = window.pageYOffset;
        
            const updateScrollDirection = () => {
                const scrollY = window.pageYOffset;
                const direction = scrollY > lastScrollY ? "down" : "up";
                if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
                setScrollDirection(direction);
                }
                lastScrollY = scrollY > 0 ? scrollY : 0;
            };
            window.addEventListener("scroll", updateScrollDirection); // add event listener
            return () => {
                window.removeEventListener("scroll", updateScrollDirection); // clean up
            }   
        }
    }, [scrollDirection]);
  
    return scrollDirection;
  };

export default useScrollDirection