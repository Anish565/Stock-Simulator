import React from "react";
import Sidebar from "./Sidebar";
import NewsStrip from "./NewsStrip";

interface LayoutProps {
    children: React.ReactNode;
    profileImageUrl?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, profileImageUrl }) => {
    return (
        <div className="flex min-h-screen">
            <Sidebar profileImageUrl={profileImageUrl}/>
            <div className="flex-1">
                <NewsStrip/>
                <div className="space-y-6">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout;