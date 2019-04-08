import { MedicinetypelistModule } from "./medicinetypelist.module";



describe('MedicinetypelistModule', () => {
  let medicinetypelistModule: MedicinetypelistModule;

  beforeEach(() => {
    medicinetypelistModule = new MedicinetypelistModule();
  });

  it('should create an instance', () => {
    expect(MedicinetypelistModule).toBeTruthy();
  });
});
