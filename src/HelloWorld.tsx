import {interpolate} from 'remotion';
import {createContext, CSSProperties, useContext} from 'react';
import {
	AbsoluteFill,
	Sequence,
	spring,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {Island} from './HelloWorld/Island';
import {Path} from './HelloWorld/Path';
import {Shark} from './HelloWorld/Shark';
import {Ship} from './HelloWorld/Ship';
import {Waves} from './HelloWorld/Waves';
import {Labels} from './HelloWorld/Labels';
import {Fish} from './HelloWorld/Fish';
import {friendMessage} from './HelloWorld/lib/constants';

const baseStyle: CSSProperties = {
	justifyContent: 'center',
	alignItems: 'center',
};

export type TimelineActions = {
	enterShip: number;
	enterRoman: number;
	appearWaves: number;
	dropShip: number;
	drawPath: number;
	driveAlongPath: number;
	driveAlongPathEnd: number;
	fadeOutScene: number;
};

type TimelineContextType = TimelineActions | null;

const TimelineContext = createContext<TimelineContextType>(null);

export const useTimelineContext = () => {
	const timelineContext = useContext(TimelineContext);

	if (!timelineContext) {
		throw new Error('no timeline context available');
	}

	return timelineContext;
};

export const HelloWorld: React.FC = () => {
	const frame = useCurrentFrame();
	const {durationInFrames, fps} = useVideoConfig();

	const timelineActions: TimelineActions = {
		enterShip: 0,
		enterRoman: fps,
		appearWaves: fps,
		dropShip: 4 * fps,
		drawPath: 6 * fps,
		driveAlongPath: 10 * fps,
		driveAlongPathEnd: 20 * fps,
		fadeOutScene: 24 * fps,
	};

	const zoom =
		1.4 -
		spring({
			frame,
			fps,
			delay: 5 * fps,
			config: {
				damping: 100,
			},
		});

	const animateWaterUpDown =
		5 * Math.sin(Number(interpolate(frame, [0, 800], [0, fps * 2])));

	const sceneOpacity = interpolate(
		frame,
		[timelineActions.fadeOutScene, timelineActions.fadeOutScene + fps],
		[1, 0]
	);
	// A <AbsoluteFill> is just a absolutely positioned <div>!
	return (
		<TimelineContext.Provider value={timelineActions}>
			<AbsoluteFill style={{...baseStyle, backgroundColor: 'white'}}>
				<AbsoluteFill style={{...baseStyle, opacity: sceneOpacity}}>
					<Sequence style={{...baseStyle, zIndex: 2}}>
						<Ship zoom={zoom} animateWaterUpDown={animateWaterUpDown} />
					</Sequence>
					<Sequence
						from={timelineActions.drawPath}
						style={{...baseStyle, zIndex: 1}}
					>
						<Path />
					</Sequence>
					<Sequence
						from={timelineActions.dropShip}
						style={{...baseStyle, zIndex: 1}}
					>
						<Island animateWaterUpDown={animateWaterUpDown} />
					</Sequence>
					<Sequence
						from={timelineActions.driveAlongPath}
						style={{...baseStyle, zIndex: 1}}
					>
						<Labels />
					</Sequence>
				</AbsoluteFill>
				<Sequence style={{...baseStyle, zIndex: 0}} from={3 * fps}>
					<Waves zoom={zoom} />
				</Sequence>
				<Sequence
					from={timelineActions.dropShip}
					style={{...baseStyle, zIndex: 1}}
				>
					<Shark />
				</Sequence>
				<Sequence
					from={
						(timelineActions.driveAlongPath - timelineActions.driveAlongPath) /
						2
					}
					style={{...baseStyle, zIndex: 1}}
				>
					<Fish absFrame={frame} message={friendMessage} />
				</Sequence>
			</AbsoluteFill>
		</TimelineContext.Provider>
	);
};
