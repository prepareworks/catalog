import React, {ReactNode} from 'react';
import classNames from 'classnames';
import {createUseStyles} from 'react-jss';
import Colors from '../Colors';
import {TooltipStyles, TooltipPositions} from './index';


type TooltipProps = {
  text: string;
  styles?: TooltipStyles;
  children?: ReactNode;
  className?: string;
  boxClassName?: string;
  textClassName?: string;
};

const positions = (size: number) => ({
  top: {
    bottom: `calc(100% + ${size}px)`,
    left: '50%',
    transform: 'scale(0) translateX(-50%)',
    transformOrigin: 'bottom left',
  },
  right: {
    left: `calc(100% + ${size}px)`,
    bottom: '50%',
    transform: 'scale(0) translateY(50%)',
    transformOrigin: 'bottom left',
  },
  bottom: {
    top: `calc(100% + ${size}px)`,
    left: '50%',
    transform: 'scale(0) translateX(-50%)',
    transformOrigin: 'top left',
  },
  left: {
    right: `calc(100% + ${size}px)`,
    bottom: '50%',
    transform: 'scale(0) translateY(50%)',
    transformOrigin: 'bottom right',
  }
});

const useStyles = createUseStyles({
  root: {
    display: 'flex',
    position: 'relative',
    margin: (styles: TooltipStyles) => styles?.margin || 0,
    '&:hover $container': {
      opacity: 1,
      // avoid transform override cf: https://stackoverflow.com/questions/32224802/extend-the-final-state-of-the-first-animation-for-translated-element#answers
      transform: (styles: TooltipStyles) => (positions(styles?.space || 8)[styles?.position || TooltipPositions.BOTTOM]).transform.replace('0)', '1)'),
      transitionDuration: (styles: TooltipStyles) => styles?.duration || 150,
      transitionDelay: (styles: TooltipStyles) => styles?.delay || 250
    }
  },
  container: {
    width: 'max-content',
    height: 23,
    position: 'absolute',
    boxSizing: 'border-box',
    zIndex: 1,
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
    display: 'flex',
    alignItems: 'center',
    backgroundColor: (styles: TooltipStyles) => styles?.container?.color || Colors.lightSecondaryHoverBackgroundColor,
    borderRadius: (styles: TooltipStyles) => styles?.container?.radius || 3,
    opacity: 0,
    transitionDuration: (styles: TooltipStyles) => styles?.exitDuration || 100,
    transitionDelay: 0,
    transitionTimingFunction: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    padding: (styles: TooltipStyles) => styles?.container?.padding || '3px 4px'
  },
  text: {
    color: (styles: TooltipStyles) => styles?.text?.color || Colors.lightPrimaryTextColor,
    fontSize: (styles: TooltipStyles) => styles?.text?.size || 14,
  },
  position: (styles: TooltipStyles) => (positions(styles?.space || 8)[styles?.position || TooltipPositions.BOTTOM])
});

const Tooltip = ({children, text, styles, className, boxClassName, textClassName}: TooltipProps) => {
  const classes = useStyles(styles);
  return (
    <div className={classNames(classes.root, className)}>
      {children}
      <div className={classNames(classes.container, classes.position, boxClassName)}>
        <p className={classNames(classes.text, textClassName)}>
          {text}
        </p>
      </div>
    </div>
  );
};

export default Tooltip;
