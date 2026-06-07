import CssBaseline from '@mui/material/CssBaseline';
import { createHashRouter, RouterProvider } from 'react-router';
// import DashboardLayout from './components/DashboardLayout';
import SpecList from '../components/SpecList';
import SpecShow from '../components/SpecShow';
import SpecCreate from '../components/SpecCreate';
import SpecEdit from '../components/SpecEdit';
import NotificationsProvider from '../hooks/useNotifications/NotificationsProvider';
import DialogsProvider from '../hooks/useDialogs/DialogsProvider';
import AppTheme from '../shared-theme/AppTheme';
import {
  dataGridCustomizations,
  datePickersCustomizations,
  // sidebarCustomizations,
  formInputCustomizations,
} from './theme/customizations';

const router = createHashRouter([
  {
    Component: DashboardLayout,
    children: [
      {
        path: '/Specs',
        Component: SpecList,
      },
      {
        path: '/Specs/:SpecId',
        Component: SpecShow,
      },
      {
        path: '/Specs/new',
        Component: SpecCreate,
      },
      {
        path: '/Specs/:SpecId/edit',
        Component: SpecEdit,
      },
      // Fallback route for the example routes in dashboard sidebar items
      {
        path: '*',
        Component: SpecList,
      },
    ],
  },
]);

const themeComponents = {
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  // ...sidebarCustomizations,
  ...formInputCustomizations,
};

export default function CrudDashboard(props) {
  return (
    <AppTheme {...props} themeComponents={themeComponents}>
      <CssBaseline enableColorScheme />
      <NotificationsProvider>
        <DialogsProvider>
          <RouterProvider router={router} />
        </DialogsProvider>
      </NotificationsProvider>
    </AppTheme>
  );
}
