type Player = {
	name: string;
	id: number;
};

type Team = {
	name: string;
	players: Player[];
};

export type Settings = {
	quickMode: boolean;
	teams: Team[];
	players: Player[];
	numOfTeams: number;
};
