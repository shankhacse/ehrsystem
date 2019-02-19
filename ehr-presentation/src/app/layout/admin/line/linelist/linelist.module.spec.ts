import { LinelistModule } from "./linelist.module";



describe('LinelistModule', () => {
  let linelist: LinelistModule;

  beforeEach(() => {
    linelist = new LinelistModule();
  });

  it('should create an instance', () => {
    expect(LinelistModule).toBeTruthy();
  });
});
