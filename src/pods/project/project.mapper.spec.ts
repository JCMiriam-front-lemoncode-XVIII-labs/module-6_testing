import { describe, it, expect } from 'vitest';
import { mapProjectFromApiToVm } from './project.mapper';
import * as viewModel from './project.vm';
import * as apiModel from './api/project.api-model';

describe('project.mapper', () => {
  describe('mapProjectFromApiToVm', () => {
    it('should return empty project when project is null', () => {
      const result = mapProjectFromApiToVm(null as unknown as apiModel.Project);

      expect(result).toStrictEqual(viewModel.createEmptyProject());
    });

    it('should return empty project when project is undefined', () => {
      const result = mapProjectFromApiToVm(undefined as unknown as apiModel.Project);

      expect(result).toStrictEqual(viewModel.createEmptyProject());
    });

    it('should map project from api to vm', () => {
      const project: apiModel.Project = {
        id: '1',
        name: 'Project 1',
        externalId: 'EXT-123',
        comments: 'Test comments',
        isActive: true,
        employees: [
          {
            id: '101',
            isAssigned: true,
            employeeName: 'John Doe',
          },
          {
            id: '102',
            isAssigned: false,
            employeeName: 'Jane Smith',
          },
        ],
      };

      const result = mapProjectFromApiToVm(project);

      expect(result).toStrictEqual(project);
    });

    it('should map empty employees collection', () => {
      const project: apiModel.Project = {
        id: '2',
        name: 'Project 2',
        externalId: 'EXT-456',
        comments: 'No employees',
        isActive: false,
        employees: [],
      };

      const result = mapProjectFromApiToVm(project);

      expect(result.employees).toStrictEqual([]);
    });
  });
});