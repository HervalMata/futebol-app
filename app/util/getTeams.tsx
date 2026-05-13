import 'server-only'
import {Standing, Team} from "@/types";
import getStandings from "@/app/util/getStandings";

export default async function getTeams(): Promise<Team[]> {
    try {
        const standings: Standing[] = await getStandings();
        const teams: Team[] = [];

        for (const league of standings) {
            for (const standing of league.league.standings) {
                if (Array.isArray(standing)) {
                    for (const team of standing) {
                        teams.push(team);
                    }
                } else {
                    throw new Error("Invalid standings date")
                }
            }
        }

        return teams
    } catch (error) {
        console.error("Erro ao carregar as equipes", error);
        throw error;
    }
}
