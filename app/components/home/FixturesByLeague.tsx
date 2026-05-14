import {Fixture} from "@/types";
import FixtureItem from "@/app/components/home/FixtureItem";

type PageProps = {
    fixturesData: Fixture[]
}

export default function FixtureByLeague(
    {fixturesData}: PageProps
) {
    if (fixturesData.length > 0) {
        return fixturesData.slice(0, 7).map((match, i) => {
            return <FixtureItem match={match} key={match.fixture.id} index={i} />
        })
    }
}
