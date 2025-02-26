import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const StoreLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className="container mt-4">{children}</main>
            <Footer />
        </div>
    );
};

export default StoreLayout;
