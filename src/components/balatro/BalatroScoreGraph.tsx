import dynamic from 'next/dynamic';
const ResponsiveLine = dynamic(
	() => import('@nivo/line').then((m) => m.ResponsiveLine),
	{ ssr: false }
);

const CHIP_COLOR = '#0092ff';
const MULT_COLOR = '#fe4c3e';
const SCORE_COLOR = '#c361d2';

type BalatroScoreGraphProps = {
	chips: number;
	mult: number;
	scaleType?: 'linear' | 'symlog';
	max?: number;
	height?: number;
	aggregator: ({
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
	};
};

// const darkTheme = {
// 	text: {
// 		fill: 'white',
// 	},
// };

// const lightTheme = {
// 	text: {
// 		fill: 'black',
// 	},
// };

function BalatroScoreGraph({
	chips,
	mult,
	scaleType = 'linear',
	max = 10000,
	height = 400,
	aggregator,
}: BalatroScoreGraphProps) {
	const chipData = [];
	const multData = [];
	const scoreData = [];

	for (let i = 0; i < 10; ++i) {
		const result = aggregator({
			round: i,
			chips,
			mult,
		});

		chipData.push({
			x: i + 1,
			y: result.chips,
		});
		multData.push({
			x: i + 1,
			y: result.mult,
		});

		scoreData.push({
			x: i + 1,
			y: result.chips * result.mult,
			yFormatted: 'score',
		});
	}

	const data = [
		{
			id: 'score',
			data: scoreData,
		},
		{
			id: 'chips',
			data: chipData,
		},
		{
			id: 'mult',
			data: multData,
		},
	];

	return (
		<div style={{ height }} className="balatro-graph">
			<ResponsiveLine
				data={data}
				colors={[SCORE_COLOR, CHIP_COLOR, MULT_COLOR]}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				xScale={{ type: 'linear', min: 1, max: data[0].data.length }}
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

export { BalatroScoreGraph };
