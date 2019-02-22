import { SickleaveregisterModule } from './sickleaveregister.module';



describe('SickleaveregisterModule', () => {
  let sickleaveregisterModule: SickleaveregisterModule;

  beforeEach(() => {
    sickleaveregisterModule = new SickleaveregisterModule();
  });

  it('should create an instance', () => {
    expect(sickleaveregisterModule).toBeTruthy();
  });
});
