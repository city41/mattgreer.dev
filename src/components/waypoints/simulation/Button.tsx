import clsx from 'clsx';

type ButtonProps = JSX.IntrinsicElements['button'] & {
	tooltip?: string;
};

function Button({ className, tooltip, ...rest }: ButtonProps) {
	return (
		<button
			title={tooltip}
			className={clsx(className, 'hover:bg-blue-200')}
			{...rest}
		/>
	);
}

export { Button };
