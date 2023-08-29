import {
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Img} from 'remotion';
export const Treasure: React.FC<{zoom: number}> = ({zoom}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const moveAlongPathTresure = interpolate(frame, [5 * fps, 6 * fps], [0, 100]);

	const appearTreasure = interpolate(frame, [2 * fps, 3 * fps + 10], [0, 1]);

	return (
		<div
			style={{
				position: 'absolute',
				offsetPath: `path("M 1200 560 C 1300 560, 1400 560 1750 200")`,
				offsetDistance: `${moveAlongPathTresure}%`,
				offsetRotate: '0deg',
			}}
		>
			{frame >= 6 * fps && (
				<h1
					style={{
						color: '#00ff00',
						fontSize: 50,
						margin: 0,
						fontFamily: 'Trebuchet MS',
						position: 'absolute',
						bottom: 80,
						left: 60,
					}}
				>
					1'000'000 $
				</h1>
			)}
			<Img
				src={staticFile('treasure.png')}
				style={{
					transform: `scale(${zoom}`,
					opacity: appearTreasure,
					width: 400,
				}}
			/>
		</div>
	);
};
