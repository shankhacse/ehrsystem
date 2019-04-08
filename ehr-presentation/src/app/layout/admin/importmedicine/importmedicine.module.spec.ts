
import { ImportmedicineModule } from "./importmedicine.module";






describe('ImportmedicineModule', () => {
  let importmedicineModule: ImportmedicineModule;

  beforeEach(() => {
    importmedicineModule = new ImportmedicineModule();
  });

  it('should create an instance', () => {
    expect(importmedicineModule).toBeTruthy();
  });
});
