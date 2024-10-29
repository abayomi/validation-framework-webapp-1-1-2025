import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import CreateConditions from '../app/components/createobject/createConditions';

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
    item: { type: '2', value: 'dan,corp_cd,cli_no' }
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
    expect(screen.getByRole('button', { name: /delete/i })).toBeInTheDocument();
  });

  it('initializes condition state correctly when item is provided', () => {
    render(<CreateConditions {...mockPropsCreateWithItem} />);
    expect(screen.getByRole('combobox')).toHaveValue('2');
    expect(screen.getByRole('textbox')).toHaveValue('dan,corp_cd,cli_no');
  });

  it('initializes condition state correctly when item is null', () => {
    render(<CreateConditions {...mockPropsCreateWithoutItem} />);
    expect(screen.getByRole('combobox')).toHaveValue('');
  });

  it('initializes condition state correctly when item is not provided', () => {
    render(<CreateConditions {...mockPropsCreate} />);
    expect(screen.getByRole('combobox')).toHaveValue('');
    expect(screen.getByRole('textbox')).toHaveValue('');
  });

  it('calls onConditionChange when type is changed', () => {
    render(<CreateConditions {...mockPropsCreate} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '1' } });
    expect(mockPropsCreate.onConditionChange).toHaveBeenCalledWith(0, { type: '1', value: '' });
  });

  it('calls onConditionChange when value is changed', () => {
    render(<CreateConditions {...mockPropsCreate} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Test Value' } });
    expect(mockPropsCreate.onConditionChange).toHaveBeenCalledWith(0, { type: '', value: 'Test Value' });
  });

  it('calls deleteRow when delete button is clicked', () => {
    render(<CreateConditions {...mockPropsCreate} />);
    fireEvent.click(screen.getByRole('button', { name: /delete/i }));
    expect(mockPropsCreate.deleteRow).toHaveBeenCalledWith(1);
  });

  it('renders correctly when isUpdate is true', () => {
    render(<CreateConditions {...mockPropsUpdate} />);
    expect(screen.getByRole('combobox')).toHaveValue('2');
    expect(screen.getByRole('textbox')).toHaveValue('dan,corp_cd,cli_no');
    expect(screen.getByRole('combobox')).toBeDisabled();
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('button', { name: /delete/i })).toBeDisabled();
  });
});
