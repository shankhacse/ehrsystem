import { ImportexcelModule } from "./importexcel.module";

describe('DiagonosisModule', () => {
  let importexcelModule: ImportexcelModule;

  beforeEach(() => {
    importexcelModule = new ImportexcelModule();
  });

  it('should create an instance', () => {
    expect(importexcelModule).toBeTruthy();
  });
});
