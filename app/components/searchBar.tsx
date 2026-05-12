import SearchBarForm from "@/app/components/searchBarForm";

export default function SearchBar() {
    return (
        <div className="flex justify-center items-center w-full p-3 bg-black/40">
            <div className="w-1/6 flex justify-center items-center text-neutral-100">
                <a
                    href={"/"}
                    className="flex justify-center items-center"
                >
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="w-10 object-cover rounded-full"
                    />
                    <div className="px-2 md:block hidden font-bold text-xl">
                        Futebol App
                    </div>
                </a>
            </div>
            <div className="w-4/6">
                <SearchBarForm />
            </div>
            <div className="w-1/6"></div>
        </div>
    )
}
