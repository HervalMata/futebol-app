export default function SearchBarForm() {
    return (
        <div className="flex justify-center items-center w-full max-w-lg relative">
            <input
                type="text"
                placeholder="Pesquisando por uma equipe..."
                className="w-full bg-linear-to-r from-neutral-100/60 to-black/75 bg-transparent p-2 outline-none
                            border-neutral-100/60 border rounded-xl hover:border-blue-400 focus:border-blue-400
                            focus:from-blue-400/60 text-neutral-100 placeholder-neutral-100/75"
            />
        </div>
    )
}
