import { BsFillQuestionSquareFill } from "react-icons/bs";
import { IoHome } from "react-icons/io5";
import { FaBlog, FaTools } from "react-icons/fa";

import { IoBookSharp } from "react-icons/io5";
import { MdOutlineVaccines } from "react-icons/md";
import { TbCalendarDue } from "react-icons/tb";
import { FaWeightScale } from "react-icons/fa6";
import { FaBookOpenReader } from "react-icons/fa6";
import { BiSupport } from "react-icons/bi";
import { MdContactPhone } from "react-icons/md";
import { VscFeedback } from "react-icons/vsc";

const menuItems = [
  {
    title: "Home",
    icon: <IoHome size={32} />,
    link: "/",
  },
  {
    title: "Blog",
    icon: <FaBlog size={32} />,
    link: "/blog",
  },
  {
    title: "The poetry",
    icon: <IoBookSharp size={32} />,
    link: "/the-poetry",
  },
  // {
  //   title: "Faqs",
  //   icon: <BsFillQuestionSquareFill size={32} />,
  //   link: "/faqs",
  // },
  // {
  //   title: "eBooks",
  //   icon: <FaBookOpenReader size={32} />,
  //   link: "/eBooks",
  // },
  {
    title: "Hepl & Support",
    icon: <BiSupport  size={32} />,
    submenu: [
      {
        title: "Contact Us",
        link: "/contact-us",
        icon: <MdContactPhone  size={24} />,
      },
      {
        title: "Share Your Feedback",
        link: "/share-your-feedback",
        icon: <VscFeedback   size={24} />,
      },
      {
        title: "Faqs",
        link: "/faqs",
        icon: <BsFillQuestionSquareFill size={32} />,
        
      },
    ],
  },
  {
    title: "Tools",
    icon: <FaTools size={32} />,
    submenu: [
      {
        title: "Baby Vaccination Chart",
        link: "/baby-vaccination-chart",
        icon: <MdOutlineVaccines size={24} />,
      },
      {
        title: "Pregnancy Due Date Calculator",
        link: "/pregnancy-due-date-calculator",
        icon: <TbCalendarDue size={24} />,
      },
      {
        title: "Pregnancy Weight Gain Calculator",
        link: "/pregnancy-weight-gain-calculator",
        icon: <FaWeightScale size={24} />,
      },
    ],
  },
];

export default menuItems;
