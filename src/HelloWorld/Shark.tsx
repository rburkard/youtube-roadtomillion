import {
	Img,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const Shark: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const animateLeftRight = interpolate(
		frame,
		[0, durationInFrames / 2],
		[2000, -600],
		{
			extrapolateRight: 'clamp',
			extrapolateLeft: 'clamp',
		}
	);

	const animateUpDown =
		10 * Math.sin(Number(interpolate(frame, [0, 800], [0, fps * 2])));

	console.log(animateUpDown);

	return (
		<Img
			style={{
				objectFit: 'contain',
				maxWidth: 400,
				maxHeight: 300,
				width: 'auto',
				height: 'auto',
				position: 'absolute',
				bottom: animateUpDown,
				left: animateLeftRight,
				transform: `rotate(${Math.abs(animateUpDown)}deg)`,
				clipPath: `polygon(0 0, 100% 0%, 100% ${30 + animateUpDown}%, 0 ${
					40 + animateUpDown * 2
				}%)`,
			}}
			src={staticFile('shark.png')}
		/>
	);
};
