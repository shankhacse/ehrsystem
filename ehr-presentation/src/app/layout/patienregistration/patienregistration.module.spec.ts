import { PatienregistrationModule } from "./patienregistration.module";
describe('PatienregistrationModule', () => {
  let patienregistrationModule: PatienregistrationModule;

  beforeEach(() => {
    patienregistrationModule = new PatienregistrationModule();
  });

  it('should create an instance', () => {
    expect(patienregistrationModule).toBeTruthy();
  });
});
