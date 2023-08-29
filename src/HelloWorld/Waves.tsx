import {CSSProperties} from 'react';
import {
	interpolate,
	random,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const Waves: React.FC<{zoom: number}> = ({zoom}) => {
	const waveAmount = 10;
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	const waveLeftRight =
		100 * Math.sin(Number(interpolate(frame, [0, 500], [0, fps * 2])));

	const appear = interpolate(frame, [0, fps], [0, 1]);

	const waveStyle: CSSProperties = {
		width: '100%',
		height: 150,
	};

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				width: '100%',
				flex: 1,
				opacity: appear,
				background:
					'linear-gradient(180deg, rgba(133,246,255,1) 19%, rgba(1,35,52,1) 100%)',
			}}
		>
			{[...new Array(waveAmount)].map((_, idx) => (
				<div
					key={idx}
					style={{
						...waveStyle,
						transform: `translateX(${waveLeftRight}px) scale(3)`,
					}}
				>
					<svg viewBox="0 0 1440 320">
						<defs>
							<path
								id="sineWave"
								fill="#c3feff"
								fill-opacity="0.03 "
								d="M0,160 C320,300,420,300,740,160 C1060,20,1120,20,1440,160 V0 H0"
							/>
						</defs>
						<use className="wave" href="#sineWave" />
					</svg>
				</div>
			))}
		</div>
	);
};
