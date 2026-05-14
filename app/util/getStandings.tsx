import 'server-only'
import {Standing} from "@/types";
import moment from "moment";
import {USE_SAMPLE} from "@/app/sampleData/useSample";
import getStandingsSample from "@/app/sampleData/getStandingsSample";

export default async function getStandings(): Promise<Standing[]> {

    if (USE_SAMPLE) {
        return getStandingsSample()
    }

    const currentTime = moment();
    const month = currentTime.month()
    let year = currentTime.year();

    // @ts-ignore
    /*if (leagues.indexOf(268) || leagues.indexOf(8814) || leagues.indexOf(8971)) {
        year = currentTime.year()
    } else {
        if (month <= 6) {
            year = currentTime.year() - 1
        } else {
            year = currentTime.year()
        }
    }*/

    const API_KEY = process.env.API_KEY as string
    if (!API_KEY) {
        throw new Error("Missing API KEY");
    }

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

    const standings: Standing[] = []

    const leagues = [
        { name: "Brasil Serie A", id: 268 },
        { name: "Brasil Serie B", id: 8814 },
        { name: "Brasil Serie C", id: 8971 },
        { name: "EPL", id: 47 },
        { name: "La Liga", id: 87 },
        { name: "Bundesliga", id: 54 },
        { name: "Serie A", id: 55 },
        { name: "Ligue1", id: 53 },
    ]

    for (const league of leagues) {
        let url = `https://free-api-live-football-data.p.rapidapi.com/football-get-standing-all?season=${year}&leagueid=${league.id}`

        try {
            const response = await fetch(url, options)
            if (!response.ok) {
                throw new Error(`Could not find league with ID ${league.id}`)
            }
            const data = await response.json()
            console.log(data.response)
            if (!Array.isArray(data?.response)) {
                throw new Error(`Could not find league with ID ${league.id}`)
            }
            const standing = data.response[0]

            if (standing) {
                standings.push(standing)
            }
        } catch (error) {
            console.error(`Erro ao carregar ${league.name} standings: ${error}`)
        }
    }

    return standings
}
