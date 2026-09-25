import Image from "next/image";
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
        <NavigationMenu className="w-full max-w-none border-be-3">
            <NavigationMenuList className="w-full justify-between">
                <NavigationMenuItem className="flex w-full items-center justify-between">

                    <NavigationMenuLink
                    render={<Link href="/" />}
                    className={navigationMenuTriggerStyle()}
                    >{<Image 
                        src="/sky-market-transparent.png" 
                        alt="Sky Market logo"
                        width={200}
                        height={100}
                        priority
                        className="h-auto w-[160px] object-contain"
                        />}
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
                        >{<Image 
                            src="/shopping-cart.svg" 
                            alt="Shopping cart logo"
                            width={24}
                            height={24}
                            priority
                            className="h-auto w-[24px] object-contain dark:invert"
                            />}
                        </NavigationMenuLink>
                    </div>

                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}
