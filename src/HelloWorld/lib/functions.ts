import {useVideoConfig} from 'remotion';
import {HistoryEntry} from './types';

const pathStartingPoints = [300, 500];

export const calcPath = (history: Array<HistoryEntry>): string => {
	let path = `M ${pathStartingPoints[0]} ${pathStartingPoints[1]}`;
	let lastPoint = pathStartingPoints;

	const totalX = 1920;
	const totalY = 1080;

	const totalMoney = 100000;

	const pixelByMoney = totalY / totalMoney;

	history.forEach((item, idx) => {
		const diff = item.income - item.spending - item.timeEffort * 50;

		const moveY = Math.floor(pixelByMoney * diff);

		const moveX = 200;

		lastPoint = [lastPoint[0] + moveX, lastPoint[1] - moveY];

		path += `${' '}L${' '}${lastPoint[0]}${' '}${lastPoint[1]}`;
	});

	return path;
};

export type Node = {x: number; y: number; title: string; total: number};

export const calcNodes = (history: Array<HistoryEntry>): Array<Node> => {
	const path = `M ${pathStartingPoints[0]} ${pathStartingPoints[1]}`;
	let lastPoint = pathStartingPoints;

	const totalX = 1920;
	const totalY = 1080;

	const totalMoney = 100000;

	const pixelByMoney = totalY / totalMoney;

	const returnArr: Array<Node> = [];

	history.forEach((item, idx) => {
		const diff = item.income - item.spending - item.timeEffort * 50;

		const moveY = Math.floor(pixelByMoney * diff);

		const moveX = 200;

		lastPoint = [lastPoint[0] + moveX, lastPoint[1] - moveY];

		returnArr.push({
			x: lastPoint[0],
			y: lastPoint[1],
			title: item.title,
			total: diff,
		});
	});

	return returnArr;
};

export const calcProfitLoss = (history: Array<HistoryEntry>) => {
	let tot = 0;
	history.forEach((item, idx) => {
		const diff = item.income - item.spending - item.timeEffort * 50;
		tot += diff;
	});

	return tot;
};
