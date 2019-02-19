import { MedicineModule } from "./medicine.module";


describe('MedicineModule', () => {
  let medicineModule: MedicineModule;

  beforeEach(() => {
    medicineModule = new MedicineModule();
  });

  it('should create an instance', () => {
    expect(MedicineModule).toBeTruthy();
  });
});
