import React from "react";

import { SidebarMenu } from "./../../components";

export const SidebarMiddleNav = () => (
  <SidebarMenu>
    <SidebarMenu.Item title="Discover" to="/discover" />
    <SidebarMenu.Item title="Books" to="/books/book_id" />
    <SidebarMenu.Item title="Genre" to="/test" exact />
    <SidebarMenu.Item title="Authors" to="/author" exact />
    <SidebarMenu.Item title="Search" to="/search" exact />
    <SidebarMenu.Item title="Trivia" to="/trivia" exact />
  </SidebarMenu>
);
