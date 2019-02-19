import { ChallanlistModule } from "./challanlist.module";



describe('ChallanlistModule', () => {
  let challanlist: ChallanlistModule;

  beforeEach(() => {
    challanlist = new ChallanlistModule();
  });

  it('should create an instance', () => {
    expect(ChallanlistModule).toBeTruthy();
  });
});
