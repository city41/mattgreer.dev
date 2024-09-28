import {
	BalatroBlindGrowthGraph,
	getMaxForStakes,
} from './BalatroBlindGrowthGraph';
import { BalatroPlanetCardGrowthComparisonGraph } from './BalatroPlanetCardGrowthComparisonGraph';

const stakes = ['white', 'green', 'purple'] as const;

function BalatroBlindAndPlanetGrowthGraph() {
	const max = getMaxForStakes(stakes);

	return (
		<div className="relative" style={{ height: 500 }}>
			<div className="absolute top-0 left-0 h-full w-full">
				<BalatroBlindGrowthGraph
					stakes={stakes}
					showXAxis={false}
					showYAxis={false}
					showLegend={false}
					lineWidth={16}
				/>
			</div>
			<div className="absolute top-0 left-0 h-full w-full">
				<BalatroPlanetCardGrowthComparisonGraph
					levels={23}
					xAxisLabel="round/planet level"
					yAxisLabel=""
					max={max}
				/>
			</div>
		</div>
	);
}

export { BalatroBlindAndPlanetGrowthGraph };
