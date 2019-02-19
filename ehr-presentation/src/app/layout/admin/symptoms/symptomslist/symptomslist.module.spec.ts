import { SymptomslistModule } from "./symptomslist.module";


describe('SymptomslistModule', () => {
  let symptomslistModule: SymptomslistModule;

  beforeEach(() => {
    symptomslistModule = new SymptomslistModule();
  });

  it('should create an instance', () => {
    expect(SymptomslistModule).toBeTruthy();
  });
});
