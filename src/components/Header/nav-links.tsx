"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./header.module.scss";

export default function NavLink({href, children}: any) {
    const path = usePathname();
    const isActive = path === href;
    
    return (
        <Link href={href} className={isActive ? styles.active : ''}>{children}</Link>
    );
}