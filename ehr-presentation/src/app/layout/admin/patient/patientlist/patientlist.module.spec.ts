import { PatientlistModule } from "./patientlist.module";





describe('patientlistModule', () => {
  let patientlist: PatientlistModule;

  beforeEach(() => {
    patientlist = new PatientlistModule();
  });

  it('should create an instance', () => {
    expect(PatientlistModule).toBeTruthy();
  });
});
