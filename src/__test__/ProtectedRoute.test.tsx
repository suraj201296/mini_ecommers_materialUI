import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';

describe('Protected route testcase', () => {
  test('renders Outlet if authenticated', () => {
    jest
      .spyOn(window.localStorage.__proto__, 'getItem')
      .mockReturnValue('mockToken');

    render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );

    expect(screen.queryByTestId('protected-content')).toBeInTheDocument();
  });

  test('redirects to login if not authenticated', () => {
    jest.spyOn(window.localStorage.__proto__, 'getItem').mockReturnValue(null);
    
    const { queryByTestId } = render(
      <MemoryRouter>
        <ProtectedRoute />
      </MemoryRouter>
    );
    
    // Replace this check with whatever indicates a redirect to the login page
    expect(queryByTestId('login-page')).toBeInTheDocument();
  });
});
