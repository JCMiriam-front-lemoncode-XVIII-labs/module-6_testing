import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('common/components/confirmation-dialog/ConfirmationDialogComponent', () => {
  const defaultProps = {
    isOpen: true,
    onAccept: vi.fn(),
    onClose: vi.fn(),
    title: 'Delete project',
    labels: {
      closeButton: 'Cancel',
      acceptButton: 'Accept',
    },
    children: <span>Are you sure you want to continue?</span>,
  };

  it('should render dialog title, content and buttons when isOpen is true', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    expect(screen.getByText('Delete project')).toBeInTheDocument();
    expect(
      screen.getByText('Are you sure you want to continue?')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Cancel' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Accept' })
    ).toBeInTheDocument();
  });

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn();

    render(
      <ConfirmationDialogComponent
        {...defaultProps}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onAccept and onClose when accept button is clicked', () => {
    const onAccept = vi.fn();
    const onClose = vi.fn();

    render(
      <ConfirmationDialogComponent
        {...defaultProps}
        onAccept={onAccept}
        onClose={onClose}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));

    expect(onAccept).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not render dialog content when isOpen is false', () => {
    render(
      <ConfirmationDialogComponent
        {...defaultProps}
        isOpen={false}
      />
    );

    expect(screen.queryByText('Delete project')).not.toBeInTheDocument();
    expect(
      screen.queryByText('Are you sure you want to continue?')
    ).not.toBeInTheDocument();
  });
});