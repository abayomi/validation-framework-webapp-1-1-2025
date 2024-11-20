import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { gql, useMutation } from '@apollo/client';
import CreateRules from '../app/components/createobject/FieldMaster/createRules';
import {getErrorCodeOptions, getConditions, validationCodeOptions} from '../app/components/createobject/FieldMaster/ruleValidationCodeMap';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useMutation: jest.fn(),
}));

jest.mock('../app/graphql/fieldmasterMutations', () => ({
  ADD_RULE_TO_ENTERPRISE_FIELD: jest.fn(),
}));

jest.mock('../app/components/createobject/FieldMaster/ruleValidationCodeMap', () => {
  const originalModule = jest.requireActual('../app/components/createobject/FieldMaster/ruleValidationCodeMap');
  return {
      ...originalModule,
      validationCodeOptions: {
          '1': 'Mock Option 1',
          '2': 'Mock Option 2',
          '3': 'Mock Option 3',
      },
      getErrorCodeOptions: jest.fn((validationCode) => {
        switch (validationCode) {
            case '1':
                return ['1'];
            case '2':
                return ['3'];
            case '3':
                return ['4'];
            default:
                return [];
        }
      }),
      getConditions: jest.fn((validationCode) => {
        switch (validationCode) {
            case '1':
                return [{
                    type: '1',
                    value: null
                }];
            case '2':
                return [
                    {
                        type: '2',
                        value: null
                    },
                    {
                        type: '3',
                        value: null
                    }];
            case '3':
                return [
                    {
                        type: '5',
                        value: null
                    }
                  ]
        }
      }),  
  };
});

const mockUseMutation = useMutation;
const mockAddRuleToEnterpriseField = jest.fn();
mockUseMutation.mockReturnValue([mockAddRuleToEnterpriseField, { data: null, loading: false, error: null }]);

describe('CreateRules Component', () => {

  const mockProps = {
    id: 0,
    eventkey: 0,
    isUpdate: false,
    deleteOnClick: jest.fn(),
    onRuleChange: jest.fn(),
    ruleGroupNumberList: [1,4,7],
    item: {
      type: '',
      errorCode: '',
      errorMessage: '',
      ruleGroupNumber: '',
      mandatoryRuleInd: false,
      shortDescription: '',
      longDescription: '',
      conditions: []
    }
  };

  const mockPropsUpdate = {
    id: 1,
    eventkey: 1,
    isUpdate: true,
    deleteOnClick: jest.fn(),
    onRuleChange: jest.fn(),
    ruleGroupNumberList: [],
    item: {
      type: '2',
      errorCode: '2',
      errorMessage: 'Error message',
      ruleGroupNumber: '123',
      mandatoryRuleInd: true,
      shortDescription: 'Short description test',
      longDescription: 'Long description test',
      conditions: [{ type: '1', value: 'Condition 1' }]
    }
  };

  it('renders without crashing', () => {
    const { container } = render(<CreateRules {...mockProps} />);
    expect(screen.getByLabelText('Validation Code')).toBeInTheDocument();
    expect(screen.getByLabelText('Validation Error Code')).toBeInTheDocument();
    expect(screen.getByLabelText('Rule Group Number')).toBeInTheDocument();
    
    const dropdownItem = container.querySelector('.dropdown-menu');
    const links = dropdownItem.querySelectorAll('a');
    expect(links).toHaveLength(3);
    const expectedTexts = ['1', '4', '7'];
    links.forEach((link, index) => {
      expect(link).toHaveTextContent(expectedTexts[index]);
    });
  });

  it('renders correctly when isUpdate is true', () => {
    const { container  } = render(<CreateRules {...mockPropsUpdate} />);
    expect(screen.getByLabelText('Validation Code')).toHaveValue('2');
    expect(screen.getByLabelText('Validation Error Code')).toHaveValue('3');
    expect(screen.getByLabelText('Rule Group Number')).toHaveValue('123');
    const dropdownMenu  = container.querySelector('.dropdown-menu');
    expect(dropdownMenu).toBeNull();

    expect(screen.getByLabelText('Mandatory Rule')).toBeInTheDocument();
    expect(screen.getByLabelText('Mandatory Rule').value).toBe('true');
    expect(screen.getByLabelText('Short Description')).toHaveValue('Short description test');
    expect(screen.getByLabelText('Long Description')).toHaveValue('Long description test');
  });

  it('calls onRuleChange when a field is changed', () => {
    // If isUpdate is false, it means creating a new rule
    const { getErrorCodeOptions, getConditions} = require('../app/components/createobject/FieldMaster/ruleValidationCodeMap');

    render(<CreateRules {...mockProps} />);
    expect(screen.getByText('Rule - New'));
    fireEvent.change(screen.getByLabelText('Validation Code'), { target: { name: 'type', value: '3' } });
    expect(getErrorCodeOptions).toHaveBeenCalled();
    expect(getErrorCodeOptions).toHaveBeenCalledWith('3');
    expect(getConditions).toHaveBeenCalled();
    expect(getConditions).toHaveBeenCalledWith('3');
    expect(screen.getByLabelText('Validation Error Code')).toHaveValue('4');
    const conditionTypeInput = screen.getAllByTestId('condition-type-input');
    const conditionTypeInput0 = conditionTypeInput[0];
    expect(conditionTypeInput0.value).toBe('5');
  });

  it('should call setRuleGroupNumber with eventKey when not disabled and list is not empty', () => {
    const { container } = render(<CreateRules {...mockProps} />);
    expect(screen.getByLabelText('Rule Group Number')).toHaveValue('');
    const dropdownItem = container.querySelector('.dropdown-menu');
    const links = dropdownItem.querySelectorAll('a');
    fireEvent.click(links[1]);
    expect(screen.getByLabelText('Rule Group Number')).toHaveValue('4');
  });

  it('should call setRuleGroupNumber with correct value when input changes', () => {
    render(<CreateRules {...mockProps} />);
    const input = screen.getByLabelText('Rule Group Number');
    fireEvent.change(input, { target: { value: '2' } });
    expect(screen.getByLabelText('Rule Group Number')).toHaveValue('2');
  });

  it('handleConditionChange updates rule and calls onRuleChange', () => {
    const testTextareaValue = 'updatedCondition2';
    render(<CreateRules {...mockProps} />);
    fireEvent.change(screen.getByLabelText('Validation Code'), { target: { name: 'type', value: '3' } });
    const textarea = screen.getByTestId('condition-type-value');
    fireEvent.change(textarea, { target: { value: testTextareaValue } });
    expect(textarea).toHaveTextContent(testTextareaValue);
  });

  // it('calls deleteOnClick when delete button is clicked', () => {
  //   render(<CreateRules {...mockProps} />);
  //   fireEvent.click(screen.getByRole('button', { name: /delete/i }));
  //   expect(mockProps.deleteOnClick).toHaveBeenCalledWith(expect.any(Object), 1);
  // });

});
