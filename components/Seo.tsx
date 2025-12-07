import React, { useEffect, useState, createContext, useContext } from 'react';

interface SeoProps {
  title: string;
  description?: string;
}

export const Seo: React.FC<SeoProps> = ({ title, description }) => {
  useEffect(() => {
    // Actualizar título
    document.title = `${title} | Aura Store`;
    
    // Actualizar meta description si existe
    if (description) {
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }
    }
  }, [title, description]);

  return null;
};

// --- Router Shim Implementation ---
// Replaces react-router-dom to fix missing dependency errors

const RouterContext = createContext<{
  path: string;
  navigate: (to: string | number) => void;
}>({ path: '/', navigate: () => {} });

const RouteContext = createContext<{ params: Record<string, string> }>({ params: {} });

export const HashRouter: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [path, setPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handler = () => setPath(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (to: string | number) => {
    if (typeof to === 'number') {
      window.history.go(to);
    } else {
      window.location.hash = to as string;
    }
  };

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useLocation = () => {
  const { path } = useContext(RouterContext);
  return { pathname: path, search: '', hash: window.location.hash, state: null, key: 'default' };
};

export const useNavigate = () => {
  const { navigate } = useContext(RouterContext);
  return navigate;
};

export const useParams = <T extends Record<string, string | undefined> = Record<string, string>>() => {
   const { params } = useContext(RouteContext);
   return params as T;
};

function matchPath(pattern: string, path: string) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = path.split('/').filter(Boolean);
  
  if (patternParts.length !== pathParts.length) return null;

  const params: Record<string, string> = {};
  for (let i = 0; i < patternParts.length; i++) {
    const pat = patternParts[i];
    const act = pathParts[i];
    if (pat.startsWith(':')) {
      params[pat.slice(1)] = act;
    } else if (pat !== act) {
      return null;
    }
  }
  return { params };
}

export const Routes: React.FC<{children: React.ReactNode}> = ({ children }) => {
   const { path } = useContext(RouterContext);
   
   let selectedRoute: React.ReactNode = null;
   let selectedParams = {};

   React.Children.forEach(children, (child) => {
      if (selectedRoute) return;
      if (!React.isValidElement(child)) return;
      
      const { path: routePath, element } = child.props as { path: string, element: React.ReactNode };
      
      if (routePath === path) {
         selectedRoute = element;
      } else {
         const match = matchPath(routePath, path);
         if (match) {
            selectedRoute = element;
            selectedParams = match.params;
         }
      }
   });

   return (
      <RouteContext.Provider value={{ params: selectedParams }}>
         {selectedRoute}
      </RouteContext.Provider>
   );
};

export const Route: React.FC<{ path: string, element: React.ReactNode }> = () => null;

export const Link: React.FC<{ to: string, children: React.ReactNode, className?: string, onClick?: () => void }> = ({ to, children, className, onClick }) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        if (onClick) onClick();
        
        // Critical Fix: Prevent default browser navigation for internal links
        // This solves "connection refused" errors in preview environments
        if (to && to.startsWith('/')) {
            e.preventDefault();
            navigate(to);
        }
    };

    const href = to && to.startsWith('/') ? `#${to}` : to;

    return (
        <a href={href} className={className} onClick={handleClick}>
            {children}
        </a>
    );
};