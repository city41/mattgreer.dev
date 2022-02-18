import React from 'react';

const NUMBER_CELL_CLASS = 'p-4 text-center bg-fg text-bg border border-bg';
const INDEX_CELL_CLASS = 'p-4 text-center bg-focal text-white border border-bg';

function BitTable() {
	return (
		<table className="table-auto">
			<tbody>
				<tr>
					<td colSpan={4} className={NUMBER_CELL_CLASS}>
						<div>142600</div>
					</td>
				</tr>
				<tr>
					<td colSpan={4} className={NUMBER_CELL_CLASS}>
						<div>00100010110100001000</div>
					</td>
				</tr>
				<tr>
					<td className={NUMBER_CELL_CLASS}>
						<div>00100</div>
					</td>
					<td className={NUMBER_CELL_CLASS}>
						<div>01011</div>
					</td>
					<td className={NUMBER_CELL_CLASS}>
						<div>01000</div>
					</td>
					<td className={NUMBER_CELL_CLASS}>
						<div>01000</div>
					</td>
				</tr>

				<tr>
					<td className={INDEX_CELL_CLASS}>
						<div>4</div>
					</td>
					<td className={INDEX_CELL_CLASS}>
						<div>11</div>
					</td>
					<td className={INDEX_CELL_CLASS}>
						<div>8</div>
					</td>
					<td className={INDEX_CELL_CLASS}>
						<div>8</div>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export { BitTable };
// <style>
// 	.bit-table {
// 	margin: 30px 0;
// }
//
// 	.bit-table .number td div {
// 	background - color: grey;
// 	color: white;
// 	padding: 8px;
// 	text-align: center;
// }
//
//
// 	.bit-table .bit-chunks td div {
// 	background - color: grey;
// 	color: white;
// 	padding: 8px;
// 	text-align: center;
// }
//
// 	.bit-table .indices td div {
// 	background - color: #C27F0F;
// 	color: white;
// 	padding: 8px;
// 	text-align: center;
// }
// </style>
//
// <table className="bit-table">
// 	<tr className="number">
// 		<td colSpan="4">
// 			<div>142600</div>
// 		</td>
// 	</tr>
//
// 	<tr className="number">
// 		<td colSpan="4">
// 			<div>00100010110100001000</div>
// 		</td>
// 	</tr>
//
// 	<tr className="bit-chunks">
// 		<td>
// 			<div>00100</div>
// 		</td>
// 		<td>
// 			<div>01011</div>
// 		</td>
// 		<td>
// 			<div>01000</div>
// 		</td>
// 		<td>
// 			<div>01000</div>
// 		</td>
// 	</tr>
//
// 	<tr className="indices">
// 		<td>
// 			<div>4</div>
// 		</td>
// 		<td>
// 			<div>11</div>
// 		</td>
// 		<td>
// 			<div>8</div>
// 		</td>
// 		<td>
// 			<div>8</div>
// 		</td>
// 	</tr>
//
// </table>
