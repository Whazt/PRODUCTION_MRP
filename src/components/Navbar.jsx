// import { useState, useEffect } from 'react';

const Navbar = ()=> {
    // const [isScrolled, setIsScrolled] = useState(false);

    // useEffect(() => {
    //     const handleScroll = () => {
    //         const scrollTop = window.pageYOffset;
    //         if (scrollTop > 0) {
    //             setIsScrolled(true);
    //         } else {
    //             setIsScrolled(false);
    //         }
    //     };

    //     window.addEventListener('scroll', handleScroll);
        
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //     };
    // }, []);

    return (
        
        <nav className="border-b-[1px] border-b-[#000157] fixed top-0 w-full h-8 md:h-10 lg:h-16 z-50 bg-white shadow-lg transition-transform duration-300 ${isScrolled ? 'transform translate-y-0' : 'transform -translate-y-full'}">
            
        </nav>
        
    )
}




export default Navbar