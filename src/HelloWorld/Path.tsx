import {useMemo, useRef} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {history} from './lib/constants';
import {calcNodes, calcPath} from './lib/functions';

export const Path: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const path = useMemo(() => {
		return calcPath(history);
	}, []);

	const nodes = useMemo(() => {
		return calcNodes(history);
	}, []);

	const pathRef = useRef(null);

	const getPathLength = () => {
		return pathRef.current ? (pathRef.current as any).getTotalLength() : 0;
	};

	const animatePath = interpolate(frame, [0, 4 * fps], [0, getPathLength()], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	const appearPath = interpolate(frame, [0, 2 * fps], [0, 1], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	const appearCircles = interpolate(frame, [4 * fps, 5 * fps], [0, 1], {
		extrapolateRight: 'clamp',
		extrapolateLeft: 'clamp',
	});

	return (
		<svg viewBox="0 0 1920 1080">
			<path
				ref={pathRef}
				d={path}
				fill="transparent"
				stroke="#F9CB8F"
				opacity={appearPath}
				strokeWidth={5}
				strokeDasharray={getPathLength()}
				strokeDashoffset={getPathLength() - animatePath}
			/>
			{nodes.map((node, idx) => {
				return (
					<circle
						opacity={appearCircles}
						cx={node.x}
						cy={node.y}
						r={16}
						fill="#F9CB8F"
						stroke="#F9CB8F"
						strokeWidth={5}
					/>
				);
			})}
		</svg>
	);
};
