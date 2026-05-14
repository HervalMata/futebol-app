import Image from "next/image";
// @ts-ignore
import {Fixture, Team} from "@/types";
import getTeamInfoByTeamId from "@/app/util/getTeamInfoByTeamId";
import getFixturesByTeamId from "@/app/util/getFixturesByTeamId";
import Fixtures from "@/app/team/[id]/components/Fixtures";

type PageProps = {
    params: Promise<{
        id: string
    }>
}

export default async function Team(
    {params}: PageProps
) {
    const { id } = await params
    let teamInfo: Team | undefined = await getTeamInfoByTeamId(parseInt(id))
    let fixturesByTeamId: Fixture[] = await getFixturesByTeamId(parseInt(id))

    if (!teamInfo) {
        return (
            <div className="flex w-full justify-center items-center py-5">
                <div className="flex max-w-7xl p-5 w-full md:flex-row justify-center items-center text-neutral-100">
                    Informações da Equipe não disponivéis
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center text-neutral-100">
            <div className="flex flex-col max-w-7xl p-5 w-full md:flex-row">
                <div className="flex flex-col md:w-1/3 justify-center items-center bg-linear-to-r from-black/60 to-red-800/80 h-125">
                    <Image src={teamInfo.team.logo} alt="TeamLogo" width={150} height={150} className="p-3" />
                    <div className="text-2xl">{teamInfo.team.name}</div>
                    <div className="flex justify-center items-center w-full">
                        <div className="w-1/3 text-center text-2xl">#{teamInfo.rank}</div>
                        <div className="w-1/3 text-center">{teamInfo.group}</div>
                        <div className="w-1/3 flex flex-col justify-center items-center">
                            <div className='text-center'>Sequência</div>
                            <div className="flex justify-center items-center">
                                {teamInfo.form?.split('').map((char, i) => (
                                    <div
                                        key={char + i}
                                        className={`opacity-80 w-3 h-3 m-1 rounded-full
                                        ${char === 'L' ? 'bg-red-500' : char === 'D' ? 'bg-gray-500' : 'bg-green-500'}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
                <div className="flex flex-col w-full p-2 mt-10">
                    <div className="flex w-full justify-center items-center text-xl">
                        <div className="w-full text-center font-bold">PG</div>
                        <div className="w-full text-center">J</div>
                        <div className="w-full text-center">V</div>
                        <div className="w-full text-center">E</div>
                        <div className="w-full text-center">D</div>
                        <div className="w-full text-center">GP</div>
                        <div className="w-full text-center">GC</div>
                        <div className="w-full text-center">SG</div>
                    </div>
                    <div className="flex w-full justify-center items-center text-xl">
                        <div className="w-full text-center font-bold">{teamInfo.points}</div>
                        <div className="w-full text-center">{teamInfo.all.played}</div>
                        <div className="w-full text-center">{teamInfo.all.win}</div>
                        <div className="w-full text-center">{teamInfo.all.draw}</div>
                        <div className="w-full text-center">{teamInfo.all.lose}</div>
                        <div className="w-full text-center">{teamInfo.all.goals.for}</div>
                        <div className="w-full text-center">{teamInfo.all.goals.against}</div>
                        <div className="w-full text-center">{teamInfo.goalsDiff}</div>
                    </div>
                </div>
            </div>
            <div>
                <Fixtures fixturesByTeamID={fixturesByTeamId} teanId={teamInfo.team.id} />
            </div>
        </div>
    )
}
