import { useEffect } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom';

function RedirectToHomeOnRefresh() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== '/') {
      console.log(location.pathname);
      navigate("/");
    }
  }, []);

}

export default RedirectToHomeOnRefresh;