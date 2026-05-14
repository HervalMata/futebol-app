import {Fixture} from "@/types";
import getFixtures from "@/app/util/getFixtures";
import moment from "moment";

export default async function getFixturesByTeamId(id: number): Promise<Fixture[]> {
    try {
        const allFixturesByLeague = await getFixtures()
        const fixturesByTeanId: Fixture[] = []

        for (const league of allFixturesByLeague) {
            for (const fixture of league.fixtures) {
                if (fixture.teams.home.id === id || fixture.teams.away.id === id) {
                    fixturesByTeanId.push(fixture)
                }
            }
        }

        const fixturesByTeamIdSorted: Fixture[] = fixturesByTeanId.sort((a, b) => {
            const time1 = moment(a.fixture.date)
            const time2 = moment(b.fixture.date)

            if (time1.isBefore(time2)) {
                return -1
            } else if (time1.isAfter(time2)) {
                return 1
            } else {
                return 0
            }
        })

        return fixturesByTeamIdSorted
    } catch (error) {
        console.error('Um erro ocorreu ao carregar as informções da rodada pelo ID da equipe: ', error)
        throw error
    }
}
