import StandingsAndFixtures from "@/app/components/home/StandingsAndFixtures";
import {AllFixtures, Standing} from "@/types";
import getStandings from "@/app/util/getStandings";
import getFixturesForFiveLeagues from "@/app/util/getFixturesForFiveLeagues";

export const revalidate = 60

export default async function Home() {
  const standingsData: Standing[] = await getStandings()
  const filteredFixtures: AllFixtures[] = await getFixturesForFiveLeagues()

  if (!standingsData?.length || !filteredFixtures?.length) {
      return null
  }
  return (
    <div className="flex flex-col w-full justify-center items-center md:p-10">
        <StandingsAndFixtures standingsData={standingsData} filteredFixtures={filteredFixtures} />
    </div>
  );
}
