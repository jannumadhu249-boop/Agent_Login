const base_url = "http://187.127.143.141:8000/";

export const URLS = {

    Base: base_url,
    ImageUrl: base_url,

    // Authentication
    Registration : base_url + "agent/agentRegister/register",
    SendEmailOtp : base_url + "agent/agentRegister/sendEmailOTP",
    VerifyEmailOtp : base_url + "agent/agentRegister/verifyEmailOtp",
    SendMobileOtp : base_url + "agent/agentRegister/sendMobileOtp",
    VerifyMobileOtp : base_url + "agent/agentRegister/verifyMobileOtp",
    Login : base_url + "agent/agentRegister/agentLogin",

    // Profile
    GetProfile : base_url + "agent/agentRegister/getAgentProfile",
    UpdateProfile : base_url + "agent/agentRegister/updateProfile",

    //Forgot Password
    GenerateForgotPasswordOtp : base_url + "agent/agentRegister/generateForgotPassOTP",
    VerifyForgotPasswordOtp : base_url + "agent/agentRegister/verifyForgotPassOtp",
    ResetPassword : base_url + "agent/agentRegister/resetPassword",

}