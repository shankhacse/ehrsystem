import { InvestigationlistModule } from "./investigationlist.module";

describe('InvestigationlistModule', () => {
  let investigationlistModule: InvestigationlistModule;

  beforeEach(() => {
    investigationlistModule = new InvestigationlistModule();
  });

  it('should create an instance', () => {
    expect(investigationlistModule).toBeTruthy();
  });
});
