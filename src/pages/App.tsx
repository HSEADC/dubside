import { Outlet } from 'react-router';
import NavBar from '@/components/molecules/M_NavBar/M_NavBar';

const App = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* Child routes are rendered through the <Outlet/> in the parent route. */}
    </div>
  );
};

export default App;
