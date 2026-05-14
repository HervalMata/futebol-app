import {AllFixtures, Fixture} from "@/types";
import {USE_SAMPLE} from "@/app/sampleData/useSample";
import getStandingsSample from "@/app/sampleData/getStandingsSample";
import moment from "moment/moment";
import getFixturesSample from "@/app/sampleData/getFixturesSample";

const API_KEY = process.env.API_KEY as string

const leagues = [
    { league: 268 , name: "Brasil Serie A" },
    { league: 8814, name: "Brasil Serie B" },
    { league: 8971, name: "Brasil Serie C" },
    { league: 47, name: "EPL" },
    { league: 87, name: "La Liga" },
    { league: 54, name: "Bundesliga" },
    { league: 55, name: "Serie A" },
    { league: 53, name: "Ligue1" },
]

async function fetchFixturesByLeague(year: number, league: number): Promise<Fixture[]> {
    const url = 'https://free-api-live-football-data.p.rapidapi.com'
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": 'free-api-live-football-data.p.rapidapi.com',
        },
        next: {
            revalidate: 60 * 60 * 24,
        }
    }

    try {
        const response = await fetch(url, options)
        if (!response.ok) {
            throw new Error(`Could not find league with ID ${league}`)
        }
        const data = await response.json()
        console.log(data.response)
        if (!Array.isArray(data?.response)) {
            throw new Error(`Could not find league with ID ${league}`)
        }
        const fixtures: Fixture[] = data.response
        if (fixtures === null || fixtures === undefined) {
            return []
        } else {
            return fixtures
        }
    } catch (error) {
        console.error(error)
        return []
    }
}

export default async function getFixtures(): Promise<AllFixtures[]> {
    if (USE_SAMPLE) {
        return getFixturesSample()
    }
    const url = 'https://free-api-live-football-data.p.rapidapi.com'
    const options = {
        method: "GET",
        headers: {
            "x-rapidapi-key": API_KEY,
            "x-rapidapi-host": 'free-api-live-football-data.p.rapidapi.com',
        },
        next: {
            revalidate: 60 * 60 * 24,
        }
    }

    try {
        const currentTime = moment();
        const month = currentTime.month()
        let year = currentTime.year();

        const allFixturesByLeague: AllFixtures[] = []

        for (const league of leagues) {
            if (month <= 5) {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await fetchFixturesByLeague(year - 1, league.league)
                })
            } else if (month >= 8) {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await fetchFixturesByLeague(year, league.league)
                })
            } else {
                allFixturesByLeague.push({
                    name: league.name,
                    fixtures: await fetchFixturesByLeague(year, league.league)
                })
                const existingData = allFixturesByLeague.find((data) => data.name === league.name)
                if (existingData) {
                    existingData.fixtures.push(...(await fetchFixturesByLeague(year, league.league)))
                } else {
                    allFixturesByLeague.push({
                        name: league.name,
                        fixtures: await fetchFixturesByLeague(year, league.league)
                    })
                }
            }
        }
        return allFixturesByLeague
    } catch (error) {
        console.error(error)
        return []
    }
}
