
import { ImportgrnModule } from "./importgrn.module";


describe('ReportsuploadModule', () => {
  let importgrnModule: ImportgrnModule;

  beforeEach(() => {
    importgrnModule = new ImportgrnModule();
  });

  it('should create an instance', () => {
    expect(importgrnModule).toBeTruthy();
  });
});
