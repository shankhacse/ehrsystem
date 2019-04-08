import { MedicinetypeModule } from "./medicinetype.module";


describe('MedicinetypeModule', () => {
  let medicinetypModule: MedicinetypeModule;

  beforeEach(() => {
    medicinetypModule = new MedicinetypeModule();
  });

  it('should create an instance', () => {
    expect(MedicinetypeModule).toBeTruthy();
  });
});
