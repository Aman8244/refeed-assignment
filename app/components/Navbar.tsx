"use client";
import React from "react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"
import Link from "next/link";
import { CalendarDaysIcon, HomeIcon, PlusIcon } from "lucide-react";


const Navbar = () => {

    return (
        <div className="absolute bottom-4 flex items-center justify-center left-[37%] ">
            <NavigationMenu className="bg-black py-1 px-12 rounded-[32px]">
                <NavigationMenuList className="flex gap-10 ">
                    <NavigationMenuItem className="bg-transparent p-2">
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={"bg-transparent "}>
                                <HomeIcon className="text-white bg-black  w-8 h-8"   />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="bg-transparent p-2">
                        <Link href="/calendar" legacyBehavior passHref>
                            <NavigationMenuLink className={"bg-transparent "}>
                                <CalendarDaysIcon className="text-white bg-black w-8 h-8" />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="bg-transparent p-2">
                        <Link href="/add-task" legacyBehavior passHref>
                            <NavigationMenuLink className={"bg-transparent "}>
                                <PlusIcon className="text-black bg-white p-1 w-8 h-8" />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
export default Navbar;
