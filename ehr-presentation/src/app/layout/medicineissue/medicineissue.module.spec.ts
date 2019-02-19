import { MedicineissueModule } from "./medicineissue.module";

describe('PatienregistrationModule', () => {
  let medicineissueModule: MedicineissueModule;

  beforeEach(() => {
    medicineissueModule = new MedicineissueModule();
  });

  it('should create an instance', () => {
    expect(medicineissueModule).toBeTruthy();
  });
});
