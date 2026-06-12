import { Outlet } from 'react-router';
import NavBar from '@/components/molecules/M_NavBar/M_NavBar';
import O_Footer from '@/components/organisms/O_Footer/O_Footer';
import { ScrollToTop } from '@/shared/utils/ScrollToTop';
import Q_Logo, { Q_LogoHandle } from '@/components/quarks/Q_Logo/Q_Logo';
import { LogoAnimationProvider } from '@/shared/contexts/logoAnimationContext';
import { useRef } from 'react';

const App = () => {
  const logoRef = useRef<Q_LogoHandle>(null);

  return (
    <LogoAnimationProvider
      value={{
        playLogoAnimation: () => {
          logoRef.current?.playAnimation();
        }
      }}>
      <div>
        <ScrollToTop />
        <Q_Logo ref={logoRef} />
        <NavBar />
        <Outlet />
        {/* Child routes are rendered through the <Outlet/> in the parent route. */}
        <O_Footer />
      </div>
    </LogoAnimationProvider>
  );
};

export default App;
