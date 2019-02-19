import { TodaysregistrationModule } from './todaysregistration.module';

describe('TodaysregistrationModule', () => {
  let todaysregistrationModule:TodaysregistrationModule;

  beforeEach(() => {
    todaysregistrationModule = new TodaysregistrationModule();
  });

  it('should create an instance', () => {
    expect(todaysregistrationModule).toBeTruthy();
  });
});
