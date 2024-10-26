import { CiSearch } from "react-icons/ci";
import { LuShoppingBag } from "react-icons/lu";
import { MdMenu } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import { FaStar } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { LiaShippingFastSolid } from "react-icons/lia";
import { FaMoneyBillWave } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";
import { FaPhoneAlt } from "react-icons/fa";
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FiYoutube } from "react-icons/fi";
import PropTypes from 'prop-types';

const Icon = ({ name, className }) => {
  switch (name) {
    case "search":
      return <CiSearch className={className} />;
    case "bag":
      return <LuShoppingBag className={className} />;
    case "menu":
      return <MdMenu className={className} />;
    case "close":
      return <IoMdClose className={className} />;
    case "star":
      return <FaStar className={className} />;
    case "arrowRight":
      return <FaArrowRight className={className} />;
    case "shipping":
      return <LiaShippingFastSolid className={className} />;
    case "money":
      return <FaMoneyBillWave className={className} />;
    case "secure":
      return <GrSecure className={className} />;
    case "phone":
      return <FaPhoneAlt className={className} />;
    case "facebook":
      return <FiFacebook className={className} />;
    case "instagram":
      return <FaInstagram className={className} />;
    case "youtube":
      return <FiYoutube className={className} />;
    default:
      return null;
  }
};
Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
