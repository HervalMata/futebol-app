import 'server-only'
import {Fixture} from "@/types";
import getFixtures from "@/app/util/getFixtures";

export default async function getFixtureByFixtureId(id: number): Promise<Fixture | undefined> {
    try {
        const allFixturesByLeague = await getFixtures()

        for (const league of allFixturesByLeague) {
            for (const fixture of league.fixtures) {
                if (fixture.fixture.id === id) return fixture
            }
        }
        return undefined
    } catch (error) {
        console.error('Um error ocorreu ao carregar a rodada pelo seu ID: ', error)
        throw error
    }
}
