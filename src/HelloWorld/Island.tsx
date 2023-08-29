import {
	Img,
	interpolate,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

export const Island: React.FC<{animateWaterUpDown: number}> = ({
	animateWaterUpDown,
}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	return (
		<Img
			style={{
				objectFit: 'contain',
				maxWidth: 400,
				maxHeight: 300,
				width: 'auto',
				height: 'auto',
				position: 'absolute',
				top: 20,
				right: 20,
				clipPath: `ellipse(100% ${85 + animateWaterUpDown}% at 50% 10%)`,
			}}
			src={staticFile('island.png')}
		/>
	);
};
