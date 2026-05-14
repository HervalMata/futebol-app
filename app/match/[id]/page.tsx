import {Fixture} from "@/types";
import getFixtureByFixtureId from "@/app/util/getFixtureByFixtureId";
import Link from "next/link";
import Image from "next/image";
import LocalTime from "@/app/components/LocalTime";

type PageProps = {
    params: Promise<{
        id: string
    }>
}

export default async function Match(
    { params }: PageProps
) {
    const { id } = await params
    let fixtureByFixtureId: Fixture | undefined = await getFixtureByFixtureId(parseInt(id))

    if (!fixtureByFixtureId) {
        return (
            <div className="flex w-full justify-center items-center py-5">
                <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
                    Nenhuma informação da rodada disponivel
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col w-full justify-center items-center text-neutral-100">
            <div className="flex w-full max-w-7xl justify-center items-center perspective pb-10 md:pb-20">
                <div className="w-1/3 flex justify-center rounded-full animate-logo-pop-left logo-shadow">
                    <Link href={`../team/${fixtureByFixtureId.teams.home.id}`}>
                        <Image src={fixtureByFixtureId.teams.home.logo} alt="HomeLogo" width={250} height={250} />
                    </Link>
                </div>
                <div className="w-1/3 flex justify-center items-center flex-col h-56">
                    <div className="h-1/5 flex justify-center items-center text-center text-sm md:text-xl">
                        <LocalTime fixture={fixtureByFixtureId} />
                    </div>
                    <div className="h-3/5 flex justify-center items-center md:text-5xl text-2xl">
                        <div className="flex flex-col justify-center items-center">
                            {fixtureByFixtureId.score.fulltime.home}
                            {
                                fixtureByFixtureId.score.penalty.home !== null ?
                                    <div className="flex flex-col justify-center items-center">
                                        <div>(et. ){fixtureByFixtureId.score.extratime.home}</div>
                                        <div>(pen. ){fixtureByFixtureId.score.penalty.home}</div>
                                    </div>
                                    : fixtureByFixtureId.score.extratime.home !== null ?
                                        <div className="text-sm">
                                            <div>(et. ){fixtureByFixtureId.score.extratime.home}</div>
                                        </div> : null
                            }
                        </div>
                        <div>
                            -
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            {fixtureByFixtureId.score.fulltime.away}
                            {
                                fixtureByFixtureId.score.penalty.away !== null ?
                                    <div className="flex flex-col justify-center items-center">
                                        <div>(et. ){fixtureByFixtureId.score.extratime.away}</div>
                                        <div>(pen. ){fixtureByFixtureId.score.penalty.away}</div>
                                    </div>
                                    : fixtureByFixtureId.score.extratime.away !== null ?
                                        <div className="text-sm">
                                            <div>(et. ){fixtureByFixtureId.score.extratime.away}</div>
                                        </div> : null
                            }
                        </div>
                    </div>
                    <div className="h-1/5 flex justify-center items-center"></div>
                </div>
                <div className="w-1/3 flex justify-center rounded-full animate-logo-pop-right logo-shadow">
                    <Link href={`../team/${fixtureByFixtureId.teams.away.id}`}>
                        <Image src={fixtureByFixtureId.teams.away.logo} alt="AwayLogo" width={250} height={250} />
                    </Link>
                </div>
            </div>
            <div className="flex flex-col w-full justify-center items-center py-5 md:p-10
                            bg-linear-to-b from-red-800/60 to-red-800/10">
                <div className="flex flex-col justify-center items-center py-2">
                    <div>{fixtureByFixtureId.league.name}</div>
                    <div>{fixtureByFixtureId.league.round}</div>
                </div>
                <div className="flex justify-center items-center w-full">
                    <div className="flex flex-col w-1/2 justify-center items-center p-1">
                        <div className="text-xl md:text-2xl text-center">
                            {fixtureByFixtureId.teams.home.name}
                        </div>
                    </div>
                    <div className="flex flex-col w-1/2 justify-center items-center p-1">
                        <div className="text-xl md:text-2xl text-center">
                            {fixtureByFixtureId.teams.away.name}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
