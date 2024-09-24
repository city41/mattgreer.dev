type BalatroScoreProps = {
	baseChips: number;
	baseMult: number;
	additiveChips?: number[];
	additiveMult?: number[];
	multiplicativeMult?: number[];
	inline?: boolean;
};

function calc(props: BalatroScoreProps): number {
	const additiveChipsResult = (props.additiveChips ?? []).reduce(
		(accum, ac) => {
			return accum + ac;
		},
		0
	);

	const additiveMultResult = (props.additiveMult ?? []).reduce((accum, ac) => {
		return accum + ac;
	}, props.baseMult);

	const multiplicativeMultResult = (props.multiplicativeMult ?? []).reduce(
		(accum, ac) => {
			return accum * ac;
		},
		1
	);

	return (
		(props.baseChips + additiveChipsResult) *
		additiveMultResult *
		multiplicativeMultResult
	);
}

function BalatroScore(props: BalatroScoreProps) {
	const {
		baseChips,
		baseMult,
		additiveChips = [],
		additiveMult = [],
		multiplicativeMult = [],
		inline,
	} = props;

	const body = (
		<>
			{additiveChips.length > 0 ? '(' : ''}
			{baseChips}
			{additiveChips.length > 0 ? '+' : ''}
			{additiveChips.join('+')}
			{additiveChips.length > 0 ? ')' : ''}x{additiveMult.length > 0 ? '(' : ''}
			{baseMult}
			{additiveMult.length > 0 ? '+' : ''}
			{additiveMult.join('+')}
			{additiveMult.length > 0 ? ')' : ''}={calc(props)}
		</>
	);

	if (inline) {
		return <span>{body}</span>;
	} else {
		return <div>{body}</div>;
	}
}

export { BalatroScore };
