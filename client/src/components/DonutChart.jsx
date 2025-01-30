import React from "react";
import { PieChart } from "react-minimal-pie-chart";

const DonutChart = ({ completedCount, pendingCount }) => {
	return (
		<div style={{ width: "300px", margin: "auto" }}>
			<PieChart
				data={[
					{
						title: `Completed-${completedCount}`,
						value: completedCount,
						color: "rgba(0, 255, 255, 0.7)",
					},
					{
						title: `Pending-${pendingCount}`,
						value: pendingCount,
						color: "rgba(0, 128, 255, 0.7)",
					},
				]}
				radius={30}
				lineWidth={33}
				segmentsShift={1}
				label={({ dataEntry }) => `${dataEntry.title}`}
				labelStyle={{
					fontSize: "5px",
					fontWeight: "semibold",
					fill: "#F5F5F5",
					textShadow: "0 1px 2px rgba(0, 0, 0, 0.5)",
				}}
				labelPosition={100}
				animate
				style={{
					filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.2))",
				}}
			/>
		</div>
	);
};

export default DonutChart;
