import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { withAuth } from '../app/components/withAuth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cleanup } from '@testing-library/react';
import ViewFieldMaster from '../app/components/homepage/viewFieldMaster';

jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn(),
}));

jest.mock('../app/components/withAuth', () => (Component) => (props) => <Component {...props} />);

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

beforeEach(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterEach(() => {
  console.log.mockRestore();
  console.error.mockRestore();
});

test('renders loading state', async () => {
  useQuery.mockReturnValue({ loading: true });
  render(<ViewFieldMaster />);
  await waitFor(() => {
    expect(screen.getByText('Loading data...')).toBeInTheDocument();
  });
});

test('logs error when error state is true', async () => {
  useQuery.mockReturnValue({ error: 'Test error message' });
  render(<ViewFieldMaster />);
  await waitFor(() => {
    expect(screen.getByText((content, element) => {
      return content.includes('Error data:') && content.includes('Test error message');
    })).toBeInTheDocument();
  });
});