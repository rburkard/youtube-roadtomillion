import {
	Img,
	interpolate,
	spring,
	staticFile,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {useTimelineContext} from '../HelloWorld';
import {history} from './lib/constants';
import {calcPath, calcProfitLoss} from './lib/functions';

export const Ship: React.FC<{
	zoom: number;
	animateWaterUpDown: number;
}> = ({zoom, animateWaterUpDown}) => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();
	const timelineActions = useTimelineContext();

	const rotation =
		2 * Math.sin(Number(interpolate(frame, [0, 300], [0, fps * 2])));

	const opacity = interpolate(
		frame,
		[timelineActions.enterRoman, timelineActions.enterRoman + 1],
		[0, 1]
	);

	const appearRoman =
		2 *
		(1 -
			spring({
				frame,
				fps,
				delay: timelineActions.enterRoman,
				config: {damping: 100},
			}));

	const driveAlongPath = interpolate(
		frame,
		[timelineActions.driveAlongPath, timelineActions.driveAlongPathEnd],
		[0, 100],
		{
			extrapolateRight: 'clamp',
			extrapolateLeft: 'clamp',
		}
	);

	return (
		<div
			style={{
				height: '100%',
				flex: 1,
				display: 'flex',
			}}
		>
			<div
				style={{
					position: 'absolute',
					offsetPath: `path("${calcPath(history)}")`,
					offsetDistance: `${driveAlongPath}%`,
				}}
			>
				<Img
					src={staticFile('pirateship.png')}
					style={{
						transform: `rotate(${rotation}deg) scale(${zoom}`,
						clipPath:
							frame > timelineActions.dropShip + fps * 1.5
								? `ellipse(100% ${85 + animateWaterUpDown / 3}% at 40% 10%)`
								: 'none',
					}}
				/>
				<Img
					src={staticFile('roman.png')}
					style={{
						position: 'absolute',
						left: 'calc(50% - 150px)',
						transform: ` rotate(${rotation - 10}deg) scale(${
							appearRoman + zoom / 2
						})`,
						opacity,
					}}
				/>
			</div>
		</div>
	);
};
