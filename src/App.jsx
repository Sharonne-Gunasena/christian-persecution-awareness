import { useEffect, useState } from 'react';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Headlines from './pages/Headlines.jsx';
import Charities from './pages/Charities.jsx';
import Statistics from './pages/Statistics.jsx';

// Hash routes, because GitHub Pages serves static files and can't rewrite /headlines etc.
export const routes = [
  { path: '/', label: 'Home', title: 'Persecuted for Faith', Page: Home },
  { path: '/headlines', label: 'Headlines', title: 'Headlines', Page: Headlines },
  { path: '/statistics', label: 'Statistics', title: 'Statistics', Page: Statistics },
  { path: '/charities', label: 'Charities', title: 'Charities', Page: Charities },
];

function currentPath() {
  const path = window.location.hash.replace(/^#/, '') || '/';
  return routes.some((r) => r.path === path) ? path : '/';
}

export default function App() {
  const [path, setPath] = useState(currentPath);

  useEffect(() => {
    const onChange = () => {
      setPath(currentPath());
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  const route = routes.find((r) => r.path === path);

  useEffect(() => {
    document.title = route.path === '/' ? route.title : `${route.title} · Persecuted for Faith`;
  }, [route]);

  return (
    <Layout routes={routes} path={path}>
      <route.Page />
    </Layout>
  );
}
