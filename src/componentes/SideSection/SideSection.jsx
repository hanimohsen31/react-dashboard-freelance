import React from "react";
import { Tab } from "./Tab";
// styles
import "./SideSection.scss";
// icons
// import DnsIcon from "@mui/icons-material/Dns";
// import EventIcon from "@mui/icons-material/Event";
import ViewDayIcon from "@mui/icons-material/ViewDay";
// import MopedIcon from "@mui/icons-material/Moped";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import ExtensionIcon from "@mui/icons-material/Extension";
// import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import AddCommentRoundedIcon from "@mui/icons-material/AddCommentRounded";
import { Link } from "react-router-dom";
// import DnsIcon from '@mui/icons-material/Dns';
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
// import AdUnitsIcon from "@mui/icons-material/AdUnits";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import StoreIcon from "@mui/icons-material/Store";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

export const SideSection = () => {
  return (
    <>
      <div className="void"></div>
      <div className="SideSection">
        <div className="content">

          <Link to="/">
            <h2 style={{ padding: "10px 10px 0px 10px" }}>Dashboard</h2>
            <span>
              <DashboardIcon />
            </span>
          </Link>

          {/* <Tab link={"/"} icon={<ViewHeadlineIcon />} label="Dashboard" /> */}

          <div className="activeTab">
            <Tab link={"/"} icon={<StoreIcon />} label="الرئيسية" />
          </div>

          <Tab
            link={"/products"}
            icon={<ViewHeadlineIcon />}
            label="عرض&#160;المنتجات"
          />

          <Tab
            link={"/categories"}
            icon={<ViewDayIcon />}
            label="عرض&#160;الفئات"
          />

          <Tab
            link={"/add-product"}
            icon={<AddCommentRoundedIcon />}
            label="اضافة&#160;منتج"
          />

          <Tab
            link={"/add-category"}
            icon={<PlaylistAddIcon />}
            label="اضافة&#160;فئة"
          />

          <Tab
            link={"/ads"}
            icon={<ViewCarouselIcon />}
            label="اضافة&#160;اعلانات"
          />

          <Tab
            link={"/delevery"}
            icon={<LocalShippingIcon />}
            label="التوصيل"
          />

          {/* <Tab
            link={"/about"}
            icon={<HelpOutlineIcon />}
            label="نبذة&#160;عن"
          /> */}
        </div>
      </div>
    </>
  );
};
