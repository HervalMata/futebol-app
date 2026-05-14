import {AllFixtures} from "@/types";
import getFixtures from "@/app/util/getFixtures";
import moment from "moment";

export default async function getFixturesForFiveLeagues(): Promise<AllFixtures[]> {
    try {
        const allFixturesByLeague = await getFixtures()
        const fixturesForFiveLeagues: AllFixtures[] = []

        for (const league of allFixturesByLeague) {
            if (
                league.name === 'Brasil Serie A' ||
                league.name === 'Brasil Serie B' ||
                league.name === 'Brasil Serie C' ||
                league.name === 'EPL' ||
                league.name === 'La Liga' ||
                league.name === 'Bundesliga' ||
                league.name === 'Serie A' ||
                league.name === 'Ligue1'
            ) {
                fixturesForFiveLeagues.push(league)
            }
        }

        const filteredFixtures: AllFixtures[] = fixturesForFiveLeagues.filter(
            (league) => {
                league.fixtures.filter((fixture) => {
                    return moment(fixture.fixture.date).isAfter(moment().subtract(1, 'day'), 'day')
                }).slice(0,8)
                return league.fixtures.length > 0
            }
        )

        return filteredFixtures
    } catch (error) {
        console.error("Um erro ocorreu enquanto carregava os dados da tabela de jogos: ", error)
        throw error
    }
}
