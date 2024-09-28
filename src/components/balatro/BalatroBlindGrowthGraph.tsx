import dynamic from 'next/dynamic';
const ResponsiveLine = dynamic(
	() => import('@nivo/line').then((m) => m.ResponsiveLine),
	{ ssr: false }
);

type Stake = 'white' | 'green' | 'purple';

type BalatroBlindGrowthGraphProps = {
	stakes: readonly Stake[];
	showXAxis?: boolean;
	showYAxis?: boolean;
	showLegend?: boolean;
	lineWidth?: number;
};

const stakeDatas: Record<Stake, number[]> = {
	white: [
		300, 450, 600, 800, 1200, 1600, 2000, 3000, 4000, 5000, 7500, 10000, 11000,
		16500, 22000, 20000, 30000, 40000, 35000, 52500, 70000, 50000, 75000,
		100000,
	],
	green: [
		300, 450, 600, 900, 1350, 1800, 2600, 3900, 5200, 8000, 12000, 16000, 20000,
		30000, 40000, 36000, 54000, 72000, 60000, 90000, 120000, 100000, 150000,
		200000,
	],
	purple: [
		300, 450, 600, 1000, 1500, 2000, 3200, 4800, 6400, 9000, 13500, 18000,
		25000, 37500, 50000, 60000, 90000, 120000, 110000, 165000, 220000, 200000,
		300000, 400000,
	],
};

const colors = ['#cccccc', ...Object.keys(stakeDatas).slice(1)];

function getMaxForStakes(stakes: readonly Stake[]): number {
	const stakeHighs = stakes.map((s) => {
		const d = stakeDatas[s];
		return d[d.length - 1];
	});

	return Math.max(...stakeHighs);
}

function BalatroBlindGrowthGraph({
	stakes,
	showXAxis = true,
	showYAxis = true,
	showLegend = true,
	lineWidth = 1,
}: BalatroBlindGrowthGraphProps) {
	const currentStakeDatas = stakes.map((stake) => {
		const stakeData = stakeDatas[stake];

		const data = stakeData.map((y, x) => {
			return { x: x + 1, y };
		});

		return {
			id: stake,
			data,
		};
	});

	return (
		<div style={{ height: 500 }} className="balatro-graph">
			<ResponsiveLine
				lineWidth={lineWidth}
				data={currentStakeDatas}
				colors={colors}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				yScale={{
					type: 'linear',
					min: 0,
					max: getMaxForStakes(stakes),
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={
					showXAxis
						? {
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: 'round',
								legendOffset: 36,
								legendPosition: 'middle',
								truncateTickAt: 0,
								format: 'a',
							}
						: null
				}
				axisLeft={
					showYAxis
						? {
								tickSize: 5,
								tickPadding: 5,
								tickRotation: 0,
								legend: 'score to beat',
								legendOffset: -55,
								legendPosition: 'middle',
								truncateTickAt: 0,
							}
						: null
				}
				pointSize={8}
				pointColor="white"
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-40}
				enableTouchCrosshair={true}
				useMesh={true}
				enableGridX={false}
				enableGridY={false}
				legends={
					showLegend
						? [
								{
									anchor: 'bottom-right',
									direction: 'column',
									justify: false,
									translateX: 100,
									translateY: 0,
									itemsSpacing: 0,
									itemDirection: 'left-to-right',
									itemWidth: 80,
									itemHeight: 20,
									itemOpacity: 0.75,
									symbolSize: 12,
									symbolShape: 'circle',
									symbolBorderColor: 'rgba(0, 0, 0, .5)',
									effects: [
										{
											on: 'hover',
											style: {
												itemBackground: 'rgba(0, 0, 0, .03)',
												itemOpacity: 1,
											},
										},
									],
								},
							]
						: []
				}
			/>
		</div>
	);
}

export { BalatroBlindGrowthGraph, stakeDatas, getMaxForStakes };
export type { Stake };
