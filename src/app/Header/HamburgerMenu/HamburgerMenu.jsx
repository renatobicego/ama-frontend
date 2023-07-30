/* eslint-disable react/prop-types */
"use client"
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import { Drawer, IconButton, List, ListItem } from '@/app/utils/materialTailwind';
import { useState } from "react";
import Link from 'next/link';


const HamburgerMenu = ({socialMedia, menuItems}) => {
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);

    return (
        <>
            <IconButton size="lg" className="lg:hidden" variant="text" onClick={openDrawer}>
                <Bars3Icon strokeWidth={1} className="h-7 w-7 md:h-10 md:w-10 text-white" />
            </IconButton>
            {/* Hamburguer menu opened */}
            <Drawer 
                size={"100vw"} 
                placement="right" 
                className="lg:hidden bg-hamburguer-menu-bg !text-white" 
                open={open} 
                onClose={closeDrawer}
                overlay={false}
                >
                <div className="mb-2 flex items-center justify-end p-4">
                    <IconButton size="lg" variant="text" color="blue-gray" onClick={closeDrawer}>
                        <XMarkIcon strokeWidth={1} className="h-7 w-7 md:h-10 md:w-10 text-white" />
                    </IconButton>
                </div>
                <List className="ml-6">
                    {menuItems.map((item, i) => {
                        return (
                            <Link 
                                href={item.href} 
                                key={i} 
                                className="text-white font-title"
                                prefetch={false}
                                onClick={closeDrawer}>
                                <ListItem className="md:text-2xl">
                                    {item.text}
                                </ListItem>
                            </Link>
                        )
                    })}
                    <div className="flex gap-6 items-center ml-[10px] mt-3">
                        {socialMedia.map((item, i) => {
                            return(
                                <Link href={item.href} key={i}>
                                    <img className="md:w-8" src={item.logo} alt="" />
                                </Link>
                            )
                        })} 
                    </div>
                </List>
            </Drawer>
        </>
    )
}

export default HamburgerMenu