type PageProps = {
    params: Promise<{
        id: string
    }>
}

export default async function Team(
    {params}: PageProps
) {
    const { id } = await params

    return (
        <div className="flex justify-center items-center text-neutral-100">
            {id}
        </div>
    )
}
