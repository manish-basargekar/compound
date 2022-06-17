import Style from "./ProgressBar.module.scss"

const ProgressBar = ({habitList}) => {
  return (
		<div className={Style.outof}>
			{habitList.length > 0 ? (
				<span className={Style.status}>
					{(
						(habitList.filter((f) => f.status === true).length /
							habitList.length) *
						100
					).toFixed()}
					%
				</span>
			) : (
				"0%"
			)}
			<div className={Style.progressWrapper}>
				<div
					className={Style.bar}
					style={{
						width: `${
							(habitList.filter((f) => f.status === true).length /
								habitList.length) *
							100
						}%`,
					}}
				></div>
			</div>
		</div>
	);
}

export default ProgressBar