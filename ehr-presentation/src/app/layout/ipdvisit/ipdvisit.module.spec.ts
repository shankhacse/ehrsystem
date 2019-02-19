import { IpdvisitModule } from "./ipdvisit.module";


describe('IpdregistrationModule', () => {
  let ipdvisitModule: IpdvisitModule;

  beforeEach(() => {
    ipdvisitModule = new IpdvisitModule();
  });

  it('should create an instance', () => {
    expect(ipdvisitModule).toBeTruthy();
  });
});
