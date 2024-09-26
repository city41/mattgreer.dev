type BalatroPlayingCardProps = {
	rank: 'a' | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 'j' | 'q' | 'k';
	suit: 's' | 'h' | 'c' | 'd';
	inline?: boolean;
};

function BalatroPlayingCard({ rank, suit, inline }: BalatroPlayingCardProps) {
	const body = (
		<>
			{rank} of {suit}
		</>
	);

	if (inline) {
		return <span>{body}</span>;
	} else {
		return <div>{body}</div>;
	}
}

export { BalatroPlayingCard };
