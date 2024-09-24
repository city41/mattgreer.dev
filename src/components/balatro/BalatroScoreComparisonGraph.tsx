import dynamic from 'next/dynamic';
const ResponsiveLine = dynamic(
	() => import('@nivo/line').then((m) => m.ResponsiveLine),
	{ ssr: false }
);

const SCORE_COLOR1 = '#d938f2';
const SCORE_COLOR2 = '#9a72a1';

type BalatroScoreComparisonGraphProps = {
	chips: number;
	mult: number;
	scaleType?: 'linear' | 'symlog';
	max?: number;
	height?: number;
	titles: string[];
	aggregators: (({
		round,
		chips,
		mult,
	}: {
		round: number;
		chips: number;
		mult: number;
	}) => {
		chips: number;
		mult: number;
	})[];
};

function BalatroScoreComparisonGraph({
	chips,
	mult,
	scaleType = 'linear',
	max = 10000,
	height = 400,
	titles,
	aggregators,
}: BalatroScoreComparisonGraphProps) {
	const datas = aggregators.map((aggregator, i) => {
		const scoreData = [];

		for (let i = 0; i < 10; ++i) {
			const result = aggregator({
				round: i,
				chips,
				mult,
			});
			scoreData.push({
				x: i + 1,
				y: result.chips * result.mult,
				yFormatted: 'score',
			});
		}

		return {
			id: titles[i],
			data: scoreData,
		};
	});

	console.log(JSON.stringify(datas));

	return (
		<div style={{ height }} className="balatro-graph">
			<ResponsiveLine
				data={datas}
				colors={[SCORE_COLOR1, SCORE_COLOR2]}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{ type: 'linear', min: 1, max: datas[0].data.length }}
				yScale={{
					type: scaleType,
					min: 0,
					max,
				}}
				yFormat=" >-.2f"
				axisTop={null}
				axisRight={null}
				axisBottom={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'round',
					legendOffset: 36,
					legendPosition: 'middle',
					truncateTickAt: 0,
				}}
				axisLeft={{
					tickSize: 5,
					tickPadding: 5,
					tickRotation: 0,
					legend: 'score',
					legendOffset: -40,
					legendPosition: 'middle',
					truncateTickAt: 0,
				}}
				pointSize={8}
				pointColor="white"
				pointBorderWidth={2}
				pointBorderColor={{ from: 'serieColor' }}
				pointLabelYOffset={-40}
				enableTouchCrosshair={true}
				useMesh={true}
				enableGridX={false}
				enableGridY={false}
				legends={[
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
				]}
			/>
		</div>
	);
}

export { BalatroScoreComparisonGraph };
