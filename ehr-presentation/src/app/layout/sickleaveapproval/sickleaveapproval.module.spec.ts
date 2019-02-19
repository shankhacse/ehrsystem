import { sickleaveapprovalModule } from "./sickleaveapproval.module";



describe('sickleaveapprovalModule', () => {
  let sickleaveapproval:sickleaveapprovalModule;

  beforeEach(() => {
   this.sickleaveapproval = new sickleaveapprovalModule();
  });

  it('should create an instance', () => {
    expect(sickleaveapprovalModule).toBeTruthy();
  });
});
