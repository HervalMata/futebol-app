type Games = {
    played: number,
    win: number,
    draw: number,
    lose: number,
    goals: {
        fot: number,
        against: number
    }
}

type Team = {
    rank: number,
    team: {
        id: number,
        name: string,
        logo: string,
    },
    points: number,
    goalsDiff: number,
    group: string,
    form: string,
    status: string,
    description: string,
    all: Games,
    home: Games,
    away: Games,
    update: string,
}

type League = {
    id: number,
    name: string,
    country: string,
    logo: string,
    flag: string,
    season: number,
    standings: [
        Team[]
    ]
}

type Standing = {
    league: League,
}

export { Standing, Team }
