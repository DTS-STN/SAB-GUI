import withProvider from './withProvider'

import LandingPage from './pages/LandingPage'
import SelectLocationsPage from './pages/SelectLocationsPage'
import RegistrationPage from './pages/RegistrationPage'
import CalendarPage from './pages/CalendarPage'
import ReviewPage from './pages/ReviewPage'
import ExplanationPage from './pages/ExplanationPage'
import ConfirmationPage from './pages/ConfirmationPage'
import ErrorPage from './pages/ErrorPage'
import CancelPage from './pages/CancelPage'
import FourOhFourPage from './pages/FourOhFourPage'
import FiveHundredPage from './pages/FiveHundredPage'
import PrivacyPage from './pages/PrivacyPage'

/*DTS Specific Pages*/
import AppointmentsPage from './pages/AppointmentsPage'

export default [
  {
    path: '/',
    exact: true,
    component: withProvider(LandingPage),
  },
  {
    path: '/selectProvince',
    exact: true,
    component: withProvider(SelectLocationsPage),
  },
  {
    path: '/appointments',
    exact: true,
    component: withProvider(AppointmentsPage),
  },
  {
    path: '/register',
    exact: true,
    component: withProvider(RegistrationPage),
  },
  {
    path: '/calendar',
    exact: true,
    component: withProvider(CalendarPage),
  },
  {
    path: '/review',
    exact: true,
    component: withProvider(ReviewPage),
  },
  {
    path: '/confirmation/:error',
    exact: true,
    component: withProvider(ConfirmationPage),
  },
  {
    path: '/confirmation',
    exact: true,
    component: withProvider(ConfirmationPage),
  },

  {
    path: '/error',
    exact: true,
    component: withProvider(ErrorPage),
  },
  {
    path: '/cancel',
    exact: true,
    component: withProvider(CancelPage),
  },
  {
    path: '/explanation',
    exact: true,
    component: withProvider(ExplanationPage),
  },
  {
    path: '/500',
    exact: true,
    component: withProvider(FiveHundredPage),
  },
  {
    path: '/privacy',
    exact: true,
    component: withProvider(PrivacyPage),
  },
  {
    path: '/not-found',
    exact: true,
    component: withProvider(FourOhFourPage),
  },
  {
    path: '*',
    exact: true,
    component: withProvider(FourOhFourPage),
  },
]
