export interface IGenerateTokenResponse {
  success: boolean;
  access_token: string;
  token_type: string;
  expires_in: number;
  number_of_days_left: number;
}
export interface IProfileResponse {
  name: string;
  email: string;
  city: string | null;
  state: string;
  recording_access: string;
  company_name: string;
  contact_number: string;
  address: string | null;
  missed_call_notify: number;
  assigned_extensions: string | null;
  extension: string;
  user_agent: string;
  user_id: number;
  client_id: number;
  sms_settings: boolean;
  is_team_member: boolean;
  is_international_enabled_on_agent: boolean;
  is_international_outbound_enabled: boolean;
  is_first_login: number;
  otp_for_agent_number: boolean;
  is_login_based_calling_enabled: boolean;
  is_agent_disposition_enabled: boolean;
  is_tfa_enabled: boolean;
  is_consult_transfer_enabled: boolean;
  is_multi_server_enabled: boolean;
  client_admin_user_id: number;
  is_video_call_enabled: boolean;
  dialer_multi_level_transfer_enabled: boolean;
  dialer_multi_conference_enabled: boolean;
  dialer_multi_conference_limit: number;
  timezone_id: number;
  timezone_name: string;
  login_id: string;
}

export interface ILogoutResponse {
  success: boolean;
  message: string;
}
