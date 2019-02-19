import { OpdpreprationModule } from "./opdprepration.module";

describe('PatienregistrationModule', () => {
  let opdpreprationModule: OpdpreprationModule;

  beforeEach(() => {
    opdpreprationModule = new OpdpreprationModule();
  });

  it('should create an instance', () => {
    expect(opdpreprationModule).toBeTruthy();
  });
});
