import React, { createContext, useContext } from 'react';

type LogoAnimationContextValue = {
  playLogoAnimation: () => void;
};

const noop = () => {};

const LogoAnimationContext = createContext<LogoAnimationContextValue>({
  playLogoAnimation: noop
});

type Props = {
  children: React.ReactNode;
  value: LogoAnimationContextValue;
};

export const LogoAnimationProvider = ({ children, value }: Props) => {
  return <LogoAnimationContext.Provider value={value}>{children}</LogoAnimationContext.Provider>;
};

export const useLogoAnimation = () => {
  return useContext(LogoAnimationContext);
};
