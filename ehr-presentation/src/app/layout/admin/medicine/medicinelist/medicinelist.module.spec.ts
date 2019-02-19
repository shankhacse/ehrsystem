import { MedicinelistModule } from "./medicinelist.module";



describe('MedicinelistModule', () => {
  let medicinelistModule: MedicinelistModule;

  beforeEach(() => {
    medicinelistModule = new MedicinelistModule();
  });

  it('should create an instance', () => {
    expect(MedicinelistModule).toBeTruthy();
  });
});
