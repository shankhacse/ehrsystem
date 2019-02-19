import { DiagonosislistModule } from "./diagonosislist.module";
DiagonosislistModule

describe('DiagonosislistModule', () => {
  let diagonosislistModule: DiagonosislistModule;

  beforeEach(() => {
    diagonosislistModule = new DiagonosislistModule();
  });

  it('should create an instance', () => {
    expect(DiagonosislistModule).toBeTruthy();
  });
});
