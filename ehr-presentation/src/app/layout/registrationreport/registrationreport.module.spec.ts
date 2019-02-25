import { RegistrationreportModule } from "./registrationreport.module";



describe('RegistrationreportModule', () => {
  let registrationreportModule: RegistrationreportModule;

  beforeEach(() => {
    registrationreportModule = new RegistrationreportModule();
  });

  it('should create an instance', () => {
    expect(registrationreportModule).toBeTruthy();
  });
});
