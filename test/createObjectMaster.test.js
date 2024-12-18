import React from 'react';
import { useParams } from 'react-router-dom';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CreateObjectMaster from '../app/components/createobject/createObjectMaster';
import {ApolloClient, InMemoryCache, useMutation} from "@apollo/client";
import { useQuery } from '@apollo/client';

jest.mock('@apollo/client', () => {
    const actualApolloClient = jest.requireActual('@apollo/client');
    return {
        ...actualApolloClient,
        useMutation: jest.fn(),
        useQuery: jest.fn()
    };
});

jest.mock('react-router-dom', () => ({
    useNavigate: () => jest.fn(),
    useParams: jest.fn()
}));

describe('The test case for the createObjectMaster component', () => {
    const client = new ApolloClient({
        cache: new InMemoryCache()
    });

    it('1st test case', async () => {
        useQuery.mockReturnValue({
            loading: true,
            refetch: jest.fn()
        });
        useParams.mockReturnValue({ objLabelName: 'testLabelName' });
        useMutation.mockReturnValue([
            jest.fn(),
            {
                data: 'data1',
                loading: 'loading1',
                error: 'error1',
            }
        ]);

        render(<CreateObjectMaster />);
    });
});