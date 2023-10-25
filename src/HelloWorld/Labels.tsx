import {CSSProperties, useMemo} from 'react';
import {interpolate, Sequence, useCurrentFrame, useVideoConfig} from 'remotion';
import {useTimelineContext} from '../HelloWorld';
import {Label} from './Label';
import {history} from './lib/constants';
import {calcNodes} from './lib/functions';

export const Labels: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const timelineActions = useTimelineContext();

	const nodes = useMemo(() => {
		return calcNodes(history);
	}, []);

	const calcIncrement = () => {
		const movingFrames =
			timelineActions.driveAlongPathEnd - timelineActions.driveAlongPath;

		const perNode = movingFrames / nodes.length;

		return perNode;
	};

	return (
		<>
			{nodes.map((node, idx) => {
				return (
					<Sequence
						from={calcIncrement() * (idx + 1)}
						durationInFrames={3 * fps}
					>
						<Label node={node} />
					</Sequence>
				);
			})}
		</>
	);
};
