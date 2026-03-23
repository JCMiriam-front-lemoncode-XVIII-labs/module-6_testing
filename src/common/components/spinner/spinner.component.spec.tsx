import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpinnerComponent } from './spinner.component';

const usePromiseTrackerMock = vi.fn();

vi.mock('react-promise-tracker', () => ({
  usePromiseTracker: () => usePromiseTrackerMock(),
}));

vi.mock('react-spinners/ScaleLoader', () => ({
  default: () => <div data-testid="spinner-loader">Loader</div>,
}));

describe('common/components/spinner/SpinnerComponent', () => {
  beforeEach(() => vi.clearAllMocks());

  it('should render loader when promise is in progress', () => {
    usePromiseTrackerMock.mockReturnValue({
      promiseInProgress: true,
    });

    render(<SpinnerComponent />);
    expect(screen.getByTestId('spinner-loader')).toBeInTheDocument();
  });

  it('should not render loader when promise is not in progress', () => {
    usePromiseTrackerMock.mockReturnValue({
      promiseInProgress: false,
    });


    render(<SpinnerComponent />);
    expect(screen.queryByTestId('spinner-loader')).not.toBeInTheDocument();
  });
});