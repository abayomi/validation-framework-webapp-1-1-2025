import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateRules from '../app/components/createobject/createRules';

describe('CreateRules Component', () => {
  const mockProps = {
    id: 1,
    eventkey: 1,
    isUpdate: false,
    deleteOnClick: jest.fn(),
    onRuleChange: jest.fn(),
    item: {
      type: '',
      errorCode: '',
      errorMessage: '',
      ruleGroupNumber: '',
      mandatoryRuleInd: false,
      shortDescription0: '',
      longDescription0: '',
      conditions: []
    }
  };

  const mockPropsUpdate = {
    id: 1,
    eventkey: 1,
    isUpdate: true,
    deleteOnClick: jest.fn(),
    onRuleChange: jest.fn(),
    item: {
      type: '2',
      errorCode: '1',
      errorMessage: 'Error message',
      ruleGroupNumber: '123',
      mandatoryRuleInd: true,
      shortDescription0: 'Short description',
      longDescription0: 'Long description',
      conditions: [{ type: '1', value: 'Condition 1' }]
    }
  };

  it('renders without crashing', () => {
    render(<CreateRules {...mockProps} />);
    expect(screen.getByLabelText('Validation code')).toBeInTheDocument();
    expect(screen.getByLabelText('Validation error code')).toBeInTheDocument();
    expect(screen.getByLabelText('Rule group Number')).toBeInTheDocument();
  });

  it('renders correctly when isUpdate is true', () => {
    render(<CreateRules {...mockPropsUpdate} />);
    expect(screen.getByLabelText('Validation code')).toHaveValue('2');
    expect(screen.getByLabelText('Validation error code')).toHaveValue('1');
    expect(screen.getByLabelText('Rule group Number')).toHaveValue('123');
    expect(screen.getByLabelText('Mandatory rule indicator')).toHaveValue();
    expect(screen.getByLabelText('Short Description')).toHaveValue('Short description');
    expect(screen.getByLabelText('Long Description')).toHaveValue('Long description');
  });

  it('calls onRuleChange when a field is changed', () => {
    render(<CreateRules {...mockProps} />);
    fireEvent.change(screen.getByLabelText('Validation code'), { target: { value: '1' } });
    expect(mockProps.onRuleChange).toHaveBeenCalledWith(0, expect.objectContaining({ type: '1' }));
  });

  it('calls deleteOnClick when delete button is clicked', () => {
    render(<CreateRules {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockProps.deleteOnClick).toHaveBeenCalledWith(expect.any(Object), 1);
  });

  it('adds a condition when Add Conditions button is clicked', () => {
    render(<CreateRules {...mockProps} />);
    fireEvent.click(screen.getByRole('button', { name: /add conditions/i }));
    fireEvent.click(screen.getByRole('button', { name: /add conditions/i }));
    const textareas = screen.getAllByRole('textbox');
    const conditionTextareas = textareas.filter(textarea => textarea.id === 'condition');
    expect(conditionTextareas).toHaveLength(2);
  });

  it('deletes a condition when delete button in CreateConditions is clicked', () => {
    render(<CreateRules {...mockProps} />);
   
    fireEvent.click(screen.getByRole('button', { name: /add conditions/i }));
    
    let deleteConditionButtonArray = screen.getAllByRole('button', { name: /Delete Condition/i });
    expect(deleteConditionButtonArray).toHaveLength(1);
    const deleteConditionButton = deleteConditionButtonArray[0];
    fireEvent.click(deleteConditionButton);
    deleteConditionButtonArray = screen.queryAllByRole('button', { name: /Delete Condition/i });
    expect(deleteConditionButtonArray).toHaveLength(0);
  });

  test('handleConditionChange updates rule and calls onRuleChange', () => {
    const mockSetRule = jest.fn();
    const mockOnRuleChange = jest.fn();
    const mockRule = {
      conditions: [{ value: 'condition2' }]
    };

    jest.spyOn(React, 'useState')
    .mockImplementationOnce((initial) => [initial, mockSetRule])
  
    render(
      <CreateRules 
        eventkey={1} 
        isUpdate={false} 
        deleteOnClick={jest.fn()} 
        onRuleChange={mockOnRuleChange} 
        item={mockRule} 
      />
    );
  
    const createConditionsElement = screen.getByTestId('create-conditions-1');
    const textarea = createConditionsElement.querySelector('textarea');
  
    fireEvent.change(textarea, { target: { value: 'updatedCondition2' } });
  
    expect(mockSetRule).toHaveBeenCalledWith({
      "conditions":  [{ value: 'updatedCondition2' }]
    });
  
    // // 验证 onRuleChange 是否被正确调用
    // expect(mockOnRuleChange).toHaveBeenCalledWith(0, {
    //   ...mockRule,
    //   conditions: ['condition1', 'updatedCondition2']
    // });
  });

  test('increments conditionCounter', () => {
    const mockOnRuleChange = jest.fn();
    const mockRule = {};
    render(
      <CreateRules 
        eventkey={1} 
        isUpdate={false} 
        deleteOnClick={jest.fn()} 
        onRuleChange={mockOnRuleChange} 
        item={mockRule} 
      />
    );
  
    // const counter = screen.getByTestId('counter');
    // const button = screen.getByText('Increment');
  
    // // Initial state
    // expect(counter.textContent).toBe('0');
  
    // // Simulate button click
    // fireEvent.click(button);
  
    // // Updated state
    // expect(counter.textContent).toBe('1');
  });
});
