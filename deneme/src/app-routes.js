import { HomePage, TasksPage, ProfilePage, DashboardPage, TartımPage, KesimPage, RasyonPage } from './pages';
import { withNavigationWatcher } from './contexts/navigation';

const routes = [
    {
        path: '/tasks',
        element: TasksPage
    },
    {
        path: '/profile',
        element: ProfilePage
    },
    {
        path: '/home',
        element: HomePage
    }, 
  {
    path: '/dashboard',
    element: DashboardPage
  }, 
  {
    path: '/tartım',
    element: TartımPage
  }, 
  {
    path: '/kesim',
    element: KesimPage
  }, 
  {
    path: '/rasyon',
    element: RasyonPage
  }
];

export default routes.map(route => {
    return {
        ...route,
        element: withNavigationWatcher(route.element, route.path)
    };
});
