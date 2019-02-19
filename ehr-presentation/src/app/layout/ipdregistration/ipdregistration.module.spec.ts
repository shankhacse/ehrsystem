import { IpdregistrationModule } from "./ipdregistration.module";

describe('IpdregistrationModule', () => {
  let ipdregistrationModule: IpdregistrationModule;

  beforeEach(() => {
    ipdregistrationModule = new IpdregistrationModule();
  });

  it('should create an instance', () => {
    expect(ipdregistrationModule).toBeTruthy();
  });
});
