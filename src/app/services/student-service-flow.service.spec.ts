import { TestBed } from '@angular/core/testing';

import { StudentServiceFlowService } from './student-service-flow.service';

describe('StudentServiceFlowService', () => {
  let service: StudentServiceFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentServiceFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
