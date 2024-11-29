import React, { act } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateConditions from '../app/components/createobject/FieldMaster/createConditions';

describe('CreateConditions Component', () => {
  const mockPropsCreate = {
    deleteRow: jest.fn(),
    eventkey: 1,
    isUpdate: false,
    onConditionChange: jest.fn(),
    item: { type: '', value: '' }
  };

  const mockPropsCreateWithItem = {
    deleteRow: jest.fn(),
    eventkey: 1,
    isUpdate: false,
    onConditionChange: jest.fn(),
    item: { type: '2', value: 'dan,corp_cd,cli_no' }
  };

  const mockPropsUpdate = {
    deleteRow: jest.fn(),
    eventkey: 1,
    isUpdate: true,
    onConditionChange: jest.fn(),
    item: { 'id': 2, type: '2', value: 'dan,corp_cd,cli_no' }
  };

  const mockPropsCreateWithoutItem = {
    deleteRow: jest.fn(),
    eventkey: 1,
    isUpdate: false,
    onConditionChange: jest.fn(),
  };

  it('renders without crashing', () => {
    render(<CreateConditions {...mockPropsCreate} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('initializes condition state correctly when item is provided', () => {
    render(<CreateConditions {...mockPropsCreateWithItem} />);
    expect(screen.getByRole('combobox')).toHaveValue('2');
    expect(screen.getByRole('textbox')).toHaveValue('dan,corp_cd,cli_no');
  });

  it('initializes condition state correctly when item is null', () => {
    render(<CreateConditions {...mockPropsCreateWithoutItem} />);
    expect(screen.getByRole('combobox')).toHaveValue('1');
  });

  it('initializes condition state correctly when item is not provided', () => {
    render(<CreateConditions {...mockPropsCreate} />);
    expect(screen.getByRole('combobox')).toHaveValue('1');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('calls onConditionChange when value is changed', () => {
    render(<CreateConditions {...mockPropsCreate} />);
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test Value' } });
    });
    expect(mockPropsCreate.onConditionChange).toHaveBeenCalledWith(1, { type: '', value: 'Test Value' });
  });

  it('renders correctly when isUpdate is true', () => {
    render(<CreateConditions {...mockPropsUpdate} />);
    expect(screen.getByRole('combobox')).toHaveValue('2');
    expect(screen.getByRole('textbox')).toHaveValue('dan,corp_cd,cli_no');
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});
