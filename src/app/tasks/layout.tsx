import {auth} from "@/auth.config";
import {redirect} from "next/navigation";
import {Toaster} from "@/components/ui/toaster";
import Navbar from "@/components/sidebar/Navbar";

export default async function ShopLayout( { children }: {
    children: React.ReactNode;
} ) {
    const session = await auth();

    if ( !session?.user ) {
        //redirect('/auth/login?returnTo=/tasks');
        redirect('/auth/login');
    }

    return (
        <main className="justify-center">
            <Navbar/>
            {children}
            <Toaster />
        </main>
    );
}