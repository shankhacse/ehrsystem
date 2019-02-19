import { LineModule } from "./line.module";


describe('LineModule', () => {
  let lineModule: LineModule;

  beforeEach(() => {
    lineModule = new LineModule();
  });

  it('should create an instance', () => {
    expect(LineModule).toBeTruthy();
  });
});
