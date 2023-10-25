import {CSSProperties} from 'react';
import {
	AbsoluteFill,
	Img,
	interpolate,
	random,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {useTimelineContext} from '../HelloWorld';
import {friendMessage} from './lib/constants';

const font: CSSProperties = {
	fontFamily: 'Courier New',
	fontSize: 32,
	color: '#634b27',
	textAlign: 'center',
	fontWeight: 'bold',
};

export const Fish: React.FC<{message: string; absFrame: number}> = ({
	message,
	absFrame,
}) => {
	const frame = useCurrentFrame();
	const {fps, width, height} = useVideoConfig();

	const timelineActions = useTimelineContext();

	const animateUpDown =
		10 * Math.sin(Number(interpolate(frame, [0, 800], [0, fps * 2])));

	const bottom = random(new Date().getDate()) * (height / 2) + 120;
	const right = random(new Date().getDate()) * (width / 4) + 80;

	const appear =
		interpolate(
			absFrame,
			[
				timelineActions.driveAlongPathEnd - timelineActions.driveAlongPath,
				timelineActions.driveAlongPathEnd -
					timelineActions.driveAlongPath +
					fps,
			],
			[-20, 60],
			{
				extrapolateRight: 'clamp',
				extrapolateLeft: 'clamp',
			}
		) +
		interpolate(
			absFrame,
			[
				timelineActions.driveAlongPathEnd -
					timelineActions.driveAlongPath +
					fps * 5,
				timelineActions.driveAlongPathEnd -
					timelineActions.driveAlongPath +
					fps * 6,
			],
			[0, -80],
			{
				extrapolateRight: 'clamp',
				extrapolateLeft: 'clamp',
			}
		);

	return (
		<AbsoluteFill>
			{frame >=
				timelineActions.driveAlongPathEnd -
					timelineActions.driveAlongPath +
					fps &&
				frame <
					timelineActions.driveAlongPathEnd -
						timelineActions.driveAlongPath +
						fps * 5 && (
					<div
						style={{
							position: 'absolute',
							bottom,
							right,
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Img
							style={{
								maxWidth: 500,
								maxHeight: 400,
								width: 'auto',
								height: 'auto',
							}}
							src={staticFile('bubble.png')}
						/>
						<p
							style={{
								...font,
								padding: 8,
								position: 'absolute',
								maxWidth: 250,
								marginBottom: 40,
								overflowWrap: 'break-word',
							}}
						>
							{message}
						</p>
					</div>
				)}
			<Img
				style={{
					objectFit: 'contain',
					maxWidth: 300,
					maxHeight: 150,
					width: 'auto',
					height: 'auto',
					position: 'absolute',
					bottom: bottom - 120,
					right: right - 80,
					transform: `rotate(${Math.abs(animateUpDown)}deg)`,
					clipPath: `polygon(0 0, 100% 0%, 100% ${appear + animateUpDown}%, 0 ${
						appear + animateUpDown
					}%)`,
				}}
				src={staticFile('fish.png')}
			/>
		</AbsoluteFill>
	);
};
