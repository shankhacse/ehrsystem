
import { ReportsuploadModule } from "./reportsupload.module";


describe('ReportsuploadModule', () => {
  let reportsuploadModule: ReportsuploadModule;

  beforeEach(() => {
    reportsuploadModule = new ReportsuploadModule();
  });

  it('should create an instance', () => {
    expect(reportsuploadModule).toBeTruthy();
  });
});
