import React from "react";
import { NavLink } from "react-router-dom";

export default function Logo() {
    return (
        <NavLink to="/" className="logo">
            <img src="/logo.webp" alt="logo" />
        </NavLink>
    );
}
