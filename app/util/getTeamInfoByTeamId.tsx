import 'server-only'
import {Team} from "@/types";
import getTeams from "@/app/util/getTeams";

export default async function getTeamInfoByTeamId(id: number): Promise<Team | undefined> {
    try {
        const teams: Team[] = await getTeams()

        for (const team of teams) {
            if (team.team.id === id) {
                return team
            }
        }
    } catch (error) {
        console.error('Um erro ocorreu ao carregar as informções da rquipe pelo seu ID: ', error)
        throw error
    }
}
