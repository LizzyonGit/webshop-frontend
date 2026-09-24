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
                    >Sky Market (+ logo)
                    </NavigationMenuLink>
                    <NavigationMenuLink
                    render={<Link href="/" />}
                    className={navigationMenuTriggerStyle()}
                    >Products (ev. replace with NavigationMenuTrigger that displays all products)
                    </NavigationMenuLink>
                    <NavigationMenuLink
                    render={<Link href="/" />}
                    className={navigationMenuTriggerStyle()}
                    >Contact
                    </NavigationMenuLink>
                    <NavigationMenuLink
                    render={<Link href="/" />}
                    className={navigationMenuTriggerStyle()}
                    >Your Cart (insert logo)
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}