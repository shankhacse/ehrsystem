import { IpddischargeModule } from "./ipddischarge.module";



describe('IpddischargeModule', () => {
  let ipddischargeModule: IpddischargeModule;

  beforeEach(() => {
    ipddischargeModule = new IpddischargeModule();
  });

  it('should create an instance', () => {
    expect(ipddischargeModule).toBeTruthy();
  });
});
