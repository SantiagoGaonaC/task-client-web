import Link from "next/link"
import {LogoutButton} from "@/components/sidebar/LogoutButton";
import {IoClipboardOutline} from "react-icons/io5";
import {SelectUserSearch} from "@/components/sidebar/SelectUserSearch";

export default function Navbar() {
    return (
        <header className="flex items-center justify-between w-full max-w-3xl mx-auto px-4 py-2 rounded-lg bg-white shadow-md">
            <Link className="flex items-center" href="/tasks">
                <IoClipboardOutline className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
            </Link>
            <div className="flex-1 mx-4">
                <form className="flex items-center justify-center space-x-2">
                    <SelectUserSearch/>
                </form>
            </div>
            <nav className="flex items-center space-x-4">
                <LogoutButton/>
            </nav>
        </header>
    )
}