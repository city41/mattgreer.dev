import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { Simulation } from '../sim/Simulation';
import { basicWaypoints, waypoints } from '../sim/waypoints';
import { Button } from '../Button';

import styles from './SimulationCmp.module.css';
import { BasicVehicle } from '../sim/BasicVehicle';

type Level = 'basic';

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
				[new BasicVehicle(105, 120, 1 / 2, 'green')],
				basicWaypoints,
				300
			);
	}
}

function SimulationCmp({ level }: SimulationCmpProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const sim = useRef<Simulation>(null);
	const [mode, setMode] = useState<'playing' | 'reversing' | 'stopped'>(
		'stopped'
	);
	const [frame, setFrame] = useState(0);
	const [delay, setDelay] = useState(60);

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
		setDelay(60);
		sim.current?.goTo(0);
		setFrame(0);
	}

	sim.current?.goTo(clamp(frame, 0, sim.current!.historySize - 1));

	return (
		<>
			<div>
				<canvas
					className={styles.canvas}
					ref={canvasRef}
					width={320}
					height={224}
				/>
			</div>
			<div>
				<div>
					frame: {frame}, delay: {delay}
				</div>
			</div>
			<div>
				<Button onClick={() => setMode('playing')}>Play</Button>
				<Button onClick={() => setMode('reversing')}>Reverse</Button>
				<Button onClick={() => setMode('stopped')}>Stop</Button>
				<Button onClick={handleReset}>Reset</Button>
			</div>
			<div>
				<Button onClick={() => setDelay((d) => Math.max(d - 10, 10))}>
					Faster
				</Button>
				<Button onClick={() => setDelay((d) => d + 10)}>Slower</Button>
			</div>
			<div>
				<Button onClick={() => setFrame((f) => f + 1)}>+ 1</Button>
				<Button onClick={() => setFrame((f) => f - 1)}>- 1</Button>
			</div>
		</>
	);
}

export { SimulationCmp };
