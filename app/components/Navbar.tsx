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
        <div className="sticky top-0  flex items-center justify-center left-[37%] ">
            <NavigationMenu className="bg-transparent border-gray-600 border  py-2 px-12 rounded-[32px]">
                <NavigationMenuList className="flex gap-10 ">
                    <NavigationMenuItem className="bg-transparent px-2">
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={"bg-transparent "}>
                                <HomeIcon className="text-gray-600  w-8 h-8"   />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="bg-transparent px-2">
                        <Link href="/calendar" legacyBehavior passHref>
                            <NavigationMenuLink className={"bg-transparent "}>
                                <CalendarDaysIcon className="text-gray-600 w-8 h-8" />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="bg-transparent px-2">
                        <Link href="/add-task" legacyBehavior passHref>
                            <NavigationMenuLink className={"bg-transparent "}>
                                <PlusIcon className="text-gray-600 w-8 h-8" />
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
export default Navbar;
