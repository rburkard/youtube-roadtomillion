import {CSSProperties} from 'react';
import {random, spring, useCurrentFrame, useVideoConfig} from 'remotion';
import {Node} from './lib/functions';

export const Label: React.FC<{node: Node}> = ({node}) => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const width = 500;
	const height = 400;

	const fontStyle: CSSProperties = {
		fontFamily: 'Courier New',
		fontWeight: 'bold',
		fontSize: 100,
	};

	const titleFont: CSSProperties = {
		fontFamily: 'Courier New',
		fontWeight: 'bold',
		fontSize: 40,
		color: '#634b27',
	};

	const animateUpDown = 150 * spring({frame, fps, config: {damping: 100}});

	const size = spring({frame, fps, config: {damping: 30}});

	const rotate = spring({frame, fps, config: {damping: 30}});

	return (
		<div
			key={node.title}
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				position: 'absolute',
				flexDirection: 'column',
				width,
				height,
				top: node.y - height / 2,
				left: node.x - width / 2,
			}}
		>
			{node.total < 0 && (
				<p style={{...titleFont, opacity: size}}>{node.title}</p>
			)}
			<p
				key={node.title}
				style={{
					...fontStyle,
					color: node.total >= 0 ? '#00ff00' : '#e01e1e',
					transform: `translateY(${
						node.total >= 0 ? -1 * animateUpDown : animateUpDown
					}px) scale(${size}) rotate(${rotate * 30 * random(node.x)}deg)`,
				}}
			>
				{node.total === 0 ? '???' : node.total} $
			</p>
			{node.total >= 0 && (
				<p style={{...titleFont, opacity: size}}>{node.title}</p>
			)}
		</div>
	);
};
