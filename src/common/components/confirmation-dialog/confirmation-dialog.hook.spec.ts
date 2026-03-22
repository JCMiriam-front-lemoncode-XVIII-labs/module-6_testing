import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup, Lookup } from '#common/models';

describe('common/components/confirmation-dialog/useConfirmationDialog', () => {
  it('should return initial state', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toStrictEqual(createEmptyLookup());
  });

  it('should open dialog and set item to delete', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const item: Lookup = {
      id: '1',
      name: 'Project 1',
    };

    act(() => result.current.onOpenDialog(item));

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toStrictEqual(item);
  });

  it('should close dialog', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({
        id: '1',
        name: 'Project 1',
      });
    });

    act(() => result.current.onClose());

    expect(result.current.isOpen).toBe(false);
  });

  it('should reset item to delete on accept', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({
        id: '1',
        name: 'Project 1',
      });
    });

    act(() => result.current.onAccept());

    expect(result.current.itemToDelete).toStrictEqual(createEmptyLookup());
  });
});