import { SymptomsModule } from "./symptoms.module";

describe('DiagonosisModule', () => {
  let symptomsModule: SymptomsModule;

  beforeEach(() => {
    symptomsModule = new SymptomsModule();
  });

  it('should create an instance', () => {
    expect(SymptomsModule).toBeTruthy();
  });
});
