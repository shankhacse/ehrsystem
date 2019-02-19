import { PatientregModule } from './patientreg.module';

describe('PatientregModule', () => {
  let patientregModule: PatientregModule;

  beforeEach(() => {
    patientregModule = new PatientregModule();
  });

  it('should create an instance', () => {
    expect(patientregModule).toBeTruthy();
  });
});
