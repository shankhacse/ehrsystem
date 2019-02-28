import { ImportdependentModule } from "./importdependent.module";




describe('ImportdependentModule', () => {
  let importdependentModule: ImportdependentModule;

  beforeEach(() => {
    importdependentModule = new ImportdependentModule();
  });

  it('should create an instance', () => {
    expect(importdependentModule).toBeTruthy();
  });
});
