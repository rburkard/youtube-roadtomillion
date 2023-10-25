import {CSSProperties} from 'react';
import {
	Img,
	interpolate,
	random,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {recruiterSayings} from './lib/constants';

export const Shark: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps, durationInFrames} = useVideoConfig();

	const animateLeftRight = interpolate(
		frame,
		[0, durationInFrames],
		[2000, -600],
		{
			extrapolateRight: 'clamp',
			extrapolateLeft: 'clamp',
		}
	);

	const font: CSSProperties = {
		fontFamily: 'Courier New',
		fontSize: 18,
		color: '#634b27',
		textAlign: 'center',
		fontWeight: 'bold',
		maxWidth: 240,
	};

	const animateUpDown =
		10 * Math.sin(Number(interpolate(frame, [0, 800], [0, fps * 2])));

	console.log(animateUpDown);

	return (
		<>
			{/* {frame >= 14 * fps && (
				<div
					style={{
						position: 'absolute',
						bottom: animateUpDown + 80,
						left: animateLeftRight - 250,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Img
						style={{
							maxWidth: 300,
							maxHeight: 300,
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
							marginBottom: 40,
						}}
					>
						{
							recruiterSayings[
								Math.floor(
									random(new Date().getDate()) * (recruiterSayings.length - 1)
								)
							]
						}
					</p>
				</div>
			)} */}
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
		</>
	);
};
