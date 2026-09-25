import Link from "next/link";

import { 
    NavigationMenu,
    NavigationMenuItem, 
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle    
} from "./ui/navigation-menu";

export default function NavigationBar() {
    return (
        <NavigationMenu className="w-full max-w-none border-be border-(var(--border))">
            <NavigationMenuList className="w-full justify-between">
                <NavigationMenuItem className="flex w-full items-center justify-between">

                    <NavigationMenuLink
                    render={<Link href="/" />}
                    className={navigationMenuTriggerStyle()}
                    >Sky Market {/*+ logo*/}
                    </NavigationMenuLink>

                    <div className="flex items-center gap-2">
                        <NavigationMenuLink
                        render={<Link href="#" />}
                        className={navigationMenuTriggerStyle()}
                        >Products {/*ev. replace with NavigationMenuTrigger (dropdown menu) that displays all products*/}
                        </NavigationMenuLink>

                        <NavigationMenuLink
                        render={<Link href="#" />}
                        className={navigationMenuTriggerStyle()}
                        >Contact
                        </NavigationMenuLink>

                        <NavigationMenuLink
                        render={<Link href="#" />}
                        className={navigationMenuTriggerStyle()}
                        >Your Cart {/*replace w. logo*/}
                        </NavigationMenuLink>
                    </div>

                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}