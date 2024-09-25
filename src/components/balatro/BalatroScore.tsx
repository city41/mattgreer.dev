import clsx from 'clsx';

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
		<div className="flex flex-row items-center font-bold my-1">
			<div className="bg-blue-700 text-white rounded-lg p-1 text-right min-w-10">
				{baseChips}
				{additiveChips.length > 0 ? '+' : ''}
				{additiveChips.join('+')}
			</div>
			<div className="px-0.5">x</div>
			<div className="bg-red-600 text-white rounded-lg p-1 text-left min-w-10">
				{baseMult}
				{additiveMult.length > 0 ? '+' : ''}
				{additiveMult.join('+')}
			</div>
			<div className="px-0.5">= {calc(props)}</div>
		</div>
	);

	if (inline) {
		return (
			<span className={clsx({ 'inline-block': inline, block: !inline })}>
				{body}
			</span>
		);
	} else {
		return <div>{body}</div>;
	}
}

export { BalatroScore };
