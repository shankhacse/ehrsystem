import { DiagonosisModule } from "./diagonosis.module";

describe('DiagonosisModule', () => {
  let diagonosisModule: DiagonosisModule;

  beforeEach(() => {
    diagonosisModule = new DiagonosisModule();
  });

  it('should create an instance', () => {
    expect(DiagonosisModule).toBeTruthy();
  });
});
