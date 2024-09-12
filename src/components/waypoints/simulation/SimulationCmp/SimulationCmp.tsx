import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Simulation } from '../sim/Simulation';
import { basicWaypoints, smoothTurningWaypoints } from '../sim/waypoints';
import { Button } from '../Button';

import styles from './SimulationCmp.module.css';
import { BasicVehicle } from '../sim/BasicVehicle';
import { SmoothTurningVehicle } from '../sim/SmoothTurningVehicle';
import {
	RiPlayLargeFill,
	RiPlayReverseLargeFill,
	RiRewindStartFill,
	RiStopFill,
	RiStopLargeFill,
} from 'react-icons/ri';
import { FaStepBackward, FaStepForward } from 'react-icons/fa';

type Level = 'basic' | 'smooth-turning-1' | 'smooth-turning-2';

type SimulationCmpProps = {
	level: Level;
};

function clamp<T extends number>(v: T, min: T, max: T) {
	return Math.min(Math.max(v, min), max);
}

function getSimulation(level: Level, canvas: HTMLCanvasElement) {
	switch (level) {
		case 'basic':
			return new Simulation(
				canvas,
				[new BasicVehicle(105, 120, 1 / 4, 'rgb(200, 255, 100)')],
				basicWaypoints,
				500
			);
		case 'smooth-turning-1':
			return new Simulation(
				canvas,
				[new SmoothTurningVehicle(105, 120, 1 / 4, 'rgb(200, 255, 100)')],
				basicWaypoints,
				500
			);
		case 'smooth-turning-2':
			return new Simulation(
				canvas,
				[new SmoothTurningVehicle(105, 120, 1 / 4, 'rgb(200, 255, 100)')],
				smoothTurningWaypoints,
				500
			);
	}
}

const DEFAULT_DELAY = 24;

function SimulationCmp({ level }: SimulationCmpProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const sim = useRef<Simulation>(null);
	const [mode, setMode] = useState<'playing' | 'reversing' | 'stopped'>(
		'stopped'
	);
	const [frame, setFrame] = useState(0);
	const [delay, setDelay] = useState(DEFAULT_DELAY);

	useEffect(() => {
		if (canvasRef.current && !sim.current) {
			(sim as MutableRefObject<Simulation>).current = getSimulation(
				level,
				canvasRef.current
			);
		}
	}, [level]);

	useEffect(() => {
		let timeoutId: NodeJS.Timeout;
		if (!sim.current) {
			return;
		}

		if (mode === 'playing') {
			if (frame >= sim.current.historySize - 1) {
				setMode('stopped');
			} else {
				timeoutId = setTimeout(() => {
					setFrame((f) => f + 1);
				}, delay);
			}
		}

		if (mode === 'reversing') {
			if (frame <= 0) {
				setMode('stopped');
			} else {
				timeoutId = setTimeout(() => {
					setFrame((f) => f - 1);
				}, delay);
			}
		}

		return () => clearTimeout(timeoutId);
	}, [mode, frame, setFrame, setMode, delay]);

	function handleReset() {
		setMode('stopped');
		setDelay(DEFAULT_DELAY);
		sim.current?.goTo(0);
		setFrame(0);
	}

	sim.current?.goTo(clamp(frame, 0, sim.current!.historySize - 1));

	return (
		<div className="border-4 border-focal">
			<div>
				<canvas
					className={styles.canvas}
					ref={canvasRef}
					width={320}
					height={224}
				/>
			</div>
			<div className="flex flex-row gap-x-1 justify-center text-4xl">
				<Button onClick={handleReset}>
					<RiRewindStartFill />
				</Button>
				<div className="w-4" />
				<Button onClick={() => setMode('reversing')} tooltip="play in reverse">
					<RiPlayReverseLargeFill />
				</Button>
				<Button onClick={() => setMode('playing')} tooltip="play">
					<RiPlayLargeFill className="text-green-700" />
				</Button>
				<Button onClick={() => setMode('stopped')} tooltip="stop">
					<RiStopFill className="text-red-700 " />
				</Button>
				<div className="w-4" />
				<Button
					onClick={() => setFrame((f) => f - 1)}
					tooltip="one frame backwards"
				>
					<FaStepBackward />
				</Button>
				<Button
					onClick={() => setFrame((f) => f + 1)}
					tooltip="one frame forward"
				>
					<FaStepForward />
				</Button>
			</div>
		</div>
	);
}

export { SimulationCmp };
