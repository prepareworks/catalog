import React from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import SvgIcon, { Icons } from './svg';

type IconProps = {
	icon: Icons;
	size?: number | string;
	color?: string;
	className?: string;
	onClick?: (icon: Icons) => void;
};

const useStyles = createUseStyles({
	Icon: {
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'Segoe UI',
			'Roboto',
			'Helvetica',
			'Arial',
			'sans-serif',
			'Apple Color Emoji',
			'Segoe UI Emoji',
			'Segoe UI Symbol'
		],
		width: (props: IconProps) => props.size || 'auto',
		height: (props: IconProps) => props.size || 'auto'
	},
	svg: {
		width: '100%',
		height: '100%',
		fill: (props: IconProps) => props.color || 'black'
	}
});

const Icon = (props: IconProps) => {
	const classes = useStyles(props);
	const Svg = SvgIcon[props.icon];

	return (
		<div className={classNames(classes.Icon, props.className)} onClick={() => props.onClick && props.onClick(props.icon)}>
			<Svg className={classes.svg} />
		</div>
	);
};

export default React.memo(Icon);