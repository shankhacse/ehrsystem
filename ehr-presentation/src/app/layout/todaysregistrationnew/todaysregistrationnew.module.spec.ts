import { TodaysregistrationnewModule } from './todaysregistrationnew.module';

describe('TodaysregistrationnewModule', () => {
  let todaysregistrationnewModule:TodaysregistrationnewModule;

  beforeEach(() => {
    todaysregistrationnewModule = new TodaysregistrationnewModule();
  });

  it('should create an instance', () => {
    expect(TodaysregistrationnewModule).toBeTruthy();
  });
});
