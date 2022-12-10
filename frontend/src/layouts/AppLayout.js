import React, { useState } from "react";
import Header from "../components/Header";
import RightDrawer from "../components/RightDrawer";
import Routes from "../routes/index";

export default function AppLayout() {
  const [drawer, openDrawer] = useState(false);

  return (
    <div className="appContainer">
      <Header drawer={drawer} openDrawer={openDrawer} />
      <div className="main">
        {/* <RightDrawer drawer={drawer} openDrawer={openDrawer} /> */}
        <Routes />
      </div>
    </div>
  );
}
