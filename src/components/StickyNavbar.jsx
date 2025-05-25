import React from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton
} from "@material-tailwind/react";

export default function StickyNavbar() {
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setOpenNav(false));
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6 text-[#626F47] font-extrabold">
      {['Home', 'About Me', 'BMI', 'Articles'].map((item, index) => (
        <Typography
          key={index}
          as="li"
          variant="small"
          color="blue-gray"
          className="p-1 font-normal"
        >
          <a href="#" className="flex items-center">{item}</a>
        </Typography>
      ))}
    </ul>
  );

  return (
    <div className="w-full">
      <Navbar className="sticky top-0 z-10 bg-[#F5ECD5] px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between">
          <a href="#" className="mr-4 py-1.5 font-medium">
            <img src="./logo.svg" alt="BOMI" className="h-20 w-auto" />
          </a>
          <div className="hidden lg:flex items-center justify-center w-full">
            {navList}
          </div>
          <Button variant="gradient" className="hidden lg:inline-block text-[#626F47]">
            <span>Sign in</span>
          </Button>
          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-[#626F47] lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </IconButton>
        </div>
        <MobileNav open={openNav} className="lg:hidden">
          {navList}
          <Button fullWidth variant="gradient" size="sm" className="text-[#626F47]">
            <span>Sign In</span>
          </Button>
        </MobileNav>
      </Navbar>
    </div>
  );
}
