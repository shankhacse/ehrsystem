import { PatientbarcodeprintModule } from "./patientbarcodeprint.module";

describe('patientbarcodeprintModule', () => {
  let patientbarcodeprint: PatientbarcodeprintModule;

  beforeEach(() => {
    patientbarcodeprint = new PatientbarcodeprintModule();
  });

  it('should create an instance', () => {
    expect(PatientbarcodeprintModule).toBeTruthy();
  });
});
