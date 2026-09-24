import Link from "next/link";

import { 
    NavigationMenu,
    NavigationMenuItem, 
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle    
} from "./navigation-menu";

export default function NavigationBar() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink
                    render={<Link href="/" />}
                    className={navigationMenuTriggerStyle()}
                    >Home
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}