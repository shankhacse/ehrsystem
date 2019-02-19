import { InvestigationModule } from "./investigation.module";

describe('InvestigationModule', () => {
  let investigationModule: InvestigationModule;

  beforeEach(() => {
    investigationModule = new InvestigationModule();
  });

  it('should create an instance', () => {
    expect(investigationModule).toBeTruthy();
  });
});
