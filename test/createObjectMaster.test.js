import React from 'react';
import { useParams } from 'react-router-dom';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import CreateObjectMaster from '../app/components/createobject/createObjectMaster';
import {ApolloClient, InMemoryCache, useMutation} from "@apollo/client";
import { useQuery } from '@apollo/client';

/**
 * You might wonder why this unit test is so simple. There are two reasons:
 *
 *     1. In the CreateObjectMaster component, the most important subcomponent is CreateObjectFields, which has its own unit test file, createObjectFields.test.js.
 *     2. For the creation and editing functions of Object Master, the critical logic resides in createObjectMasterLogic.js, which also has its own unit test file.
 *
 * Based on the above reasons, there is little left to test in this component, so this unit test mainly mocks necessary third-party libraries. If this test is later
 * deemed insufficient, the unit test coverage can be improved by exporting the logic unrelated to UI display as independent functions and supplementing their tests
 * in this unit test file. However, this might not be very meaningful.
 */

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