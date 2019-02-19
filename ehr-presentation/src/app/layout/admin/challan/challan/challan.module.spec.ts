import { ChallanModule } from "./challan.module";


describe('ChallanModule', () => {
  let challanModule: ChallanModule;

  beforeEach(() => {
    challanModule = new ChallanModule();
  });

  it('should create an instance', () => {
    expect(ChallanModule).toBeTruthy();
  });
});
