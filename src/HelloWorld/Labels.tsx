import {CSSProperties, useMemo} from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {Label} from './Label';
import {history} from './lib/constants';
import {calcNodes} from './lib/functions';

export const Labels: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const nodes = useMemo(() => {
		return calcNodes(history);
	}, []);

	const getNode = (frame: number) => {
		const idx = Math.floor(frame / 100);

		if (idx >= nodes.length) {
			return nodes[nodes.length - 1];
		}

		return nodes[idx];
	};

	return <Label key={getNode(frame).title} node={getNode(frame)} />;
};
