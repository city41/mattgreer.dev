import dynamic from 'next/dynamic';
const ResponsiveLine = dynamic(
	() => import('@nivo/line').then((m) => m.ResponsiveLine),
	{ ssr: false }
);

const cardDatas = [
	{
		hand: 'High Card',
		baseMult: 1,
		baseChips: 5,
		addedMult: 1,
		addedChips: 10,
	},
	{
		hand: 'Pair',
		baseMult: 2,
		baseChips: 10,
		addedMult: 1,
		addedChips: 15,
	},
	{
		hand: '2 Pair',
		baseMult: 2,
		baseChips: 20,
		addedMult: 1,
		addedChips: 20,
	},
	{
		hand: '3 Kind',
		baseMult: 3,
		baseChips: 30,
		addedMult: 2,
		addedChips: 20,
	},
	{
		hand: 'Straight',
		baseMult: 4,
		baseChips: 30,
		addedMult: 3,
		addedChips: 30,
	},
	{
		hand: 'Flush',
		baseMult: 4,
		baseChips: 35,
		addedMult: 2,
		addedChips: 15,
	},
	{
		hand: 'Full House',
		baseMult: 4,
		baseChips: 40,
		addedMult: 2,
		addedChips: 25,
	},
	{
		hand: '4 Kind',
		baseMult: 7,
		baseChips: 60,
		addedMult: 3,
		addedChips: 30,
	},
	{
		hand: 'Straight Flush',
		baseMult: 8,
		baseChips: 100,
		addedMult: 4,
		addedChips: 40,
	},
	{
		hand: '5 Kind',
		baseMult: 12,
		baseChips: 120,
		addedMult: 3,
		addedChips: 35,
	},
	{
		hand: 'Flsh House',
		baseMult: 14,
		baseChips: 140,
		addedMult: 4,
		addedChips: 40,
	},
	{
		hand: 'Flush 5',
		baseMult: 16,
		baseChips: 160,
		addedMult: 3,
		addedChips: 50,
	},
];

function getColor(i: number): string {
	const baseColor = [292, 88, 58];
	const h = baseColor[0] - i * 15;

	return `hsl(${h}, ${baseColor[1]}%, ${baseColor[2]}%)`;
}

function BalatroPlanetCardGrowthComparisonGraph() {
	const colors = [];

	const datas = cardDatas.map((cardData, i) => {
		const scoreData = [];

		for (let i = 0; i < 10; ++i) {
			const result = {
				chips: cardData.baseChips + i * cardData.addedChips,
				mult: cardData.baseMult + i * cardData.addedMult,
			};
			scoreData.push({
				x: i + 1,
				y: result.chips * result.mult,
				yFormatted: 'score',
			});
		}
		colors.push(getColor(i));

		return {
			id: cardData.hand,
			data: scoreData,
		};
	});

	return (
		<div style={{ height: 500 }} className="balatro-graph">
			<ResponsiveLine
				data={datas}
				colors={colors}
				margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
				yScale={{
					type: 'linear',
					min: 0,
					max: 3000,
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
					format: 'a',
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

export { BalatroPlanetCardGrowthComparisonGraph };
