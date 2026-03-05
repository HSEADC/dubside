import { Outlet } from 'react-router';
import NavBar from '@/components/molecules/M_NavBar/M_NavBar';
import O_Footer from '@/components/organisms/O_Footer/O_Footer';

const App = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* Child routes are rendered through the <Outlet/> in the parent route. */}
      <O_Footer />
    </div>
  );
};

export default App;
