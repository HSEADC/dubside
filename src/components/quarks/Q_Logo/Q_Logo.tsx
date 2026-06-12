import React, { forwardRef, useEffect, useId, useImperativeHandle, useRef } from 'react';
import classes from '@/components/quarks/Q_Logo/Q_Logo.module.scss';

export type Q_LogoHandle = {
  playAnimation: () => void;
};

type SVGAnimationNode = SVGAnimationElement | null;
const ANIMATION_DURATION_MS = 800;

const Q_Logo = forwardRef<Q_LogoHandle>(function Q_Logo(_, ref) {
  const clipPathId = useId();
  const animationRefs = useRef<SVGAnimationNode[]>([]);
  const isAnimatingRef = useRef(false);
  const animationTimeoutRef = useRef<number | null>(null);
  const hoverIntervalRef = useRef<number | null>(null);

  const setAnimationRef = (index: number) => (node: SVGAnimationNode) => {
    animationRefs.current[index] = node;
  };

  const playAnimation = () => {
    if (isAnimatingRef.current) return;

    isAnimatingRef.current = true;
    animationRefs.current.forEach((node) => {
      node?.beginElement();
    });

    if (animationTimeoutRef.current) {
      window.clearTimeout(animationTimeoutRef.current);
    }

    animationTimeoutRef.current = window.setTimeout(() => {
      isAnimatingRef.current = false;
      animationTimeoutRef.current = null;
    }, ANIMATION_DURATION_MS);
  };

  const stopHoverLoop = () => {
    if (hoverIntervalRef.current) {
      window.clearInterval(hoverIntervalRef.current);
      hoverIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      stopHoverLoop();

      if (animationTimeoutRef.current) {
        window.clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      playAnimation
    }),
    []
  );

  return (
    <div
      className={classes.wrapper}
      aria-hidden="true"
      onMouseEnter={() => {
        playAnimation();
        stopHoverLoop();
        hoverIntervalRef.current = window.setInterval(playAnimation, ANIMATION_DURATION_MS);
      }}
      onMouseLeave={stopHoverLoop}>
      <svg
        className={classes.logo}
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation">
        <defs>
          <clipPath id={clipPathId}>
            <circle cx="50" cy="50" r="25" />
          </clipPath>
        </defs>

        <circle cx="50" cy="50" r="25" fill="white" />

        <g>
          <animateTransform
            ref={setAnimationRef(0)}
            attributeName="transform"
            type="rotate"
            begin="indefinite"
            from="0 50 50"
            to="-360 50 50"
            dur="0.8s"
            repeatCount="1"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.7 0 0.7 1"
          />
          <g transform="rotate(12, 50, 50)">
            <ellipse cx="50" cy="50" rx="38" ry="12" fill="white">
              <animate
                ref={setAnimationRef(1)}
                attributeName="ry"
                begin="indefinite"
                values="12;6;10;12;12"
                keyTimes="0;0.25;0.5;0.75;1"
                dur="0.8s"
                repeatCount="1"
                fill="freeze"
                calcMode="spline"
                keySplines="0.7 0 0.7 1;0.7 0 0.7 1;0.7 0 0.7 1;0.7 0 0.7 1"
              />
            </ellipse>
          </g>
        </g>

        <g clipPath={`url(#${clipPathId})`}>
          <g>
            <animateTransform
              ref={setAnimationRef(2)}
              attributeName="transform"
              type="rotate"
              begin="indefinite"
              from="0 50 50"
              to="-360 50 50"
              dur="0.8s"
              repeatCount="1"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.7 0 0.7 1"
            />
            <g transform="rotate(12, 50, 50)">
              <ellipse cx="50" cy="50" rx="38" ry="12" fill="black">
                <animate
                  ref={setAnimationRef(3)}
                  attributeName="ry"
                  begin="indefinite"
                  values="12;6;10;12;12"
                  keyTimes="0;0.25;0.5;0.75;1"
                  dur="0.8s"
                  repeatCount="1"
                  fill="freeze"
                  calcMode="spline"
                  keySplines="0.7 0 0.7 1;0.7 0 0.7 1;0.7 0 0.7 1;0.7 0 0.7 1"
                />
              </ellipse>
            </g>
          </g>
        </g>

        <g>
          <animateTransform
            ref={setAnimationRef(4)}
            attributeName="transform"
            type="rotate"
            begin="indefinite"
            from="0 50 50"
            to="-360 50 50"
            dur="0.8s"
            repeatCount="1"
            fill="freeze"
            calcMode="spline"
            keyTimes="0; 1"
            keySplines="0.7 0 0.7 1"
          />
          <g transform="rotate(12, 50, 50)">
            <ellipse cx="50" cy="50" rx="6" ry="2" fill="white">
              <animate
                ref={setAnimationRef(5)}
                attributeName="ry"
                begin="indefinite"
                values="2;1;1.5;2;2"
                keyTimes="0;0.25;0.5;0.75;1"
                dur="0.8s"
                repeatCount="1"
                fill="freeze"
                calcMode="spline"
                keySplines="0.7 0 0.7 1;0.7 0 0.7 1;0.7 0 0.7 1;0.7 0 0.7 1"
              />
            </ellipse>
          </g>
        </g>
      </svg>
    </div>
  );
});

export default Q_Logo;
